import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';

class KakaoLogin extends Component{

  hello(kkkk){
    console.log(kkkk);
  }

  login(authenticationDetails) {

  }
  async componentDidMount(){
    const COGNITO = {
      REGION: 'us-west-2',
        USER_POOL_ID: 'us-west-2_xRKVaj5ls',
        CLIENT_ID: '5084o932i7age4c0tc9j2unmff',
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

    let cognitoUser = await Auth.signIn(email, password);

    console.log(cognitoUser);

    Kakao.init('e9c4b1d97b8bac697985d17eb59516b3');
    console.log(Kakao);
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
        alert(JSON.stringify(authObj));
      },
      fail: function(err) {
        alert(JSON.stringify(err));
      }
    });
  }
  render(){
    return (
      <div>
        <a id="kakao-login-btn"></a>
      </div>
    );
  }
}

export default KakaoLogin;
