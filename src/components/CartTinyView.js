import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import CartContext from "./ContextCart";
import CurrencyContext from "./ContextCurrency";

import CartArticle from "./CartArticle";
import "./CartTinyView.css";

class CartTinyView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.disapear = this.disapear.bind(this);
    this.miniCartDesapear = this.miniCartDesapear.bind(this);
    this.checkOutCart = this.checkOutCart.bind(this);
  }

  disapear(e) {
    const modal = document.querySelector(".modal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }
  miniCartDesapear(e) {
    e.preventDefault();
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  }

  checkOutCart(e) {
    e.preventDefault();
    const modal = document.querySelector(".modal");
    modal.style.display = "none";

    this.props.resetCartInfo();

    const checkOutMessage = "Thank you, come again!";
    this.props.showModal(e, checkOutMessage);
  }

  render() {
    return (
      <div className="modal" onClick={this.disapear}>
        <CartContext.Consumer>
          {(products) => {
            return (
              <form className="miniCart" id="miniCart">
                <CurrencyContext.Consumer>
                  {(currency) => {
                    const total = products
                      .map(product => product.prices[currency].amount * product.quantity)
                      .reduce((a, b) => a + b, 0);
                    return (
                      <>
                        <h2 className="mini-cart__title">
                          My bag {products.length > 1 ? <span>, {products.length} items</span>: products.length === 1 ?  <span>, {products.length} item</span> : "" }
                        </h2>

                        {products.map((product, i) => (
                          <CartArticle
                            key={product.id + i}
                            product={product}
                            id={i}
                            productsList={this.props.productsList}
                            manageQuantity={this.props.manageQuantity}
                            currency={parseInt(currency)}
                          />
                        ))}

                        <div className="mini-cart__total-container">
                          <p className="mini-cart__total-text">Total</p>
                          <p className="mini-cart__total-number">
                            {products.length > 0 ? `${products[0].prices[currency].currency.symbol} ${total.toFixed(2)}` : 0}
                          </p>
                        </div>

                        <div className="mini-cart__buttons-container">
                          <button
                            className="mini-cart__button viewbag"
                            onClick={this.miniCartDesapear}
                          >
                            <Link to="/cart">view bag</Link>
                          </button>
                          <button
                            type="reset"
                            className="mini-cart__button checkout"
                            onClick={this.checkOutCart}
                          >
                            check out
                          </button>
                        </div>
                      </>
                    );
                  }}
                </CurrencyContext.Consumer>
              </form>
            );
          }}
        </CartContext.Consumer>
      </div>
    );
  }
}

CartTinyView.propTypes = {
  productsList: PropTypes.array,
  manageQuantity: PropTypes.func,
  showModal: PropTypes.func,
  resetCartInfo: PropTypes.func,
};

export default CartTinyView;
