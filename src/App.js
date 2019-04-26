import React from 'react';
import './App.css';
import KakaoLogin from './component/KakaoLogin';
import BibleFinder from './component/BibleFinder';
import Signup from './component/Signup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function InitComponent(){
  return (
    <div className="App">
      id:<input type="text"/><br/>
      pw:<input type="text"/><br/>
      <a href="">한빗코 로그인</a>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login/">KakaoLogin</Link></li>
            <li><Link to="/finder/">Finder</Link></li>
            <li><Link to="/signup/">회원가입(signup)</Link></li>
          </ul>
        </nav>
        <Route path="/" exact component={InitComponent} />
        <Route path="/login/" component={KakaoLogin} />
        <Route path="/finder/" component={BibleFinder} />
        <Route path="/signup/" component={Signup} />
      </div>
    </Router>
  );
}

export default App;
