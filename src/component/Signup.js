import React, { Component } from 'react';
import Kakao from 'kakaojs';
import axios from 'axios';
import {Button, Alert, Container} from 'react-bootstrap';
import config from '../configuration/config';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kakaoToken:{},
      kakaoMe:null
    }
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

  doKakaoLogin(params) {
    let url = "https://api.hanbitco-qa.com/v1/kakao/login/";
    console.log("[kakao_url]", url);
    axios.post(url, params)
      .then(res => {
        // this.setState({kakaoMe: res})
        console.log(res);
        const data = res.data.data;
        // 여기서 회원가입으로 이동
        // cognito연동
        let COGNITO;
        COGNITO = this.state.cognitoInfo;

        // const email = kakaoAccount.email;
        const email = "oceanfog2@gmail.com";
        const kakaoId = data.id.toString();
        // 회원가입
        console.log("회원가입하기", email, kakaoId);
        const message = `${email}로 회원 가입 합니다. ${COGNITO.REGION}에서`;
        alert(message);
        // cognito call을 해서 cognito에 가입까지 되도록 한다.

        // cognito를 바로 call하지 않고 kakao/signup을 call한다.
        // {
        //   "kakaoId":"1085645717",
        //   "email":"oceanfog2@gmail.com",
        //   "kakaoAccessToken": "u2wd-bCp-U2B44RjrA_QDm7c3zV2re6cICTa0QopyWAAAAFq2FUrwg"
        // }
        this.doSignup();

      });
  }

  doSignup() {
    const dataa = {};
    const signupUrl = "https://api.hanbitco-qa.com/kakao/signup/";
    axios.post(signupUrl, dataa, {headers:{"Content-Type":"application/json"}})
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }

  handleClickKakaoLogin() {
    this.state.kakao.Auth.login({
      success: (response) => {
        console.log("res:", response);
        this.setState({"kakaoToken": response});
        this.doKakaoLogin(response);
      },
      fail: function(err) {
        alert(JSON.stringify(err));
      }
    });
  }
  render(){
    return(
      <Container>
        <Alert variant="success">
          <Alert.Heading>카카오 회원가입</Alert.Heading>
          <p>accessToken:{JSON.stringify(this.state.kakaoToken)}</p>
          <hr />
          <p className="mb-0">
            회원가입을 누르면 카카오에서 토큰을 받아서 kakao/v2/me를 호출해서 email, kakaoId를 받아서 진행 합니다.
          </p>
        </Alert>
        <Button onClick={()=>this.handleClickKakaoLogin()} variant="primary">회원가입</Button>
      </Container>
    )

  }
}

export default Signup;
