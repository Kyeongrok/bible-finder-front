import React, { Component } from 'react';
import './App.css';
import KakaoLoginMaking from './component/KakaoLoginMaking';
import BibleFinder from './component/BibleFinder';
import BibleRemember from './component/BibleRemember';
import Signup from './component/Signup';
import SeparateSit from './component/SeparateSit';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import KakaoTokenGetter from './component/KakaoTokenGetter';
import {Button} from 'react-bootstrap';

import configuration from './configuration/config';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }
  render(){
    console.log("hostname:e", this.props.hostName);
    return(
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/token">KakaoTokenGetter</Link></li>
          <li><Link to="/login/">KakaoLogin</Link></li>
          {this.props.hostName === "biblefinder.co.kr"?<li><Link to="/finder/">Finder</Link></li>:""}
          {this.props.hostName === "biblefinder.co.kr"?<li><Link to="/remember/">Remember</Link></li>:""}
          <li><Link to="/signup/">회원가입(signup)</Link></li>
          {/*<li><Link to="/oauth/">oauth</Link></li>*/}
          {this.props.hostName === "biblefinder.co.kr"?<li><Link to="/separate_sit/">자리배치</Link></li>:""}
        </ul>
      </nav>
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
    const hostname = window && window.location && window.location.hostname;
    return (
    <Router>
      <Button size={"sm"} onMouseEnter={()=>this.handleClickMenu()} onClick={()=>this.handleClickMenu()}>menu</Button>
      {this.state.showNav ?<Nav hostName={hostname}/>:""}
        <Route path="/" exact component={Signup}/>
        <Route path="/login/" component={KakaoLoginMaking}/>
        <Route path="/token/" component={KakaoTokenGetter}/>
        <Route path="/finder/" component={BibleFinder}/>
        <Route path="/remember/" component={BibleRemember}/>
        <Route path="/signup/" component={Signup}/>
        <Route path="/separate_sit/" component={SeparateSit}/>
        <Route path="/oauth/" component={KakaoTokenGetter}/>
    </Router>
    );
  }
}

export default App;
