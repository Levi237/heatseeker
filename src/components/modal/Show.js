import React, { Component } from 'react';

export default class Show extends Component {
    render(){
        const { show, recipes } =  this.props
        // console.log(this.props.show)
        return(
            <div>Show, {show}</div>
        )
    }
}