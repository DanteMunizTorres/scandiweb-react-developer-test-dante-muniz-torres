import { Component } from 'react'

import ProductDetailAttributesBox from './ProductDetailAttributesBox';

import './CartArticle.css'

class CartArticle extends Component {
  constructor(props) {
    super(props);
    this.state={
      productInCart: undefined,
      
    }
    this.addQuantity = this.addQuantity.bind(this)
    this.substractQuantity = this.substractQuantity.bind(this)
  }

  componentDidMount() {  
    if(this.props.productsList){
      let productInCart = this.props.productsList.find(product => product.id === this.props.product.id)
      this.setState({productInCart: productInCart})
    }
  }

  addQuantity (e) {
    e.preventDefault()
    let newQuantity = {
      number: this.props.product.quantity + 1,
      id: this.props.product.id,
      index: this.props.id
      }
    /* lifting quantity to App.js */
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
      /* lifting quantity to App.js */
      return this.props.manageQuantity(newQuantity)
    }
  }

  render() {

    let cartArticle
    if (this.state.productInCart) {
      cartArticle = 
        <article className='cart-article'>
          <div className='cart-article__info'>
            <div>
              <h3 className='cart-article__info-brand'>{this.state.productInCart.brand}</h3>
              <h3 className='cart-article__info-name'>{this.state.productInCart.name}</h3>
            </div>
            <h4 className='cart-article__info-price'>
              {this.state.productInCart.prices[this.props.currency].currency.symbol}
              {this.state.productInCart.prices[this.props.currency].amount}
            </h4>

            <div>
              <ProductDetailAttributesBox attributes={this.state.productInCart.attributes} attributesChosen={this.props.product.info} isInCart={true} id={this.props.id} />
            </div>
          </div>
    
          <div className='cart-article__quantity'>
            <div className='cart-article__quantity-buttons-container'>
              <button className='cart-article__quantity--button' onClick={this.addQuantity}><span className='add'>+</span></button>
              <input className='cart-article__quantity--number' type='number' value={this.props.product.quantity} readOnly />
              <button className='cart-article__quantity--button substract' onClick={this.substractQuantity}><span className='vector'></span></button>
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