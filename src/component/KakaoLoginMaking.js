import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';

const nello = (response) =>{
  console.log(response);

  console.log("------nello-----");
}

class KakaoLoginMaking extends Component{
  constructor(props) {
    super(props);
    this.state = {"kakao":null, kakaoMe:null}
  }

  handleClickLoginButton() {
  }

  componentDidMount(){
    if (Kakao.Auth == null) {
      Kakao.init('39c0f53356e324929bb78bd27b69bb6b');
    }
    this.setState({"kakao": Kakao})
  }

  handleClickMove() {
    console.log("ssssss");
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

            const email = kakaoAccount.email;
            Auth.signIn(email)
              .then(res=>{
                console.log(res);
                console.log("-------------");
              });
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
        id:<input type="text"/><br/>
        pw:<input type="text"/><br/>
        <button onClick={()=>this.handleClickLoginButton()}>한빗코 로그인</button><br/>

        <img onClick={()=>this.handleClickKakaoLogin()} src={"https://kauth.kakao.com/public/widget/login/kr/kr_02_medium.png"}/>
      </div>
    );
  }
}

export default KakaoLoginMaking;
