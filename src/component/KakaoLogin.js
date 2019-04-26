import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';

class KakaoLogin extends Component{

  hello(kkkk){
    console.log(kkkk);
  }

  handleClickLoginButton() {
    console.log("button_clicked")
    const COGNITO = {
      REGION: 'us-west-2',
      USER_POOL_ID: 'us-west-2_xRKVaj5ls',
      CLIENT_ID: '5084o932i7age4c0tc9j2unmff',
      IDENTITY_POOL_ID: 'us-west-2:6bc7ecdf-07db-4858-ae9b-fabb95a64b9d',
      IDP_URL: 'cognito-idp.us-west-2.amazonaws.com',
    }

    const COGNITO2 = {
      REGION: 'ap-northeast-2',
      USER_POOL_ID: 'ap-northeast-2_CHGQe7flY',
      CLIENT_ID: '29ilv9idglfh0spnbe9tpfb19m',
      IDENTITY_POOL_ID: 'us-west-2:6bc7ecdf-07db-4858-ae9b-fabb95a64b9d',
      IDP_URL: 'cognito-idp.us-west-2.amazonaws.com',
    }

    Amplify.configure({
      Auth: {
        userPoolId : COGNITO.USER_POOL_ID,
        userPoolWebClientId : COGNITO.CLIENT_ID,
        storage: sessionStorage,
        region: COGNITO.REGION,
        authenticationFlowType: 'CUSTOM_AUTH',
      }
    });

    const email = "oceanfog1@gmail.com";
    const password = "1234@Aoeu";

    Auth.signIn(email, password)
      .then(res=>console.log(res));

  }

  componentDidMount(){

    Kakao.init('e9c4b1d97b8bac697985d17eb59516b3');
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
        alert(JSON.stringify(authObj));
        const url = "https://kapi.kakao.com/v2/user/me";
        axios.get(url, {headers: {'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer pVCHJggyYljOzsWC7VK2rPNIUYvDZYWWg_U65QopyNoAAAFqWLEHWQ'
          }})
          .then(res => console.log(res));

        console.log(authObj);
        console.log("카카오 /v2/user/me를 콜해서 id를 받아옴")
      },
      fail: function(err) {
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
