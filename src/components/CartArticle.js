import React, { Component } from 'react'

import ProductDetailAttributesBox from './ProductDetailAttributesBox';

class CartArticle extends Component {
  constructor(props) {
    super(props);
    this.state={
      productInCart: undefined,
      /* quantity: {number: this.props.product.quantity} */
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
    let newQuantity = {
      number: this.props.product.quantity + 1,
      id: this.props.product.id,
      index: this.props.id
      }
    /* this.setState({quantity: newQuantity}) */
    return this.props.manageQuantity(newQuantity)
  }
  substractQuantity (e) {
    e.preventDefault()
    if(this.props.product.quantity > 1) {
      let newQuantity = {
        number: this.props.product.quantity - 1,
        id: this.props.product.id,
        index: this.props.id
        }
      /* this.setState({quantity: newQuantity}) */
      return this.props.manageQuantity(newQuantity)
    }
  }

  render() {

    console.log('this.props.product.quantity------------------:::::::::::', this.props.product.quantity);
    console.log('this.props.product-----<<<<<<<<<<>>>>', this.props.product);

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
              <input type='number' value={this.props.product.quantity} readOnly />
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