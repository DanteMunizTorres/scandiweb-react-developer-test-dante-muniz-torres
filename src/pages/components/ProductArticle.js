import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { CartContext } from "../../contexts/ContextCart";

import cartSVGWhite from "../../icons/cart-white.svg";

import "./ProductArticle.css";

class ProductArticle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(bringInfoFunc) {
    const {product: {id, prices}/* , bringInfo */} = this.props
    const sendToCart = {
      id: id,
      quantity: 1,
      info: [],
      prices: prices,
    };
    //lifting info to App.js
    bringInfoFunc(sendToCart);
  }

  render() {
    const { currency, product: { attributes, inStock, id, name, brand, prices, gallery } } = this.props

    const outOfStock = {
      outOfStock: '',
      linkUrl: `/detail/${id}`,
      display: '',
    }
    if (!inStock) {
      outOfStock.outOfStock = "out-of-stock";
      outOfStock.display = "display-flex";
    }

    let addToCartButton;
    if (attributes.length === 0 && inStock === true) {
      addToCartButton = (
        <CartContext.Consumer>
          {({bringInfo})=> {
            return (
              <button
                className="product-article__add-to-cart-button"
                onClick={()=>this.addToCart(bringInfo)}
              >
                <img src={cartSVGWhite}></img>
              </button>
            )
          }}
        </CartContext.Consumer>
      );
    } else {
      addToCartButton = (
        <button
          className="product-article__add-to-cart-button"
        >
          <Link to={outOfStock.linkUrl}>
            <img src={cartSVGWhite}></img>
          </Link>
        </button>
      );
    }



    return (
      <>
        <article className={`product-article ${outOfStock.outOfStock}`}>
          <div className="product-article__img-wrapper">
            <Link to={outOfStock.linkUrl}>
            <div className={`sign__out-of-stock ${outOfStock.display}`}>
              <p className="sign__out-of-stock--p">out of stock</p>
            </div>
              <img
                src={gallery[0]}
                alt="product image"
                className="product-article__img"
              ></img>
            </Link>
            {addToCartButton}
          </div>
          <Link to={outOfStock.linkUrl}>
            <h4>{brand} {name}</h4>
            <h3>
              {prices[currency].currency.symbol}
              {prices[currency].amount.toFixed(2)}
            </h3>
          </Link>
        </article>
      </>
    );
  }
}

ProductArticle.propTypes = {
  product: PropTypes.object,
  currency: PropTypes.number,
  bringInfo: PropTypes.func,
};

export default ProductArticle;
