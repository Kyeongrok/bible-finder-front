import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';

class KakaoLogin extends Component{
  constructor(props) {
    super(props);
  }

  handleClickLoginButton() {
    console.log("button_clicked")
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

    const email = "oceanfog1@gmail.com";
    const password = "1234@Aoeu";

    Auth.signIn(email, password)
      .then(res=>console.log(res));
  }

  callServer(token) {
    console.log("카카오 /v2/user/me를 콜해서 id를 받아옴");
  }

  componentDidMount(){
    if (Kakao.Auth == null) {
      Kakao.init('39c0f53356e324929bb78bd27b69bb6b');
    }
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function (authObj) {
        console.log(authObj)
        const url = "http://localhost:3001/kakao";
        axios.post(url, authObj)
          .then(res => console.log(res));
      },
      fail: function(err) {
        console.log("---fail---");
        alert(JSON.stringify(err));
      }
    });
  }
  render(){
    return (
      <div>
        id:<input type="text"/><br/>
        pw:<input type="text"/><br/>
        pw_confirm:<input type="text"/><br/>
        <button onClick={()=>this.handleClickLoginButton()}>한빗코 로그인</button><br/>
        <a id="kakao-login-btn"></a>
      </div>
    );
  }
}

export default KakaoLogin;
