import React, { Component } from 'react'

export default class Model extends Component {

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    render(){
        if (!this.props.show){
            return null;
        }
        
        return(
            <div className="modal">
                <div>
                    {this.props.children}
                <button className="close" onClick={(e) => {this.onClose(e)}}>
                    I would like to keep working on this
                </button>
                </div>
            </div>
        )
    }
}