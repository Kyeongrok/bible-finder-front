import React, { Component } from 'react';
import './App.css';
import KakaoLogin from './component/KakaoLogin';
import BibleFinder from './component/BibleFinder';
import BibleRemember from './component/BibleRemember';
import Signup from './component/Signup';
import SeparateSit from './component/SeparateSit';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Nav = ()=>{
  return(
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login/">KakaoLogin</Link></li>
        <li><Link to="/finder/">Finder</Link></li>
        <li><Link to="/remember/">Remember</Link></li>
        <li><Link to="/signup/">회원가입(signup)</Link></li>
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
  render(){
    return (
    <Router>
      <div>
        <button onMouseEnter={()=>this.handleClickMenu()} onClick={()=>this.handleClickMenu()}>menu</button>
        {this.state.showNav ?<Nav/>:<p></p>}
        <Route path="/" exact component={BibleRemember}/>
        <Route path="/login/" component={KakaoLogin}/>
        <Route path="/finder/" component={BibleFinder}/>
        <Route path="/remember/" component={BibleRemember}/>
        <Route path="/signup/" component={Signup}/>
        <Route path="/separate_sit/" component={SeparateSit}/>
      </div>
    </Router>

    );
  }


}

export default App;
