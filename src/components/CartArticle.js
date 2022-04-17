import React, { Component } from 'react'

import ProductDetailAttributesBox from './ProductDetailAttributesBox';

class CartArticle extends Component {
  constructor(props) {
    super(props);
    this.state={
      productInCart: undefined,
      quantity: 1
    }
    this.addQuantity = this.addQuantity.bind(this)
    this.substractQuantity = this.substractQuantity.bind(this)
  }

  componentDidMount() {
    console.log('this.props.product +++++++++++', this.props.product);
    
    if(this.props.productsList){

      let productInCart = this.props.productsList.find(product => product.id === this.props.product.id)
      this.setState({productInCart: productInCart})
    }


    /* console.log('productsList en carrt ARTICLE COMPONENTDIDMOUNT------------', this.state.productInCart) */
  }

  addQuantity (e) {
    e.preventDefault()
    this.setState({quantity: this.state.quantity + 1})
  }
  substractQuantity (e) {
    e.preventDefault()
    if(this.state.quantity > 1) {
      this.setState({quantity: this.state.quantity - 1})
    }
  }

  render() {

    /* console.log('productsList en carrt ARTICLE',this.props.productsList)
    console.log('productsList en carrt ARTICLE RENDERRRRR', this.state.productInCart) */

    let cartArticle
    if (this.state.productInCart) {
      cartArticle = 
        <article>
          <div>
            <h3>brand</h3>
            <h4>product name {this.props.product.id}</h4>

            <div>
              <ProductDetailAttributesBox attributes={this.state.productInCart.attributes} attributesChosen={this.props.product.info} isInCart={true} id={this.props.id} />
              {/* {console.log('this.state.productInCart.attributes----------', this.state.productInCart)} */}
            </div>

          </div>
    
          <div>
            <div>
              <button onClick={this.addQuantity}>+</button>
              <input type='number' value={this.state.quantity} readOnly />
              <button onClick={this.substractQuantity}>-</button>
            </div>
            <img alt="product-image"></img>
          </div>
        </article>
    } else {
      cartArticle = <div><p>Loading...</p></div>
    }
    
    return (
      <>
        {cartArticle}
      </>
    )
  }
}

export default CartArticle