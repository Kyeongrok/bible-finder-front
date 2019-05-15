import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import config from '../configuration/config';

class KakaoLoginMaking extends Component{
  constructor(props) {
    super(props);
    this.state = {
      "kakao":null,
      kakaoMe:null,
      accessToken:"",
      idToken:""
    }
  }

  handleClickLoginButton() {
  }

  componentDidMount(){
    const hostname = window && window.location && window.location.hostname;
    let cnf = config.get('local');
    console.log("cnf:", cnf);
    if (Kakao.Auth == null) {
      if (hostname === "localhost") {
        cnf = config.get('local');
      }else if (hostname === "hanbitco-qa.firebaseapp.com") {
        cnf = config.get('qa');
      }
      console.log("hostname:", hostname, cnf);
      Kakao.init(cnf.javaScriptKey);
    }
    this.setState({"kakao": Kakao, cognitoInfo:cnf.cognitoInfo})
  }
  processLoginWithKakaoMe(data) {
    console.log(data);
    let email = data.data.kakao_account.email;
    // email = "oceanfog2@gmail.com";

    Auth.signIn(email)
      .then(res => {
        console.log("challengeName:", res.challengeName);
        if (res.challengeName === 'CUSTOM_CHALLENGE') {
          // to send the answer of the custom challenge
          let challengeResponse = data.id.toString();
          Auth.sendCustomChallengeAnswer(res, challengeResponse)
            .then(user => {
              console.log("success:", user);
              const session = user.getSignInUserSession();
              this.setState({
                idToken: session.getIdToken().getJwtToken(),
                accessToken: session.getAccessToken().getJwtToken()
              });
            })
            .catch(err => console.log(err));
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        alert(err.message)
        console.log("err:", err)
      });
  }
  handleClickKakaoLogin() {
    console.log("[click_login]");
    this.state.kakao.Auth.login({
      success: (response) => {
        console.log("res:", response);
        let url = "http://ec2-13-209-75-254.ap-northeast-2.compute.amazonaws.com:3001/kakao";
        url = "https://api.hanbitco-qa.com/v1/kakao/login/";

        console.log(url);
        axios.post(url, response)
          .then(resV2UserMe => {
            // this.setState({kakaoMe: res})
            console.log(resV2UserMe);
            const data = resV2UserMe.data;
            // 여기서 회원가입으로 이동
            // cognito연동

            let COGNITO = {
              REGION: 'us-west-2',
              USER_POOL_ID: 'us-west-2_xRKVaj5ls',
              CLIENT_ID: '5084o932i7age4c0tc9j2unmff',
            }

            COGNITO = this.state.cognitoInfo;
            console.log("[cognitoInfo]",COGNITO);

            Amplify.configure({
              Auth: {
                userPoolId : COGNITO.USER_POOL_ID,
                userPoolWebClientId : COGNITO.CLIENT_ID,
                region: COGNITO.REGION
              }
            });

            // coginto login
            this.processLoginWithKakaoMe(data);

          });
      },
      fail:err=>{
        alert(JSON.stringify(err));
      }
    });
  }
  render(){
    console.log(this.state.kakaoMe);
    return (
      <div>
        <InputGroup size="sm" className="mb-3" style={{ width: '18rem' }}>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Id</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{ width: '18rem' }}>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <Button onClick={()=>this.handleClickLoginButton()}>한빗코 로그인</Button><br/>

        <img alt={"aaaa"} onClick={()=>this.handleClickKakaoLogin()} src={"https://kauth.kakao.com/public/widget/login/kr/kr_02_medium.png"}/><br/>
        <Card>
          <Card.Body>
            <Card.Title>IdToken</Card.Title>
            <Card.Text>
              {this.state.idToken.toString()}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>accessToken</Card.Title>
            <Card.Text>
              {this.state.accessToken.toString()}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default KakaoLoginMaking;
