import React, { Component } from 'react';
//import { Route, Link } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
//import CheckoutSummary from '../../Order/CheckoutSummary/CheckoutSummary';


class OrderSummary extends Component {
    // This could be a functional component.

    // componentDidUpdate() {
    //   console.log('[OrderSummary] DidUpdate');
    // }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li> );
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>The total comes to: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
