import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';

import CartArticle from './CartArticle'

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
    //llamado a api 
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }


  render () {


    return (
      <section>
        <h2>Cart</h2>
        <CartArticle />
      </section>
    );

  }
}

export default Cart;