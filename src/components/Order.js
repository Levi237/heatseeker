import React, { Component } from 'react';


export default class Order extends Component {
    render(){
        const { showOrder } = this.props
        return(
            <div className="order-form">
                Time for eCommerce
                <button onClick={showOrder}>Go Back</button>
            </div>
            
        )
    }
}