import React, { Component } from 'react';
import Select from 'react-select'
import {InputGroup, FormControl, Form, Button, Card, Container, Badge} from 'react-bootstrap';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

const list = [
  {"week":11, "addr":"창1:26", "text":"하나님이 이르시되 우리의 형상을 따라 우리의 모양대로 우리가 사람을 만들고 그들로 바다의 물고기와 하늘의 새와 가축과 온 땅과 땅에 기는 모든 것을 다스리게 하자 하시고"},
  {"week":11, "addr":"고후5:17", "text":"그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다"},
  {"week":12, "addr":"갈3:13", "text":"그리스도께서 우리를 위하여 저주를 받은 바 되사 율법의 저주에서 우리를 속량하셨으니 기록된 바 나무에 달린 자마다 저주 아래에 있는 자라 하였음이라"},
  {"week":12, "addr":"롬4:25", "text":"예수는 우리가 범죄한 것 때문에 내줌이 되고 또한 우리를 의롭다 하시기 위하여 살아나셨느니라"},
  {"week":13, "addr":"eee", "text":"예수는 우리가 범죄한 것 때문에 내줌이 되고 또한 우리를 의롭다 하시기 위하여 살아나셨느니라"},
  {"week":13, "addr":"aaa", "text":"예수는 우리가 범죄한 것 때문에 내줌이 되고 또한 우리를 의롭다 하시기 위하여 살아나셨느니라"},
]

class BibleRemember extends Component {
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
    if (this.state.value === this.state.data.text) {
      alert("맞았어요");
      const passedAnswers = this.state.passedAnswers;
      passedAnswers.push(this.state.data);
      this.setState({passedAnswers:passedAnswers});
      this.init();
      this.handleClickNextQuestion(12);
    }else{
      this.setState({
        wrongAnswers: this.state.wrongAnswers.concat(this.state.value),
        value:""
      })
    }
  }
  handleClickNextQuestion(week){
    const thisWeekList = list.filter(item => item.week === week);
    const rnd = Math.floor(Math.random() * Math.floor(thisWeekList.length));
    const data = thisWeekList[rnd];
    data.index = rnd+1;
    this.setState({"data":data, "value":""})
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
    this.handleClickNextQuestion(12);
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
      <Container>
        <Select options={options}
                defaultValue={{ label: "1주차", value: 1 }}
                onChange={this.handleChangeSelect}/>
        <Card>
          <Card.Body>
            <Card.Text>
            </Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>passed answers</Card.Title>
            <Card.Text>
              {this.state.passedAnswers.map(answer=><Badge key={Math.random()}>{answer.addr}</Badge>)}
            </Card.Text>
          </Card.Body>

          <Card.Body>
            <Card.Title>wrong answers</Card.Title>
              {this.state.wrongAnswers.map(answer=><Card.Text key={answer}>{answer}</Card.Text>)}
          </Card.Body>
          <Card.Body>
            <Card.Title>문제{`${this.state.data.index}: ${this.state.data.addr}`}<Button as="input" size="sm" value={this.state.showHint?"힌트감추기":"힌트보이기"} onClick={()=>this.handleClickHint()}/></Card.Title>
            <Card.Text>
              {this.state.showHint ? `${this.state.data.text.substr(0, 8)}`:"힌트 버튼을 누르면 힌트가 보입니다."}<br/>

              answer:<br/>
              <Form.Control as="textarea" rows="3" value={this.state.value} onChange={this.handleChange}/>
              <Button as={"input"} size="sm" variant={"outline-primary"} onClick={()=>this.handleClickCheckAnswer()} value={"맞는지?"}/><br/>
              <Button as={"input"} size="sm" value={this.state.showAnswer?"답감추기":"답보이기"} onClick={()=>this.handleClickShowButton()}/>
            </Card.Text>
          </Card.Body>
          <Card.Body>
            {this.state.showAnswer ?`${this.state.data.text}`:"답보이기 버튼을 누르면 답이 보입니다."}<br/>
            <Button size={"sm"} onClick={()=>this.handleClickNextQuestion(12)}>다음문제</Button>
          </Card.Body>
          <Card.Body>
            {this.state.showKakao ?<img alt={"eee"} src={"https://usefulpa.s3.amazonaws.com/images/2014/kakao_account_login_btn_large_narrow_ov.png"} />:"---"}<br/>
            <Button size={"sm"} onClick={()=>this.handleClickShowKakao()}>로그인보이기</Button><br/>
          </Card.Body>
        </Card>
        <a href={"https://docs.google.com/spreadsheets/d/1NkfE4j1oM0drkM7TC1zwAfPBBC5IPr4Wk4RPZeTft7o"}>한방에찾기</a>
      </Container>
    )

  }
}

export default BibleRemember;
