import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MessageContainer from './message/MessageContainer';
import ChannelContainer from './channel/ChannelContainer';

const firebase = window.firebase;

class App extends Component {
  state = {
    channelId : "",
    auth: false
  }

  componentDidMount(){
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData
        } = user;
        
        console.log(user);
        // ...
      } else {
        firebase.auth().signInWithRedirect(provider);
      }
    });
    


  }

  selectChannel = ( channelId ) => {
    console.log(channelId)
  }

  render() { 
    return (
      <div className="App">
        <ChannelContainer selectChannel={ this.selectChannel }/>
        <MessageContainer />
      </div> 
    );
  }
}

export default App;
   