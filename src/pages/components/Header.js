import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

import {CartContext} from "../../contexts/ContextCart";
import CurrencyContext from "../../contexts/ContextCurrency";
import { CartOverlayContext } from "../../contexts/CartOverlayContext";

import cartSVG from "../../icons/cart.svg";
import arrowDownSVG from "../../icons/arrowDown.svg";
import arrowUpSVG from "../../icons/arrowUp.svg";
import reloadSVG from "../../icons/reload.svg";

import "./Header.css";

import client from '../../grapgql/client'
import categoriesQuery from "../../grapgql/queryCategories";
import currenciesQuery from "../../grapgql/queryCurrencies";
import { productsCounter } from "../../utils/utils";

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      categories: [],
      currencyBoxVisible: false,
      /* miniCartVisible: false, */
    };
    /* this.miniCartShowUp = this.miniCartShowUp.bind(this); */
    this.currencySwitcherShowUp = this.currencySwitcherShowUp.bind(this);
    this.disappear = this.disappear.bind(this);
  }

  /* miniCartShowUp() {
    return this.setState({ miniCartVisible: !this.state.miniCartVisible });
  } */

  currencySwitcherShowUp() {
    this.setState({ currencyBoxVisible: !this.state.currencyBoxVisible });
  }

  disappear(cartHide, cartVisible) {
    const { currencyBoxVisible} = this.state
    if (cartVisible) {
      cartHide()
    }
    if (currencyBoxVisible) {
      this.setState({ currencyBoxVisible: false });
    }
  }

  componentDidMount() {
    //currencies
    client
      .query(currenciesQuery)
      .then((result) => {
        return this.setState({ currencies: result.data.currencies });
      });
    //categories
    client
      .query(categoriesQuery)
      .then((result) => {
        return this.setState({ categories: result.data.categories });
      });
  }

  componentDidUpdate(__prevProps, prevState) {
    //currencybox
    const { currencyBoxVisible/* , miniCartVisible */ } = this.state
    if (prevState.currencyBoxVisible !== currencyBoxVisible) {
      const currencySwitcher = document.querySelector(".currency-switcher__form");
      if (currencyBoxVisible) {
        currencySwitcher.style.display = "flex";
      } else if (!currencyBoxVisible) {
        currencySwitcher.style.display = "none";
      }
    }
    //minicart
/*     if (prevState.miniCartVisible !== miniCartVisible) {
      const modal = document.querySelector(".modal");
      if (miniCartVisible) {
        modal.style.display = "block";
      } else if (!miniCartVisible) {
        modal.style.display = "none";
      }
    } */
  }

  render() {
    window.addEventListener('click', () => console.log('minicart state',this.state.miniCartVisible))
    const { categories, currencyBoxVisible, currencies } = this.state
    let categoriesOptions;
    if (categories) {
      categoriesOptions = categories.map(({name}, i) => {
        return (
          <li className="category-li" key={name + i}>
            <Link
              className={`${name} category-li__link`}
              name={name}
              to="/"
              onClick={this.props.pickCategory}
            >
              {name.toUpperCase()}
            </Link>
          </li>
        );
      });
    }

    //currency switcher button's arrow
    let arrow;
    if (currencyBoxVisible) {
      arrow = <img src={arrowUpSVG} alt='arrow up icon'></img>;
    } else {
      arrow = <img src={arrowDownSVG} alt='arrow down icon'></img>;
    }

    //currency switcher disappear
    if (currencyBoxVisible === true) {
      const main = document.querySelector(".main");
      main.addEventListener("click", () => {
        this.setState({ currencyBoxVisible: false });
      });
    }
/*     if (miniCartVisible === true) {
      const main = document.querySelector(".main");
      const miniCart = document.getElementById("miniCart");
      main.addEventListener("click", (e) => {
        if (e.target !== miniCart) {

          this.setState({ miniCartVisible: false });
        }
      });
    } */

    return (
      <CartOverlayContext.Consumer>
        {({cartOverlayToggler, cartOverlayHide, cartOverlayVisible})=> {
          return (
            <header className="header" onClick={()=>this.disappear(cartOverlayHide, cartOverlayVisible)}>
              <nav>
                <ul className="header__nav-categories">{categoriesOptions}</ul>
              </nav>

              <div>
                <img alt='just an icon' src={reloadSVG}></img>
              </div>

              <div className="header__buttons-section">
                <button
                  className="header__currency-switcher-button"
                  onClick={this.currencySwitcherShowUp}
                >
                  <CurrencyContext.Consumer>
                    {(currency) => {
                      if (currencies.length > 0) {
                        return <span>{currencies[currency].symbol}</span>;
                      }
                    }}
                  </CurrencyContext.Consumer>
                  {arrow}
                </button>

                <button
                  onClick={()=>cartOverlayToggler()}
                  className="header__mini-cart-button"
                >
                  <CartContext.Consumer>
                    {({productsInCart}) => {
                      if (productsInCart.length > 0) {
                        return (
                          <p className="header__mini-cart-button-counter">
                            {productsCounter(productsInCart)}
                          </p>
                        );
                      }
                    }}
                  </CartContext.Consumer>

                  <img alt='cart icon' src={cartSVG}></img>
                </button>
              </div>
            </header>
          )
        }}
      </CartOverlayContext.Consumer>
    );
  }
}

Header.propTypes = {
  pickCategory: PropTypes.func,

};

export default Header;
