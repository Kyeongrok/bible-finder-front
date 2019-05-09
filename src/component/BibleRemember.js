import React, { Component } from 'react';
import axios from 'axios';

class BibleFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {"index":"", "addr":""},
      value:"",
      showAnswer:false,
      showHint:false,
      showKakao:false,
      passedAnswers: [],
      wrongAnswers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCheckAnswer= this.handleClickCheckAnswer.bind(this);
  }
  init(){
    this.setState({
      data: {"index":"", "addr":""},
      value:"",
      showAnswer:false,
      showHint:false,
      showKakao:false,
      wrongAnswers: []
    });
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
      this.handleClickNextQuestion();
      this.init();
    }else{
      this.setState({
        wrongAnswers: this.state.wrongAnswers.concat(this.state.value),
        value:""
      })
    }
  }
  handleClickNextQuestion(){
    const url = "http://biblefinder.co.kr:5000/remember";
    axios.get(url)
      .then(response=>{
        console.log(response);
        this.setState({"data":response.data, "value":""})
      })
      .catch(error=>console.log(error))
  }

  handleClickHint() {
    if(this.state.showHint){
      this.setState({showHint: false});
    }else{
      this.setState({showHint: true});
    }
  }

  handleClickShowKakao() {
    if(this.state.showKakao){
      this.setState({showKakao: false});
    }else{
      this.setState({showKakao: true});
    }
  }
  componentDidMount(){
    this.init();
    this.handleClickNextQuestion();
  }
  handleClickRefresh(){

  }
  render(){
    return(
      <div>
        <div>
          passed answers:<br/>
          {this.state.passedAnswers.map(answer=><p key={Math.random()}>{answer.addr}</p>)}
          <br/>
          wrong answers:<br/>
          {this.state.wrongAnswers.map(answer=><p key={answer}>{answer}</p>)}
          <br/><br/>
        </div>
        문제{`${this.state.data.index}: ${this.state.data.addr}`}<button onClick={()=>this.handleClickHint()}>{this.state.showHint?"힌트감추기":"힌트보이기"}</button><br/>
        {this.state.showHint ? <p>{`${this.state.data.text.substr(0, 8)}`}</p>:<p>힌트 버튼을 누르면 힌트가 보입니다.</p>}
        answer:<br/>
        <textarea value={this.state.value} onChange={this.handleChange} style={{width:"300px", height:"100px"}}></textarea>
        <br/>
        <button onClick={()=>this.handleClickCheckAnswer()}>맞는지?</button><br/>
        <br/>
        <button onClick={()=>this.handleClickShowButton()}>{this.state.showAnswer?"답감추기":"답보이기"}</button>
        {this.state.showAnswer ?
          <div>{`${this.state.data.addr} ${this.state.data.text}`}</div>
          :<div>답보이기 버튼을 누르면 답이 보입니다.</div>}
        <br/>
        <button onClick={()=>this.handleClickNextQuestion()}>다음문제</button>
        <br/>
        {this.state.showKakao ?<img src={"https://usefulpa.s3.amazonaws.com/images/2014/kakao_account_login_btn_large_narrow_ov.png"} />:"---"}<br/>
        <button onClick={()=>this.handleClickShowKakao()}>로그인보이기</button><br/>
      </div>
    )

  }
}

export default BibleFinder;
