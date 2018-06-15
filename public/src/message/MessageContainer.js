import React, {Component} from 'react'
import './MessageContainer.css';
import ChatField from './components/ChatField';


export default class MessageContainer extends Component{
    render(){
        return ( 
            <div className='message-container'>
                <ChatField />
            </div>
        ) 
    }   
}