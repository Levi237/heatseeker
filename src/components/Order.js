import React, { Component } from 'react';


export default class Order extends Component {
    render(){
        const { showOrder } = this.props
        return(
            <div className="order-form">
                <h2>Time for eCommerce</h2>
                <button onClick={showOrder}>Go Back</button>
            </div>
            
        )
    }
}