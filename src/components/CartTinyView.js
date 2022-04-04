import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';

import CartArticle from './CartArticle'

class CartTinyView extends Component {

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

export default CartTinyView;