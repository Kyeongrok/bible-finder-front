import React, { Component } from 'react';
import axios from 'axios';

class BibleFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {data: ""};
  }
  componentDidMount(){
    console.log("---");
    const url = "http://biblefinder.co.kr:5000/json/find-single/%EC%B0%BD1:1";
    axios.get(url)
      .then(response=>{
        console.log(response);
        this.setState({"data":response.data})
      })
      .catch(error=>console.log(error))
  }
  render(){
    console.log(this.state.data);
    return(
      <div>
        찾을곳:<input type="text"/> ex) 딤후3:16<br/>
        {`${this.state.data.index} ${this.state.data.text}`}
      </div>
    )

  }
}

export default BibleFinder;
