import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';

class KakaoLoginMaking extends Component{
  constructor(props) {
    super(props);
    this.state = {"kakao":null, kakaoMe:null,
      accessToken:"", idToken:""}
  }

  handleClickLoginButton() {
  }

  componentDidMount(){
    const hostname = window && window.location && window.location.hostname;
    console.log("hostname:", hostname);
    if (Kakao.Auth == null) {
      Kakao.init('39c0f53356e324929bb78bd27b69bb6b');
    }
    this.setState({"kakao": Kakao})
  }
  processLoginWithKakaoMe(data) {
    let email = data.kakao_account.email;
    email = "oceanfog2@gmail.com";

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
    this.state.kakao.Auth.login({
      success: (response) => {
        console.log("res:", response);
        let url = "http://ec2-13-209-75-254.ap-northeast-2.compute.amazonaws.com:3001/kakao";
        url = "https://api.hanbitco-qa.com/v1/kakao/login/";
        axios.post(url, response)
          .then(resV2UserMe => {
            // this.setState({kakaoMe: res})
            console.log(resV2UserMe);
            const data = resV2UserMe.data;
            // 여기서 회원가입으로 이동
            // cognito연동
            const COGNITO2 = {
              REGION: 'ap-northeast-2',
              USER_POOL_ID: 'ap-northeast-2_CHGQe7flY',
              CLIENT_ID: '29ilv9idglfh0spnbe9tpfb19m',
            }

            const COGNITO = {
              REGION: 'us-west-2',
              USER_POOL_ID: 'us-west-2_xRKVaj5ls',
              CLIENT_ID: '5084o932i7age4c0tc9j2unmff',
            }
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
      fail: function(err) {
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
