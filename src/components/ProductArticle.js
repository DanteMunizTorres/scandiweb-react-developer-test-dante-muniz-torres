import { PureComponent } from "react";
import { Link } from "react-router-dom";

import cartSVGWhite from "../icons/cart-white.svg";

import "./ProductArticle.css";

class ProductArticle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    let sendToCart = {
      id: this.props.product.id,
      quantity: 1,
      info: [],
      prices: this.props.product.prices,
    };
    //lifting info to App.js
    this.props.bringInfo(sendToCart);
  }

  render() {
    let addToCartButton;
    if (
      this.props.product.attributes.length === 0 &&
      this.props.product.inStock === true
    ) {
      addToCartButton = (
        <button
          className="product-article__add-to-cart-button"
          onClick={this.addToCart}
        >
          <img src={cartSVGWhite}></img>
        </button>
      );
    }

    let outOfStock;
    let linkUrl;
    let display;
    if (!this.props.product.inStock) {
      outOfStock = "out-of-stock";
      linkUrl = `/detail/${this.props.product.id}`;
      display = "display-flex";
    } else {
      outOfStock = "";
      linkUrl = `/detail/${this.props.product.id}`;
      display = "";
    }

    return (
      <>
        <article className={`product-article ${outOfStock}`}>
          <div className="product-article__img-wrapper">
            <Link to={linkUrl}>
            <div className={`sign__out-of-stock ${display}`}>
              <p className="sign__out-of-stock--p">out of stock</p>
            </div>
              <img
                src={this.props.product.gallery[0]}
                alt="product image"
                className="product-article__img"
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
