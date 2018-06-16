import React, {Component} from 'react';
import './ChannelContainer.css';

import { gql, client } from '../graphql';
import { 
    INTIIAL_CHANNEL_QUERY,
    CHANNEL_INSERT_MUTATION,
    CHANNEL_SUBSCRIPTION
} from '../graphql/queries';

import ChannelList from './components/ChannelList';
import AddChannel from './components/Add';

export default class ChannelContainer extends Component{
    state = {
        channels: [],
        name: '',
        type: '',
        showChannelAdd: false
    }

    componentDidMount(){
        // Set up the subscription on the channelList for
        // new channel additions
        client
            .subscribe({
                query : CHANNEL_SUBSCRIPTION
            })
            .subscribe({
                next: (push) => {
                    this.setState({
                        channels: [...this.state.channels, push.data.newChannel],
                        showChannelAdd: false
                    })
                }
            })

        // Fetch the initial channels
        client
            .query({
                query: INTIIAL_CHANNEL_QUERY
            })
            .then( response => {
                this.setState({
                    channels: response.data.allChannels
                })
            })
    }
 
    handleUpdate = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name] : value
        })
    }
    swapChannelAdd = (e) => {
        this.setState({
            showChannelAdd: ! this.state.showChannelAdd
        })
    } 

    handleSubmit = (e) => {
        e.preventDefault();

        const { name, type } = this.state;

        client.mutate({
            mutation: CHANNEL_INSERT_MUTATION,
            variables: { name, type }
        })
        .then( data => {
            console.log(data)
        })
    }

    render(){
        return (
            <div className='channel-container'>
                <br/>
                <AddChannel   
                    swapForm={ this.swapChannelAdd }
                    handleUpdate={ this.handleUpdate }
                    handleSubmit={ this.handleSubmit }
                    name={ this.state.name }
                    type={ this.state.type }  
                    showChannelAdd={ this.state.showChannelAdd }
                    
                />
                <ChannelList 
                    channels={ this.state.channels } 
                    selectChannel={ this.props.selectChannel }
                />
            </div>
        )
    }
}