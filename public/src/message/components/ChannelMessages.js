import React, { Component } from 'react';
import './ChannelMessages.css';
 
export default class ChannelMessages extends Component{ 
    maybeRenderMessages(){
        if( this.props.channel.comments ){
            return this.props.channel.comments.map( 
                item =>  (
                    <li className={ this.props.activeUid === item.author._id ? "collection-item align-left" : "collection-item align-right" }> 
                        <div className='author'>{ item.author.displayName }</div>
                        <div className='content'>{ item.content }</div>
                    </li> 
                )
            )
        }
    }

    render(){
        return (
            <div style={{ height:"100%" }}>
                <h5 className='channel-title'>{ this.props.channel.name }</h5>
                <ul className='collection channel-messages'>
                    { this.maybeRenderMessages() }
                </ul>
            </div>
            
        )
    }
}