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
      // Kakao.Auth.login

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
    console.log("props:", this.props.match.params);
    console.log(this.props.location.search)
    return(
      <div>
        <Button onClick={()=>this.handleClickKakaoLogin()}>토큰받기(두번누르세요)</Button><br/>
        {JSON.stringify(this.state.kakaoToken)}
        <a
          href="https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fclient_id%3D6e19bc158e7ddb45c3f2d1877ba79da8%26redirect_uri%3Dhttps%3A%2F%2Fhanbitco-qa.firebaseapp.com%2Foauth%26response_type%3Dcode"
          className="btnKakao" title="카카오계정으로 로그인"><i>TALK</i>카카오계정으로 로그인</a>
      </div>
    )
  }
}


export default TokenGetter;
