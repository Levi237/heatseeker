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
                    <button className="close xClose" onClick={(e) => {this.onClose(e)}}>
                        X
                    </button>

                    {this.props.children}
                    
                    <button className="close" onClick={(e) => {this.onClose(e)}}>
                        Go Back
                    </button>
                </div>

            </div>
        )
    }
}