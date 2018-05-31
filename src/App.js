import React, { Component } from 'react'; 
import './App.css';
import * as firebase from 'firebase'; 
import RoomList from './components/RoomList'; 
import MessageList from './components/MessageList'; 

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
  constructor(props){
    super(props); 
    this.state= { activeRoom: ''}; 

  }; 

  changeActiveRoom(room) {
      this.setState({activeRoom: room});
  } 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Bloc Chat</h1>
        </header>
       <main>
          <RoomList firebase={firebase} 
          changeActiveRoom = {this.changeActiveRoom.bind(this)}
          activeRoom= {this.state.activeRoom} />
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />

       </main>
      </div>
    );
  }
}

export default App;
