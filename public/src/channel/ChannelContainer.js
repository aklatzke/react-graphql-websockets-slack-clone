import React, {Component} from 'react';
import './ChannelContainer.css';

import { gql, client } from '../graphql';

import ChannelList from './components/ChannelList';
import AddChannel from './components/Add';

const CHANNEL_INSERT_MUTATION = gql`
    mutation addChannel( $name: String!, $type: String! ){
        addChannel( name: $name, type: $type ){
            name,
            type,
            _id
        }
    }
`;

const CHANNEL_SUBSCRIPTION = gql`
    subscription newChannel{
        newChannel{
            name,
            type,
            _id
        }
    }
`;

const INTIIAL_CHANNEL_QUERY = gql`
    query allChannels{
        allChannels{
            name,
            type,
            _id
        }
    }
`;

export default class ChannelContainer extends Component{
    state = {
        channels: [],
        name: '',
        type: '',
        showChannelAdd: false
    }

    componentDidMount(){
        console.log(this.props)
        // Set up the subscription on the channelList for
        // new channel additions
        client
            .subscribe({
                query : CHANNEL_SUBSCRIPTION
            })
            .subscribe({
                next: (push) => {
                    console.log(push.data, push)
                    this.setState({
                        channels: [...this.state.channels, push.data.newChannel]
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