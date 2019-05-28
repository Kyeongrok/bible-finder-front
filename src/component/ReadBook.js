import React, { Component } from 'react';
import {Button, Card, Container} from "react-bootstrap";
import axios from 'axios';

class ReadBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChangeAddr() {
    const url = `https://hetws2in6b.execute-api.ap-northeast-2.amazonaws.com/prod/v1/find/between?book=${"딤후"}&chapter=${"1"}&verseFrom=${"1"}&verseTo=${"2"}`;
    axios.get(url)
      .then(res => {
        console.log(res);
      });
  }
  render(){

    return (
      <Container>
        <Card>
          <Card.Text>
            readBook
            <Button onClick={()=>this.handleChangeAddr()}>button</Button>
          </Card.Text>
        </Card>
      </Container>
    )
  }
}

export default ReadBook;
