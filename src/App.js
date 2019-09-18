import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {

  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
          <div>
            <Layout>
              <Route exact path="/" component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
            </Layout>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
