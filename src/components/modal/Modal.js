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
                    I am not finished yet
                </button>
                </div>
                <button className="close" onClick={(e) => {this.onClose(e)}}>
                    X
                </button>
            </div>
        )
    }
}