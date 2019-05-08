import React, { Component } from 'react';
import axios from 'axios';

class BibleFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      value:"",
      showAnswer:false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClickShowButton() {
    if(this.state.showAnswer){
      this.setState({showAnswer: false});
    }else{
      this.setState({showAnswer: true});
    }

  }
  componentDidMount(){
    const url = "http://biblefinder.co.kr:5000/remember";
    axios.get(url)
      .then(response=>{
        console.log(response);
        this.setState({"data":response.data})
      })
      .catch(error=>console.log(error))
  }
  render(){
    return(
      <div>
        문제:<p>{`${this.state.data.index} ${this.state.data.addr}`}</p>
        answer:<input type="text" value={this.state.value} onChange={this.handleChange} /><br/>
        <button onClick={()=>this.handleClickShowButton()}>{this.state.showAnswer?"감추기":"보이기"}</button><br/>
        {this.state.showAnswer ? <p>{`${this.state.data.index} ${this.state.data.addr} ${this.state.data.text}`}</p>:<p>보이기 버튼을 누르면 답이 보입니다.</p>}
      </div>
    )

  }
}

export default BibleFinder;
