import React, { Component } from 'react';
import Kakao from 'kakaojs';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';

class Signup extends Component {
  componentDidMount(){
    console.log("---");
    const url = "http://biblefinder.co.kr:5000/find-single/%EC%B0%BD1:1";
    axios.get(url)
      .then(response=>console.log(response))
      .catch(error=>console.log(error))
  }
  render(){
    return(
      <div>
        id:<input type="text"/><br/>
        pw:<input type="text"/><br/>
        pw_confirm:<input type="text"/><br/>
        <button>회원가입하기</button>

      </div>
    )

  }
}

export default Signup;
