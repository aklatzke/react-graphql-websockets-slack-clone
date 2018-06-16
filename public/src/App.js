import React, { Component } from 'react';
import './App.css';

import MessageContainer from './message/MessageContainer';
import ChannelContainer from './channel/ChannelContainer';

import { client, gql } from './graphql';
import { CHANNEL_ADD_MUTATION } from './graphql/queries';

const firebase = window.firebase;

const USER_INSERT_MUTATION = gql`
  mutation addUser( $displayName: String!, $email: String!, $emailVerified: Boolean!, $photoURL: String!, $uid: String! ){
    addUser( displayName: $displayName, email: $email, emailVerified: $emailVerified, photoURL: $photoURL, uid: $uid ){
      displayName,
      email,
      emailVerified,
      photoURL,
      uid,
      channels{
        _id,
        name,
        type
      }
    }
  }
`;

const GET_ACTIVE_USER = gql`
  query currentUser( $email: String! ){
    currentUser( email: $email ){
      _id,
      displayName,
      email,
      emailVerified,
      photoURL,
      uid,
      channels{
        _id,
        name,
        type
      }
    }
  }
`;

class App extends Component {
  state = {
    channelId : "",
    user: {},
    activeChannel: ""
  }

  componentDidMount(){
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          uid
        } = user;

        client.mutate({
            mutation: USER_INSERT_MUTATION,
            variables: { displayName, email, emailVerified, photoURL, uid }
        })
        .then( data => {
            client.query({
              query: GET_ACTIVE_USER,
              variables: { email }
            })
            .then(data => {
              console.log(data)
              this.setState({
                user: data.data.currentUser
              })
            })
        })
      } else {
        firebase.auth().signInWithRedirect(provider);
      }
    });
  }

  updateUser = ( key, value ) => {
    let newUser = this.state.user;

    if( key === "channels" ){
      newUser.channels = [...newUser.channels, value].reduce( (carry, next) => {
        if (!carry.some(item => item._id === next._id))
          carry.push(next);
      
        return carry;
      }, [])

      client.mutate({
        mutation: CHANNEL_ADD_MUTATION,
        variables: {
          channelId: value._id,
          userId: this.state.user._id
        }
      })
    }

    this.setState({
      user: newUser
    })
  }

  selectChannel = ( channelId ) => {
    this.setState({
      activeChannel: channelId
    })
  }

  render() { 
    return (
      <div className="App">
        <ChannelContainer selectChannel={ this.selectChannel } user={ this.state.user } />
        <MessageContainer currentChannel={ this.state.activeChannel } user={ this.state.user } updateUser={ this.updateUser }/>
      </div> 
    );
  }
}

export default App;
   