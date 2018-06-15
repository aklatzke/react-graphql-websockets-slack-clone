import React, { Component } from 'react';

export default class Add extends Component {
    render(){
        if( this.props.showChannelAdd ){
            return (
                <div className='row'>
                    <form onSubmit={ this.props.handleSubmit } className='col offset-s1 s10'>
                        <div className='row'>
                            <input name='name' placeholder="Channel Name" value={ this.props.name } onChange={ this.props.handleUpdate } />
                            <select name='type' className='browser-default' value={ this.props.type } onChange={ this.props.handleUpdate }>
                                <option>Select Privacy Type</option>
                                <option value='PRIVATE'>Private</option>
                                <option value='PUBLIC'>Public</option>
                            </select>
                        </div>
                        <div className='row'>
                            <button className='btn'>Submit</button>
                        </div>
                    </form>                
                </div>
  
            )
        }
        else{     
            return <button className="btn" onClick={ this.props.swapForm }>Add New Channel</button>
        }
    }
}