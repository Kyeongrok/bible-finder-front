import React, { Component } from 'react';
import axios from 'axios';

class BibleFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {"index":"", "addr":""},
      value:"",
      showAnswer:false,
      passedAnswers: [],
      wrongAnswers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCheckAnswer= this.handleClickCheckAnswer.bind(this);
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

  handleClickCheckAnswer() {
    if (this.state.value == this.state.data.text) {
      alert("맞았어요");
      const passedAnswers = this.state.passedAnswers;
      passedAnswers.push(this.state.data);
      this.setState({passedAnswers:passedAnswers});
    }else{
      this.setState({
        wrongAnswers: this.state.wrongAnswers.concat(this.state.value)
      })
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
        <div>
          passed answers:<br/>
          {this.state.passedAnswers.map(answer=><p>{answer.addr}</p>)}
          <br/>
          wrong answers:<br/>
          {this.state.wrongAnswers.map(answer=><p key={answer}>{answer}</p>)}

        </div>
        문제:{`${this.state.data.index} ${this.state.data.addr}`}<br/>
        answer:<input type="text" value={this.state.value} onChange={this.handleChange} /><button onClick={()=>this.handleClickCheckAnswer()}>맞는지?</button><br/>
        <button onClick={()=>this.handleClickShowButton()}>{this.state.showAnswer?"감추기":"보이기"}</button><br/>
        {this.state.showAnswer ? <p>{`${this.state.data.index} ${this.state.data.addr} ${this.state.data.text}`}</p>:<p>보이기 버튼을 누르면 답이 보입니다.</p>}
      </div>
    )

  }
}

export default BibleFinder;
