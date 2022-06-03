import React, { PureComponent } from "react";
import {CartContext} from "../contexts/ContextCart";
import CurrencyContext from "../contexts/ContextCurrency";
import CartArticle from "./components/CartArticle";
import { OpenModalBtn } from "./components/OpenModalBtn";
import { productsCounter, productsTotalPrice, taxesCalculator } from "../utils/utils";


import "./Cart.css";

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <form className="cart">
        <h2 className="cart__title">Cart</h2>
        <CartContext.Consumer>
          {({productsInCart: products, manageQuantity, resetCartInfo}) => {
            const productsAmount = productsCounter(products)
            return (
              <CurrencyContext.Consumer>
                {(currency) => {
                    const total = productsTotalPrice(products, currency)
                    const taxes = taxesCalculator(total, 21)
                  return (
                    <>
                    {products.map((product, i) => (
                      <CartArticle
                        key={product.id + i}
                        product={product}
                        id={i}
                        manageQuantity={manageQuantity}
                        currency={parseInt(currency)}
                        isInCartPage={true}
                      />
                    ))}
                    <article className="order-box cart-article" >
                      <div className="order-box__titles-container">
                        <h3 className="order-box__title">Tax 21%:</h3>
                        <h3 className="order-box__title">Quantity:</h3>
                        <h3 className="order-box__title order-box__total">Total:</h3>
                      </div>
                      <div className="order-box__values-container">
                        <h3 className="order-box__value">{taxes}</h3>
                        <h3 className="order-box__value">{productsAmount>0? productsAmount : 0}</h3>
                        <h3 className="order-box__value">{productsAmount > 0 ? `${products[0].prices[currency].currency.symbol} ${total}` : 0}</h3>
                      </div>
                    </article>
                    <div className="orderButton__container">
                      <OpenModalBtn 
                        className="mini-cart__button checkout"
                        message="Thank you, come again!"
                        buttonText='order'
                        otherFunction1={resetCartInfo}
                      />
                    </div>
                    </>
                  )
                }}
              </CurrencyContext.Consumer>
            )
          }}
        </CartContext.Consumer>
      </form>
    );
  }
}

export default Cart;
