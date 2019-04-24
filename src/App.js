import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import KakaoLogin from './component/KakaoLogin';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        id:<input type="text"/>
        pw:<input type="text"/>
        <KakaoLogin/>

      </header>
    </div>
  );
}

export default App;
