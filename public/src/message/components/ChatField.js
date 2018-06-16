import React, {Component} from 'react';
import './ChatField.css';

export default class ChatField extends Component{
    render(){
        return (
            <div className='chat-input-container row'>
                <input type='text' placeholder='Send a message' className='col s8' onChange={ this.props.updateMessage } value={ this.props.value }/>
                <button className='btn col s4' onClick={ this.props.addMessage }>Send</button>
            </div>
        )
    }
}