import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';
import config from '../configuration/config';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {"kakaoToken":{}, kakaoMe:null}
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
  handleClickKakaoLogin() {
    this.state.kakao.Auth.login({
      success: (response) => {
        console.log("res:", response);
        this.setState({"kakaoToken": response});
        let url = "http://ec2-13-209-75-254.ap-northeast-2.compute.amazonaws.com:3001/kakao";
        url = "https://api.hanbitco-qa.com/v1/kakao/login/";
        console.log("[kakao_url]", url);
        axios.post(url, response)
          .then(res => {
            // this.setState({kakaoMe: res})
            console.log(res);
            const data = res.data.data;
            // 여기서 회원가입으로 이동
            // cognito연동
            let COGNITO;
            COGNITO = this.state.cognitoInfo;

            Amplify.configure({
              Auth: {
                userPoolId : COGNITO.USER_POOL_ID,
                userPoolWebClientId : COGNITO.CLIENT_ID,
                region: COGNITO.REGION
              }
            });

            // const email = kakaoAccount.email;
            const email = "oceanfog2@gmail.com";
            const kakaoId = data.id.toString();
            const username = email;
            const password = "1234@Aoeu";
            // 회원가입
            console.log("회원가입하기", email, kakaoId);
            const message = `${email}로 회원 가입 합니다. ${COGNITO.REGION}에서`;
            alert(message);
            // cognito call을 해서 cognito에 가입까지 되도록 한다.
            Auth.signUp({
              username,
              password,
              attributes: {
                email,          // optional
                // other custom attributes
                'custom:kakaoId' : kakaoId
              },
              validationData: []  //optional
            })
            .then(data => {
              console.log(data);
              alert("회원가입이 완료 되었습니다.");
            })
            .catch(err => {
              console.log("err", err)
              if (err.code === "UsernameExistsException") {
                alert("사용자가 이미 존재 합니다.");
              }
            });
          });
      },
      fail: function(err) {
        alert(JSON.stringify(err));
      }
    });
  }
  render(){
    return(
      <div>
        <Alert variant="success">
          <Alert.Heading>카카오 회원가입</Alert.Heading>
          <p>accessToken:{JSON.stringify(this.state.kakaoToken)}</p>
          <hr />
          <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things nice
            and tidy.
          </p>
        </Alert>
        <Button onClick={()=>this.handleClickKakaoLogin()} variant="primary">회원가입</Button>
      </div>
    )

  }
}

export default Signup;
