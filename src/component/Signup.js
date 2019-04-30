import React, { Component } from 'react';
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

      </div>
    )

  }
}

export default Signup;
