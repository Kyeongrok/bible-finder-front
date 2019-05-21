import React, { Component } from 'react';
import './App.css';
import KakaoLoginMaking from './component/KakaoLoginMaking';
import BibleFinder from './component/BibleFinder';
import BibleRemember from './component/BibleRemember';
import Signup from './component/Signup';
import SeparateSit from './component/SeparateSit';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import KakaoTokenGetter from './component/KakaoTokenGetter';

const Nav = ()=>{
  return(
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/token">KakaoTokenGetter</Link></li>
        <li><Link to="/login/">KakaoLogin</Link></li>
        {/*<li><Link to="/finder/">Finder</Link></li>*/}
        <li><Link to="/remember/">Remember</Link></li>
        {/*<li><Link to="/signup/">회원가입(signup)</Link></li>*/}
        {/*<li><Link to="/oauth/">oauth</Link></li>*/}
        <li><Link to="/separate_sit/">자리배치</Link></li>
      </ul>
    </nav>
  )
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
        <button onMouseEnter={()=>this.handleClickMenu()} onClick={()=>this.handleClickMenu()}>menu</button>
        {this.state.showNav ?<Nav/>:""}
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
