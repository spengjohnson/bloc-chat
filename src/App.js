import React, { Component } from 'react'; 
import './App.css';
import * as firebase from 'firebase'; 
import RoomList from './components/RoomList'; 
import MessageList from './components/MessageList'; 
import User from './components/User'; 

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

  setUser(user) {
    this.setState({ user: user }); 
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>TeleMed Chat</h1> <ion-icon name="medkit"></ion-icon>
          <p>Got health questions that don't feel worth a trip to the doctor's office? Discuss them here to get a health professional's advice!</p>
        </header>
       <main>
          <RoomList firebase={firebase} 
          changeActiveRoom = {this.changeActiveRoom.bind(this)}
          activeRoom= {this.state.activeRoom} />
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user} />
          <User firebase={firebase} user={this.state.user} setUser={this.setUser.bind(this)} />


       </main>
      </div>
    );
  }
}

export default App;
