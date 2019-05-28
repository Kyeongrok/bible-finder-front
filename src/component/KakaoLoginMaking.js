import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';
import {InputGroup, FormControl, Button, Form, Card, Container, CardGroup} from 'react-bootstrap';
import config from '../configuration/config';
import Select from 'react-select'

class KakaoLoginMaking extends Component{
  constructor(props) {
    super(props);
    this.state = {
      profile:"qa",
      kakao:null,
      kakaoMe:null,
      accessToken:"",
      idToken:"",
      kakaoToken:"",
      username:""
    }
  }

  handleChangeProfile(event) {
    let cnf = config.get(event.value);
    Kakao.init(cnf.javaScriptKey);
    this.setState({"kakao": Kakao, cognitoInfo:cnf.cognitoInfo,profile: event.value})
  }

  componentDidMount(){
    const hostname = window && window.location && window.location.hostname;
    let cnf = config.get('local');
    console.log("cnf:", cnf);
    if (Kakao.Auth == null) {
      if (hostname === "localhost") {
        cnf = config.get('qa2');
      }else if (hostname === "hanbitco-qa.firebaseapp.com") {
        cnf = config.get('qa');
      }
      console.log("hostname:", hostname, cnf);
      Kakao.init(cnf.javaScriptKey);
    }
    this.setState({kakao: Kakao, cognitoInfo:cnf.cognitoInfo})
  }
  processLoginWithKakaoMe(data) {
    console.log(data);
    let email = data.data.kakao_account.email;
    // email = "oceanfog2@gmail.com";

    if (email === "oceanfog1@gmail.com") {
      email = "oceanfog2@gmail.com";
    }

    Auth.signIn(email)
      .then(res => {
        console.log("challengeName:", res.challengeName, "email:", email);
        if (res.challengeName === 'CUSTOM_CHALLENGE') {
          // to send the answer of the custom challenge
          let challengeResponse = data.data.id;
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
        let url = "https://api.hanbitco-qa.com/v1/kakao/login/";

        console.log(url);
        axios.post(url, response)
          .then(resV2UserMe => {
            // this.setState({kakaoMe: res})
            console.log(resV2UserMe);
            const data = resV2UserMe.data;
            // cognito연동
            const COGNITO = this.state.cognitoInfo;
            console.log("[cognitoInfo]",COGNITO);

            Amplify.configure({
              Auth: {
                userPoolId : COGNITO.USER_POOL_ID,
                userPoolWebClientId : COGNITO.CLIENT_ID,
                region: COGNITO.REGION
              }
            });
            this.setState({kakaoToken: JSON.stringify(response), username:JSON.stringify(data.data)});

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
      <Container>
        <Select options={[{ value: "qa", label: "qa" },{ value: "dev", label: "dev" }]}
                defaultValue={ {value: "qa", label: "qa"} }
                onChange={this.handleChangeProfile.bind(this)}/>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>kakaojs</Card.Title>
              <Card.Text>
                <img alt={"aaaa"} onClick={() => this.handleClickKakaoLogin()}
                     src={"https://kauth.kakao.com/public/widget/login/kr/kr_02_medium.png"}/><br/>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>rest</Card.Title>
              <Card.Text>
                <a
                  href={"https://kauth.kakao.com/oauth/authorize?client_id=cc0328e41a9f5bd8b1f36eaa9d381770&redirect_uri=kakaojs&response_type=code"}>
                  <img alt={"kakao_login"} src={"https://kauth.kakao.com/public/widget/login/kr/kr_02_medium.png"}/>
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <CardGroup>
        <Card>
          <Card.Body>
            cognitoInfo:{JSON.stringify(this.state.cognitoInfo)}
          </Card.Body>
          <Card.Body>
            kakaoToken:{this.state.kakaoToken}
          </Card.Body>
          <Card.Body>
            username:{this.state.username}
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>IdToken</Card.Title>
            <Card.Text>
              <Form.Control as="textarea" rows="3" value={this.state.idToken.toString()} onChange={()=>console.log()} />
            </Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>accessToken</Card.Title>
            <Card.Text>
              <Form.Control as="textarea" rows="3" value={this.state.accessToken.toString()} onChange={()=>console.log()} />
            </Card.Text>
          </Card.Body>
        </Card>
        </CardGroup>
      </Container>
    );
  }
}

export default KakaoLoginMaking;
