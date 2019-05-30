import React, { Component } from 'react';
import {Button, Card, Container} from "react-bootstrap";
import axios from 'axios';

class ReadBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statements:[]
    };
  }

  componentDidMount(){
    this.handleChangeAddr();
  }

  handleChangeAddr() {
    const url = `https://bag6ly7sng.execute-api.ap-northeast-2.amazonaws.com/prod/v1/find/chapter?book=${"딤후"}&chapter=${1}`
    axios.get(url)
      .then(res => {
        this.setState({statements:res.data});
      });
  }
  render(){
    console.log(this.state.statements);

    return (
      <Container>
        <Card>
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
