import React, {Component} from 'react'
import './MessageContainer.css';

import { client, gql } from '../graphql';

import {
    SINGLE_CHANNEL_QUERY,
    MESSAGE_ADDED_SUBSCRIPTION,
    ADD_MESSAGE_MUTATION
} from '../graphql/queries';

import ChatField from './components/ChatField';
import ChannelMessages from './components/ChannelMessages';

export default class MessageContainer extends Component{
    state = {
        chat: "",
        channelData : {}
    }

    componentDidUpdate(prevProps){
        if( this.props.currentChannel !== prevProps.currentChannel){
            client.query({
                query: SINGLE_CHANNEL_QUERY,
                variables: {
                    id: this.props.currentChannel
                }
            })
            .then(data => this.setState({ channelData: data.data.singleChannel }))

            client
                .subscribe({
                    query: MESSAGE_ADDED_SUBSCRIPTION,
                    variables: { channelId: this.props.currentChannel }
                })
                .subscribe({
                    next: (push) => {
                        console.log(this.state, push)
                        let channelData = this.state.channelData;

                        channelData.comments = [ ...this.state.channelData.comments, push.data.newComment ];

                        this.setState({
                            channelData : channelData
                        })
                    }
                })
        }
    }

    addMessageToChannel = () => {
        client.mutate({
            mutation: ADD_MESSAGE_MUTATION,
            variables: {
                channel: this.props.currentChannel,
                author: this.props.user._id,
                content: this.state.chat,
            }
        }).then( (data) => {
            this.setState({
                chat: ""
            })
        })
    }

    updateMessage = (e) => {
        console.log(e.target.value)
        this.setState({
            chat: e.target.value
        })
    }

    maybeRenderChannel = () => {
        console.log(this.props)
        if( this.props.currentChannel ){
            return [
                <ChannelMessages channel={ this.state.channelData } activeUid={ this.props.user._id } updateUser={ this.props.updateUser }/>, 
                <ChatField value={ this.state.chat } addMessage={ this.addMessageToChannel } updateMessage={ this.updateMessage }/>
            ]
        }
    }

    render(){
        return ( 
            <div className='message-container'>
                { this.maybeRenderChannel() }
            </div>
        ) 
    }   
}