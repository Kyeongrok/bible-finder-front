import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';

class Signup extends Component {
  componentDidMount(){
    if (Kakao.Auth == null) {
      Kakao.init('39c0f53356e324929bb78bd27b69bb6b');
    }
    this.setState({"kakao": Kakao})
  }
  handleClickKakaoLogin() {
    this.state.kakao.Auth.login({
      success: (response) => {
        console.log("res:", response);
        const url = "http://localhost:3001/kakao";
        axios.post(url, response)
          .then(res => {
            // this.setState({kakaoMe: res})
            console.log(res);
            const data = res.data;
            const kakaoAccount = data.kakao_account;
            // 여기서 회원가입으로 이동
            // cognito연동
            let COGNITO = {}

            COGNITO = {REGION: 'ap-northeast-2', USER_POOL_ID: 'ap-northeast-2_CHGQe7flY', CLIENT_ID: '29ilv9idglfh0spnbe9tpfb19m',}
            COGNITO = {REGION: 'us-west-2', USER_POOL_ID: 'us-west-2_xRKVaj5ls', CLIENT_ID: '5084o932i7age4c0tc9j2unmff',}

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
              .then(data => console.log(data))
              .catch(err => console.log(err));

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
        <button onClick={()=>this.handleClickKakaoLogin()}>회원가입</button>
      </div>
    )

  }
}

export default Signup;
