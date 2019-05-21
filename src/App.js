import React, { Component } from 'react';
import './App.css';
import KakaoLoginMaking from './component/KakaoLoginMaking';
import BibleFinder from './component/BibleFinder';
import BibleRemember from './component/BibleRemember';
import Signup from './component/Signup';
import SeparateSit from './component/SeparateSit';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import KakaoTokenGetter from './component/KakaoTokenGetter';
import { Dropdown } from 'react-bootstrap';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  handleOpen = () => {
    console.log("--------");
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }
  render(){
    console.log(this.state.isOpen);
    return(
      <Dropdown

        onMouseOver = { this.handleOpen }
        onMouseLeave = { this.handleClose }
        isOpen={ this.state.isOpen }
      >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Menu
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item><Link to="/">Home</Link></Dropdown.Item>
          <li><Link to="/token">KakaoTokenGetter</Link></li>
          <li><Link to="/login/">KakaoLogin</Link></li>
          <li><Link to="/finder/">Finder</Link></li>
          <li><Link to="/remember/">Remember</Link></li>
          {/*<li><Link to="/signup/">회원가입(signup)</Link></li>*/}
          {/*<li><Link to="/oauth/">oauth</Link></li>*/}
          <li><Link to="/separate_sit/">자리배치</Link></li>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
    };
  }
  handleClickMenu() {
    if(this.state.showNav){
      this.setState({showNav: false});
    }else{
      this.setState({showNav: true});
    }

  }
  success(response){
    console.log(response);
  };
  render(){
    return (
    <Router>
      <div>
        <Nav/>
        <Route path="/" exact component={Signup}/>
        <Route path="/login/" component={KakaoLoginMaking}/>
        <Route path="/token/" component={KakaoTokenGetter}/>
        <Route path="/finder/" component={BibleFinder}/>
        <Route path="/remember/" component={BibleRemember}/>
        <Route path="/signup/" component={Signup}/>
        <Route path="/separate_sit/" component={SeparateSit}/>
        <Route path="/oauth/" component={KakaoTokenGetter}/>
      </div>
    </Router>
    );
  }
}

export default App;
