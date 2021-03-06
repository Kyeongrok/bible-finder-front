import React, { Component } from 'react';
import Select from 'react-select'
import {Form, Button, Card, Container, Badge} from 'react-bootstrap';
import eee from '../libs/globalPrototype';

const list = [
  {"week":11, "addr":"창1:26", "text":"하나님이 이르시되 우리의 형상을 따라 우리의 모양대로 우리가 사람을 만들고 그들로 바다의 물고기와 하늘의 새와 가축과 온 땅과 땅에 기는 모든 것을 다스리게 하자 하시고"},
  {"week":11, "addr":"고후5:17", "text":"그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다"},
  {"week":12, "addr":"갈3:13", "text":"그리스도께서 우리를 위하여 저주를 받은 바 되사 율법의 저주에서 우리를 속량하셨으니 기록된 바 나무에 달린 자마다 저주 아래에 있는 자라 하였음이라"},
  {"week":12, "addr":"롬4:25", "text":"예수는 우리가 범죄한 것 때문에 내줌이 되고 또한 우리를 의롭다 하시기 위하여 살아나셨느니라"},
  {"week":13, "addr":"엡2:8-9", "text":"너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라 행위에서 난 것이 아니니 이는 누구든지 자랑하지 못하게 함이라"},
  {"week":13, "addr":"고후5:21", "text":"하나님이 죄를 알지도 못하신 이를 우리를 대신하여 죄로 삼으신 것은 우리로 하여금 그 안에서 하나님의 의가 되게 하려 하심이라"},
  {"week":14, "addr":"고전16:19-20", "text":"아시아의 교회들이 너희에게 문안하고 아굴라와 브리스가와 그 집에 있는 교회가 주 안에서 너희에게 간절히 문안하고 모든 형제도 너희에게 문안하니 너희는 거룩하게 입맞춤으로 서로 문안하라"},
  {"week":14, "addr":"갈5:22-23", "text":"오직 성령의 열매는 사랑과 희락과 화평과 오래 참음과 자비와 양선과 충성과 온유와 절제니 이같은 것을 금지할 법이 없느니라"},
  {"week":15, "addr":"마24:14", "text":"이 천국 복음이 모든 민족에게 증언되기 위하여 온 세상에 전파되리니 그제야 끝이 오리라"},
  {"week":15, "addr":"약1:12", "text":"시험을 참는 자는 복이 있나니 이는 시련을 견디어 낸 자가 주께서 자기를 사랑하는 자들에게 약속하신 생명의 면류관을 얻을 것이기 때문이라"},
  {"week":16, "addr":"요일4:12", "text":"어느 때나 하나님을 본 사람이 없으되 만일 우리가 서로 사랑하면 하나님이 우리 안에 거하시고 그의 사랑이 우리 안에 온전히 이루어지느니라"},
  {"week":16, "addr":"요13:34-35", "text":"새 계명을 너희에게 주노니 서로 사랑하라 내가 너희를 사랑한 것 같이 너희도 서로 사랑하라 너희가 서로 사랑하면 이로써 모든 사람이 너희가 내 제자인 줄 알리라"},
  {"week":17, "addr":"마4:19-20", "text":"말씀하시되 나를 따라오라 내가 너희를 사람을 낚는 어부가 되게 하리라 하시니 그들이 곧 그물을 버려 두고 예수를 따르니라"},
  {"week":17, "addr":"요20:21", "text":"예수께서 또 이르시되 너희에게 평강이 있을지어다 아버지께서 나를 보내신 것 같이 나도 너희를 보내노라"},
  {"week":18, "addr":"빌3:20", "text":"그러나 우리의 시민권은 하늘에 있는지라 거기로부터 구원하는 자 곧 주 예수 그리스도를 기다리노니"},
  {"week":18, "addr":"롬12:2", "text":"너희는 이 세대를 본받지 말고 오직 마음을 새롭게 함으로 변화를 받아 하나님의 선하시고 기뻐하시고 온전하신 뜻이 무엇인지 분별하도록 하라"},
  {"week":19, "addr":"요4:23-24", "text":"아버지께 참되게 예배하는 자들은 영과 진리로 예배할 때가 오나니 곧 이 때라 아버지께서는 자기에게 이렇게 예배하는 자들을 찾으시느니라 하나님은 영이시니 예배하는 자가 영과 진리로 예배할지니라"},
  {"week":19, "addr":"롬12:1", "text":"그러므로 형제들아 내가 하나님의 모든 자비하심으로 너희를 권하노니 너희 몸을 하나님이 기뻐하시는 거룩한 산 제물로 드리라 이는 너희가 드릴 영적 예배니라"},
  {"week":20, "addr":"벧전4:9-10", "text":"서로 대접하기를 원망 없이 하고 각각 은사를 받은 대로 하나님의 여러 가지 은혜를 맡은 선한 청지기 같이 서로 봉사하라"},
  {"week":20, "addr":"눅17:10", "text":"이와 같이 너희도 명령 받은 것을 다 행한 후에 이르기를 우리는 무익한 종이라 우리가 하여야 할 일을 한 것뿐이라 할지니라"},
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
      week:this.getWeek(),
      wrongAnswers: [],
      answerIndex: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCheckAnswer= this.handleClickCheckAnswer.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  getWeek() {
    return new Date().getWeek(3) - 8;
  }
  init(){
    // 몇주차인지 여기에서 한다.
    this.setState({
      data: {"index":"", "addr":""},
      value:"",
      week:this.getWeek(),
      showAnswer:false,
      showHint:false,
      showKakao:false,
      wrongAnswers: [],
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
      this.handleClickNextQuestion(this.state.week);
    }else{
      this.setState({
        wrongAnswers: this.state.wrongAnswers.concat(this.state.value),
        value:""
      })
    }
  }
  handleClickNextQuestion(){
    const week = this.state.week;
    const thisWeekList = list.filter(item => item.week === week);
    const rnd = Math.floor(Math.random() * Math.floor(thisWeekList.length));
    let index = 0;
    if(this.state.answerIndex - 1 < thisWeekList.length){
      index = this.state.answerIndex + 1;
    }else{

    }
    const data = thisWeekList[rnd];
    this.setState({"data":data, "value":"", answerIndex:rnd})
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    // week가 바뀌면...
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
    return(
      <Container>
        <Select options={options}
                defaultValue={options[this.getWeek()-1]}
                onChange={this.handleChangeSelect}/>
        <Card>
          <Card.Body>
            <Card.Title>passed answers</Card.Title>
            <Card.Text>
              {this.state.passedAnswers.map(answer=><Badge variant={"secondary"} key={Math.random()}>{answer.addr}</Badge>)}
            </Card.Text>
          </Card.Body>

          <Card.Body>
            <Card.Title>wrong answers</Card.Title>
              {/*{this.state.wrongAnswers.map(answer=><Card.Text key={answer}>{answer}</Card.Text>)}*/}
            <Form.Control as="textarea" rows="3" value={this.state.wrongAnswers.map(answer=>answer + "\n")} onChange={()=>console.log()} />
          </Card.Body>
          <Card.Body>
            <Card.Title>문제{`${this.state.answerIndex}: ${this.state.data.addr}`}<Button as="input" size="sm" variant={"outline-primary"} value={this.state.showHint?"힌트감추기":"힌트보이기"} onClick={()=>this.handleClickHint()}/>
              <Button size={"sm"} onClick={()=>this.handleClickNextQuestion()}>다음문제</Button>
            </Card.Title>
            <Card.Text>
              {this.state.showHint ? `${this.state.data.text.substr(0, 8)}`:"힌트 버튼을 누르면 힌트가 보입니다."}<br/>

              answer:<br/>
              <Form.Control as="textarea" rows="3" value={this.state.value} onChange={this.handleChange}/>
              <Button as={"input"} size="sm" variant={"outline-primary"} onClick={()=>this.handleClickCheckAnswer()} value={"맞는지?"}/><br/>
              <Button as={"input"} size="sm" value={this.state.showAnswer?"답감추기":"답보이기"} onClick={()=>this.handleClickShowButton()}/>
            </Card.Text>
            <Card.Text>
              {this.state.showAnswer ?`${this.state.data.text}`:"답보이기 버튼을 누르면 답이 보입니다."}<br/>
            </Card.Text>
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
