import React, { Component } from 'react'

import ProductDetailAttributesBox from './ProductDetailAttributesBox';

import './CartArticle.css'

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

    /* console.log('this.props.product.quantity------------------:::::::::::', this.props.product.quantity);
    console.log('this.props.product-----<<<<<<<<<<>>>>', this.props.product); */

    /* console.log('productsList en carrt ARTICLE',this.props.productsList)
    console.log('productsList en carrt ARTICLE RENDERRRRR', this.state.productInCart) */

    let cartArticle
    if (this.state.productInCart) {
      cartArticle = 
        <article className='cart-article'>
          <div className='cart-article__info'>
            <h3>{this.state.productInCart.brand}</h3>
            <h4>{this.state.productInCart.name}</h4>

            <div>
              <ProductDetailAttributesBox attributes={this.state.productInCart.attributes} attributesChosen={this.props.product.info} isInCart={true} id={this.props.id} />
            </div>
          </div>
    
          <div className='cart-article__quantity'>
            <div className='cart-article__quantity-buttons-container'>
              <button className='cart-article__quantity--button' onClick={this.addQuantity}>+</button>
              <input className='cart-article__quantity--number' type='number' value={this.props.product.quantity} readOnly />
              <button className='cart-article__quantity--button' onClick={this.substractQuantity}>-</button>
            </div>
            <div className='cart-article__img-wrapper'>
              <img className='cart-article__img' src={this.state.productInCart.gallery[0]} alt="product-image"></img>
            </div>
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