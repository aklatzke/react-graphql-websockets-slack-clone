import React, {Component} from 'react';
import './ChannelList.css';

export default class ChannelList extends Component{
    render(){
        return (
            <ul className='collection with-header'>
                <li className='collection-header'><h6>Channels</h6></li>
                { this.props.channels.map( channel => <li onClick={ () => this.props.selectChannel(channel._id) } className='collection-item'>{channel.name}</li> ) }
            </ul>
        )
    }
}