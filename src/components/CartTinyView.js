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
import { Link } from 'react-router-dom'

import Cart from './Cart'

import './CartTinyView.css'

class CartTinyView extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.disapear = this.disapear.bind(this)
    this.miniCartDesapear = this.miniCartDesapear.bind(this)
    
  }

  componentDidMount () {
    let cartForm = document.querySelector('.cart')
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }

  disapear(e) {
    let modal = document.querySelector('.modal')
    if(e.target === modal) {
      modal.style.display = 'none'
    }
  }
  miniCartDesapear(e) {
    let modal = document.querySelector('.modal')
    modal.style.display = 'none'
    }

  render () {

    console.log('productList en Cart-------------', this.props.productsList)

    return (
      <div className='modal' onClick={this.disapear}>
        <div className='miniCart'>

        <Cart productsList={this.props.productsList} />
{/*       <form className='miniCart' id='miniCart'>
        <h2>My bag
        <CartContext.Consumer>
              {(productsInCart) => {
                if (productsInCart.length > 0) {
                  return <span>, {productsInCart.length} items</span>
                }
                }
              }
            </CartContext.Consumer>
        </h2>
        <CartContext.Consumer>
            {(products) =>
                    {console.log('products CART RETURN **********', products)
                    return products.map((product, i) => <CartArticle key={product.id + i} product={product} id={i} productsList={this.props.productsList} />)
                }
            }
          </CartContext.Consumer>
      </form> */}
      

        <button onClick={this.miniCartDesapear}><Link to='/cart'>view bag</Link></button>
        <button onClick={this.miniCartDesapear}>check out</button>
        </div>
      </div>
    );

  }
}

export default CartTinyView;