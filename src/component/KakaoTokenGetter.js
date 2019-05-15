import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import config from '../configuration/config';

class TokenGetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "kakao": null,
      kakaoMe: null,
      accessToken: "",
      kakaoToken:{},
      idToken: ""
    }
  }

  handleClickLoginButton() {
  }

  componentDidMount() {

    const hostname = window && window.location && window.location.hostname;
    let cnf = config.get('local');
    console.log("cnf:", cnf);
    if (Kakao.Auth == null) {
      if (hostname === "localhost") {
        cnf = config.get('local');
      } else if (hostname === "hanbitco-qa.firebaseapp.com") {
        cnf = config.get('qa');
      }
      console.log("hostname:", hostname, cnf);
      Kakao.init(cnf.javaScriptKey);

    }
    this.setState({"kakao": Kakao})
  }
  handleClickKakaoLogin() {
    console.log("[click_login]");
    this.state.kakao.Auth.login({
      success: (response) => {
        console.log("res:", response);
        this.setState({kakaoToken: response});
      },
      fail:err=>{
        alert(JSON.stringify(err));
      }
    });
  }


  render() {

    console.log(this.state.kakaoToken);
    return(
      <div>
        <Button onClick={()=>this.handleClickKakaoLogin()}>토큰받기(두번누르세요)</Button><br/>
        {JSON.stringify(this.state.kakaoToken)}
      </div>
    )
  }
}


export default TokenGetter;
