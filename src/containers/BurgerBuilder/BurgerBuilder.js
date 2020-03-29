import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //       super(props);
    //       this.state = {...}
    // }

    state = {
        // ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
      // Since we don;t yet know how to implement asynchronous requests we are saving State in the reducer for now
      // axios.get('https://burger-builder-de22d.firebaseio.com/ingredients.json')
      //   .then(response => {
      //       this.setState({ingredients: response.data});
      //   })
      //   .catch(error => {
      //         this.setState({error: true});
      //       });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchasable: sum > 0});
            // console.log(sum);
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }
    //
    // removeIngredientHandler = (type) => {
    //   const oldCount = this.state.ingredients[type];
    //   if (oldCount <= 0) {
    //     return;
    //   }
    //   const updatedCount = oldCount - 1;
    //   const updatedIngredients = {
    //       ...this.state.ingredients
    //   };
    //   updatedIngredients[type] = updatedCount;
    //   const priceDeduction = INGREDIENT_PRICES[type];
    //   const oldPrice = this.state.totalPrice;
    //   const newPrice = oldPrice - priceDeduction;
    //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //   this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
      this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
          queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {
          burger = (
              <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                      ingredientsAdded={this.props.onAddIngredient}
                      ingredientsRemoved={this.props.onRemoveIngredient}
                      disabled={disabledInfo}
                      purchasable={this.state.purchasable}
                      ordered={this.purchaseHandler}
                      price={this.state.totalPrice}
                />
              </Aux>
          );
          orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.state.totalPrice}
                cancelPurchase={this.purchaseCancelHandler}
                continuePurchase={this.purchaseContinueHandler} />;
        }

        if (this.state.loading) {
                orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onRemoveIngredient: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
