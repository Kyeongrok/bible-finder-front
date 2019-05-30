import React, { Component } from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import axios from 'axios';
import {Col} from "react-bootstrap/es";

class ReadBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statements:[],
      shortenedBookName:"딤후",
      chapter:1
    };
  }

  componentDidMount(){
    this.handleChangeAddr("딤후", 1);
  }

  handleChangeAddr(book, chapter) {
    const url = `https://bag6ly7sng.execute-api.ap-northeast-2.amazonaws.com/prod/v1/find/chapter?book=${book}&chapter=${chapter}`
    axios.get(url)
      .then(res => {
        this.setState({statements:res.data});
      });
  }

  handleChangeBook(event) {
    this.setState({shortenedBookName: event.target.value});
  }

  handleChangeChapter(event) {

  }
  render(){
    console.log(this.state.statements);

    return (
      <Container>
        <Card>
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>줄인책이름</Form.Label>
                  <Form.Control type="text" placeholder="딤후" onChange={this.handleChangeBook.bind(this)} value={this.state.shortenedBookName} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>장</Form.Label>
                  <Form.Control type="text" placeholder="1" onChange={this.handleChangeChapter} value={this.state.chapter} />
                </Form.Group>
              </Form.Row>
            </Form>
          </Card.Body>
          <Card.Text>
            <Button onClick={()=>this.handleChangeAddr()}>button</Button>
          </Card.Text>
          {this.state.statements.map(statement=><Card.Text key={statement.index}>{statement.index + " " + statement.text}</Card.Text>)}
        </Card>
      </Container>
    )
  }
}

export default ReadBook;
