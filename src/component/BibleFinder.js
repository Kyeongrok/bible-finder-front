import React, { Component } from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';

class BibleFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {index:"", text:""}, targetAddr:"롬5:2"};
    this.handleChangeTargetAddr = this.handleChangeTargetAddr.bind(this);
  }
  componentDidMount(){
    this.findAndUpdate(this.state.targetAddr);
  }

  componentDidUpdate(prevState) {
    console.log("updated-----")
  }

  handleChangeTargetAddr(event) {
    this.setState({targetAddr: event.target.value});
  }

  handleClickFind() {
    this.findAndUpdate(this.state.targetAddr);
  }

  findAndUpdate(addr) {
    const url = "http://biblefinder.co.kr:5000/json/find-single/"+encodeURIComponent(addr);
    console.log(addr, url);
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
        <Card>
          <Card.Body>
            <Card.Title>Finder</Card.Title>
            <Card.Text>
              찾을곳:<input type="text" onChange={this.handleChangeTargetAddr} value={this.state.targetAddr}/> ex) 딤후3:16<br/>
              <Button onClick={()=>this.handleClickFind()}>찾기</Button>

              <p>
              {`${this.state.data.index} ${this.state.data.text}`}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )

  }
}

export default BibleFinder;
