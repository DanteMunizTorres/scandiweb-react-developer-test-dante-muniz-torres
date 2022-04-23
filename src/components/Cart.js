import React, { Component } from "react";
import CartContext from "./ContextCart";
import CurrencyContext from "./ContextCurrency";

import CartArticle from "./CartArticle";

import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form className="cart">
        <h2 className="cart__title">Cart</h2>
        <CartContext.Consumer>
          {(products) => (
            <CurrencyContext.Consumer>
              {(currency) => {
                return products.map((product, i) => (
                  <CartArticle
                    key={product.id + i}
                    product={product}
                    id={i}
                    productsList={this.props.productsList}
                    manageQuantity={this.props.manageQuantity}
                    currency={currency}
                  />
                ));
              }}
            </CurrencyContext.Consumer>
          )}
        </CartContext.Consumer>
      </form>
    );
  }
}

export default Cart;
