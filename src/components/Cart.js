import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import CartContext from './ContextCart';

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
        <CartContext.Consumer>
            {(products) =>
                 
                    products.map((product, i) => <CartArticle key={product.id + i} product={product} />)
                
            }
          </CartContext.Consumer>
        
      </section>
    );

  }
}

export default Cart;