/* import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';

import CartArticle from './CartArticle'

class CartTinyView extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
    
  }

  componentDidUpdate () {
    
  }


  render () {


    return (
      <section>
        <h2>My bag<span>, x items</span></h2>
        <CartArticle />
        <div>
          <h3>total</h3>
          <h3>xxxx</h3>
        </div>
        <div>
          <button>view bag</button>
          <button>check out</button>
        </div>
      </section>
    );

  }
}

export default CartTinyView; */


import React, { Component } from 'react'
import CartContext from './ContextCart';

import CartArticle from './CartArticle'

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productsList: this.props.productsList
    }
  }

  componentDidMount () {
    let cartForm = document.querySelector('.cart')
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }



  render () {

    console.log('productList en Cart-------------', this.state.productsList)

    return (
      <div className='modal'>
      <form className='cart'>
        <h2>My bag<span>, x items</span></h2>
        <CartContext.Consumer>
            {(products) =>
                    {console.log('products CART RETURN **********', products)
                    return products.map((product, i) => <CartArticle key={product.id + i} product={product} id={i} productsList={this.state.productsList} />)
                }
            }
          </CartContext.Consumer>
        
      </form>

      </div>
    );

  }
}

export default Cart;