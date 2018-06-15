import React, {Component} from 'react';
import './ChatField.css';

export default class ChatField extends Component{
    state = {
        chat : ""
    }

    sendChatMessage = () =>{
        this.setState({
            chat : ""
        })
    } 

    updateState = (e) => {
        this.setState({
            chat: e.target.value
        })
    }

    render(){
        return (
            <div className='chat-input-container row'>
                <input type='text' placeholder='Send a message' className='col s8' onChange={ this.updateState } value={ this.state.chat }/>
                <button className='btn col s4' onClick={ () => this.sendChatMessage() }>Send</button>
            </div>
        )
    }
}