import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import CartContext from "../contexts/ContextCart";
import CurrencyContext from "../contexts/ContextCurrency";
import { CartOverlayContext } from "../contexts/CartOverlayContext";

import { productsCounter, productsTotalPrice } from "../utils/utils";

import {OpenModalBtn} from './components/OpenModalBtn'
import CartArticle from "./components/CartArticle";
import "./CartTinyView.css";

class CartTinyView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    /* this.disapear = this.disapear.bind(this); */
    /* this.miniCartDesapear = this.miniCartDesapear.bind(this); */
    /* this.checkOutCart = this.checkOutCart.bind(this); */
  }

  disapear(e, func) {
    const modal = document.querySelector(".modal");
    if (e.target === modal) {
      func()
    }
  }
/*   miniCartDesapear(e) {
    e.preventDefault();
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  } */

/*   checkOutCart(e) {
    e.preventDefault();
    const {resetCartInfo, showModal} = this.props

    const modal = document.querySelector(".modal");
    modal.style.display = "none";

    resetCartInfo();

    const checkOutMessage = "Thank you, come again!";
    showModal(e, checkOutMessage);
  } */

  render() {
    const { manageQuantity } = this.props

    return (
      <CartOverlayContext.Consumer>
        {({cartOverlayToggler, cartOverlayVisible})=> {
          console.log('cartOverlayVisible----------------', cartOverlayVisible);
          return (
            cartOverlayVisible === true && (
               <div className="modal" onClick={(e)=>this.disapear(e, cartOverlayToggler)}>
                <CartContext.Consumer>
                  {(products) => {
                    const productsAmount = productsCounter(products)
                    return (
                      <form className="miniCart" id="miniCart">
                        <CurrencyContext.Consumer>
                          {(currency) => {
                            const total = productsTotalPrice(products, currency)
                            return (
                              <>
                                <h2 className="mini-cart__title">
                                  
                                  My bag {productsAmount > 0 ? <span>, {productsAmount} items</span>: productsAmount === 1 ?  <span>, {productsAmount} item</span> : "" }
                                </h2>
  
                                {products.map((product, i) => (
                                  <CartArticle
                                    key={product.id + i}
                                    product={product}
                                    id={i}
                                    manageQuantity={manageQuantity}
                                    currency={parseInt(currency)}
                                    isInCartPage={false}
                                  />
                                ))}
  
                                <div className="mini-cart__total-container">
                                  <p className="mini-cart__total-text">Total</p>
                                  <p className="mini-cart__total-number">
                                    {productsAmount > 0 ? `${products[0].prices[currency].currency.symbol} ${total}` : 0}
                                  </p>
                                </div>
  
                                <div className="mini-cart__buttons-container">
                                  <button
                                    className="mini-cart__button viewbag"
                                    onClick={cartOverlayToggler}
                                  >
                                    <Link to="/cart">view bag</Link>
                                  </button>
  
                                  <OpenModalBtn 
                                    className="mini-cart__button checkout"
                                    message="Thank you, come again!"
                                    buttonText='check out'
                                    otherFunction1={this.props.resetCartInfo}
                                    otherFunction2={cartOverlayToggler}
                                  />
        {/*                           <button
                                    type="reset"
                                    className="mini-cart__button checkout"
                                    onClick={this.checkOutCart}
                                  >
                                    check out
                                  </button> */}
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
  
            )
          )
        }
          
          
        }
      </CartOverlayContext.Consumer>
      
    );
  }
}

CartTinyView.propTypes = {
  manageQuantity: PropTypes.func,
  showModal: PropTypes.func,
  resetCartInfo: PropTypes.func,
};

export default CartTinyView;
