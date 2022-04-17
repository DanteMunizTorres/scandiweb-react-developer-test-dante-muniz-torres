import { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";

import CartContext from "./ContextCart";
import cartSVG from "../icons/cart.svg";

import './ProductArticle.css'

class ProductArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    let sendToCart = {
      id: this.props.product.id,
      info: [],
    };
    //lifting info to App.js
    this.props.bringInfo(sendToCart);
  }

  render() {
    let addToCartButton
    if(this.props.product.attributes.length === 0) {
      addToCartButton =
      <button onClick={this.addToCart}>
      <img src={cartSVG}></img>
    </button>
    }

    return (
      <>
        <article className="product-article">
          <Link to={`/detail/${this.props.product.id}`}>
            <div>
              
                <img
                  src={this.props.product.gallery[0]}
                  alt="product image"
                  className='product-article__img'
                ></img>
              
            </div>
          </Link>
                    {addToCartButton}
          <Link to={`/detail/${this.props.product.id}`}>
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
