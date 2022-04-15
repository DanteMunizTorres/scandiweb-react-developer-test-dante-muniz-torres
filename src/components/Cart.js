import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import CartContext from './ContextCart';

import CartArticle from './CartArticle'

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount () {
    let cartForm = document.querySelector('.cart')
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }



  render () {


    return (
      <form className='cart'>
        <h2>Cart</h2>
        <CartContext.Consumer>
            {(products) =>
                    {console.log('products CART RETURN **********', products)
                    return products.map((product, i) => <CartArticle key={product.id + i} product={product} id={i} productsList={this.props.productsList} />)
                }
            }
          </CartContext.Consumer>
        
      </form>
    );

  }
}

export default Cart;