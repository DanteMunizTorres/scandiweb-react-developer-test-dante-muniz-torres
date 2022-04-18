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
                    {/* console.log('products CART RETURN **********', products) */
                    return products.map((product, i) => <CartArticle key={product.id + i} product={product} id={i} productsList={this.props.productsList} manageQuantity={this.props.manageQuantity} />)
                }
            }
          </CartContext.Consumer>
        
      </form>
    );

  }
}

export default Cart;