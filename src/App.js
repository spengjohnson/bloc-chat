import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import './App.css';
import * as firebase from 'firebase'; 
import RoomList from './components/RoomList'; 

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjN8KjkArDS60TPELZUevcw9o5bntymWU",
    authDomain: "bloc-chat-6d11b.firebaseapp.com",
    databaseURL: "https://bloc-chat-6d11b.firebaseio.com",
    projectId: "bloc-chat-6d11b",
    storageBucket: "bloc-chat-6d11b.appspot.com",
    messagingSenderId: "716328161162"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Bloc Chat</h1>
        </header>
       <main>
        <Route path="./components/RoomList" component={RoomList} /> 
       </main>
      </div>
    );
  }
}

export default App;
