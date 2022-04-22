import { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";

import CartContext from "./ContextCart";
import cartSVG from "../icons/cart.svg";
import cartSVGWhite from "../icons/cart-white.svg"

import './ProductArticle.css'

class ProductArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* inStock: true */
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    let sendToCart = {
      id: this.props.product.id,
      quantity: 1,
      info: [],
      prices: this.props.product.prices
    };
    //lifting info to App.js
    this.props.bringInfo(sendToCart);
  }

/*   componentDidMount() {
    this.setState({inStock: this.props.product.inStock})
    console.log('ins tock--------------------------', this.state.inStock)
    if (this.state.inStock === false) {
      console.log('ins tock IN IFFFFFFFFFFFFFFFF--------------------------', this.state.inStock)
      document.querySelector('.sign__out-of-stock').style.display = 'flex'
    }

  }
  componentDidUpdate(__prevProps, prevState) {

  } */

  render() {
    let addToCartButton
    if(this.props.product.attributes.length === 0 && this.props.product.inStock === true) {
      addToCartButton =
      <button className="product-article__add-to-cart-button" onClick={this.addToCart}>
      <img src={cartSVGWhite}></img>
    </button>
    }

    let outOfStock
    let linkUrl
    let display
    if(!this.props.product.inStock) {
      outOfStock = 'out-of-stock'
      linkUrl = '/'
      display = 'display-flex'
    } else {
      outOfStock = ''
      linkUrl = `/detail/${this.props.product.id}`
      display = ''
    }

    return (
      <>
        <article className={`product-article ${outOfStock}`} >
          <div className="product-article__img-wrapper">
            <div className={`sign__out-of-stock ${display}`}><p className="sign__out-of-stock--p">out of stock</p></div>
            <Link to={linkUrl}>
              
                <img
                  src={this.props.product.gallery[0]}
                  alt="product image"
                  className='product-article__img'
                ></img>
              
            </Link>
                    {addToCartButton}
          </div>
          

          <Link to={linkUrl}>
            <h4>{this.props.product.name}</h4>
            <h3>
              {this.props.product.prices[this.props.currency].currency.symbol}
              {this.props.product.prices[this.props.currency].amount}
            </h3>
          </Link>
          
        </article>
      </>
    );
  }
}

export default ProductArticle;

/* function ProductArticle (props) {

  return (
    <Link to={`/detail/${props.product.id}`}>
    
    <article>
      {<img src={props.product.gallery[0]} alt=''></img>}
      <h4>{props.product.name}</h4>
      <h3>{props.product.prices[props.currency].currency.symbol}{props.product.prices[props.currency].amount}</h3>
    </article>    
    </Link>
  )
}

export default ProductArticle */
