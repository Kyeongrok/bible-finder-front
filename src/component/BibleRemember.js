import React, { Component } from 'react';
import Select from 'react-select'
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
      week:1,
      wrongAnswers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCheckAnswer= this.handleClickCheckAnswer.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
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

  handleChangeSelect(event) {

    this.setState({week: event.value});

    console.log(event.value);
  }
  render(){
    const options = [
      { value: 1, label: "1주차" },
      { value: 2, label: "2주차" },
      { value: 3, label: "3주차" },
      { value: 4, label: "4주차" },
      { value: 5, label: "5주차" },
      { value: 6, label: "6주차" },
      { value: 7, label: "7주차" },
      { value: 8, label: "8주차" },
      { value: 9, label: "9주차" },
      { value: 10, label: "10주차" },
      { value: 11, label: "11주차" },
      { value: 12, label: "12주차" },
      { value: 13, label: "13주차" },
      { value: 14, label: "14주차" },
      { value: 15, label: "15주차" },
      { value: 16, label: "16주차" },
      { value: 17, label: "17주차" },
      { value: 18, label: "18주차" },
    ]
    console.log(this.state);
    return(
      <div>
        <div>
          <Select options={options}
                  defaultValue={{ label: "1주차", value: 1 }}
                  onChange={this.handleChangeSelect}/>
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
          <div>{`${this.state.data.text}`}</div>
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
