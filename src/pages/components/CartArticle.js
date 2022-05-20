import  React, { Component } from "react";
import PropTypes from 'prop-types';

import ProductDetailAttributesBox from "./ProductDetailAttributesBox";
import CartArticleImgSwitcher from "./CartArticleImgSwitcher";

import "./CartArticle.css";

class CartArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productInCart: undefined,
    };
    this.addQuantity = this.addQuantity.bind(this);
    this.substractQuantity = this.substractQuantity.bind(this);
  }

  componentDidMount() {
    const { productsList, product: productIn } = this.props
    if (productsList) {
      const productInCart = productsList.find(
        (product) => product.id === productIn.id
      );
      this.setState({ productInCart: productInCart });
    }
  }


  addQuantity(e) {
    e.preventDefault();
    const { id: idInCart, manageQuantity, product: {id, quantity} } = this.props
    const newQuantity = {
      number: quantity + 1,
      id: id,
      index: idInCart,
    };
    /* lifting quantity to App.js */
    return manageQuantity(newQuantity);
  }
  substractQuantity(e) {
    e.preventDefault();
    const { id: idInCart, manageQuantity, product: {id, quantity} } = this.props
      const newQuantity = {
        number: quantity - 1,
        id: id,
        index: idInCart,
      };
      /* lifting quantity to App.js */
      return manageQuantity(newQuantity);
  }

  render() {
    const { product, id, currency, isInCartPage } = this.props
    let cartArticle;
    const { productInCart } = this.state
    if (productInCart) {
      const { brand, name, prices, attributes, gallery} = productInCart
      cartArticle = (
        <article className="cart-article">
          <div className="cart-article__info">
            <div>
              <h3 className="cart-article__info-brand">
                {brand}
              </h3>
              <h3 className="cart-article__info-name">
                {name}
              </h3>
            </div>
            <h4 className="cart-article__info-price">
              {prices[currency].currency.symbol}
              {prices[currency].amount.toFixed(2)}
            </h4>

            <div>
              <ProductDetailAttributesBox
                attributes={attributes}
                attributesChosen={product.info}
                isInCart={true}
                id={id}
              />
            </div>
          </div>

          <div className="cart-article__quantity">
            <div className="cart-article__quantity-buttons-container">
              <button
                className="cart-article__quantity--button"
                onClick={this.addQuantity}
              >
                <span className="add">+</span>
              </button>
              <input
                className="cart-article__quantity--number"
                type="number"
                value={product.quantity}
                readOnly
              />
              <button
                className="cart-article__quantity--button substract"
                onClick={this.substractQuantity}
              >
                <span className="vector"></span>
              </button>
            </div>
            <CartArticleImgSwitcher gallery={gallery} articleIsInCart={isInCartPage} />
          </div>
        </article>
      );
    } else {
      cartArticle = (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    return <>{cartArticle}</>;
  }
}

CartArticle.propTypes = {
  productsList: PropTypes.array,
  manageQuantity: PropTypes.func,
  product: PropTypes.object,
  currency: PropTypes.number,
  id: PropTypes.number,
  isInCartPage: PropTypes.bool
};


export default CartArticle;
