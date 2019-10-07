import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
          street: '',
          postalCode: ''
        },
        loading: false
    }

    // The event in orderHandler and prevent default stops the page reloading
    orderHandler = (event) => {
      event.preventDefault();
      // console.log(this.props.ingredients);
      this.setState({ loading: true });
      const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          customer: {
              name: 'Salmon Knowledge',
              address: {
                  street: 'River Street',
                  zipCode: 'UP5TR34M',
                  country: 'Ireland'
              },
          email: 'salmon@river.com'
        },
        deliveryMethod: '1 Day Shipping'
      }
      axios.post('/orders.json', order)
          .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState({loading: false});
          });
    }

    render () {
      let form = (
        <form>
            <Input type="text" name="name" placeholder="Your name" />
            <Input type="text" name="email" placeholder="Your email" />
            <Input type="text" name="street" placeholder="Street" />
            <Input type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</ Button>
        </form>
      );
      if (this.state.loading) {
        form = <Spinner />;
      }

      return (
          <div className={classes.ContactData}>
              <h4>Enter your Contact Data</h4>
              {form}
          </div>
      );
    }
}

export default ContactData;
