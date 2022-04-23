import React, { Component } from "react";
import { Link } from "react-router-dom";

import CartContext from "../ContextCart";
import CurrencyContext from "../ContextCurrency";

import cartSVG from "../../icons/cart.svg";
import arrowDownSVG from "../../icons/arrowDown.svg";
import arrowUpSVG from "../../icons/arrowUp.svg";
import reloadSVG from "../../icons/reload.svg";

import "./Header.css";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      categories: [],
      currencyBoxVisible: false,
      miniCartVisible: false,
    };
    this.miniCartShowUp = this.miniCartShowUp.bind(this);
    this.currencySwitcherShowUp = this.currencySwitcherShowUp.bind(this);
    this.disappear = this.disappear.bind(this);
  }

  miniCartShowUp() {
    this.setState({ miniCartVisible: !this.state.miniCartVisible });
  }

  currencySwitcherShowUp(e) {
    this.setState({ currencyBoxVisible: !this.state.currencyBoxVisible });
  }

  disappear(e) {
    if (this.state.currencyBoxVisible) {
      this.setState({ currencyBoxVisible: false });
    }
    if (this.state.miniCartVisible) {
      this.setState({ miniCartVisible: false });
    }
  }

  componentDidMount() {
    //currencies
    client
      .query({
        query: gql`
          query {
            currencies {
              label
              symbol
            }
          }
        `,
      })
      .then((result) => {
        return this.setState({ currencies: result.data.currencies });
      });
    //categories
    client
      .query({
        query: gql`
          query {
            categories {
              name
            }
          }
        `,
      })
      .then((result) => {
        return this.setState({ categories: result.data.categories });
      });
  }

  componentDidUpdate(__prevProps, prevState) {
    //currencybox
    if (prevState.currencyBoxVisible !== this.state.currencyBoxVisible) {
      let currencySwitcher = document.querySelector(".currency-switcher__form");
      if (this.state.currencyBoxVisible) {
        currencySwitcher.style.display = "flex";
      } else if (!this.state.currencyBoxVisible) {
        currencySwitcher.style.display = "none";
      }
    }
    //minicart
    if (prevState.miniCartVisible !== this.state.miniCartVisible) {
      let modal = document.querySelector(".modal");
      if (this.state.miniCartVisible) {
        modal.style.display = "block";
      } else if (!this.state.miniCartVisible) {
        modal.style.display = "none";
      }
    }
  }

  render() {
    let categoriesOptions;
    if (this.state.categories) {
      categoriesOptions = this.state.categories.map((category, i) => {
        return (
          <li className="category-li" key={category.name + i}>
            <Link
              className={`${category.name} category-li__link`}
              name={category.name}
              to="/"
              onClick={this.props.pickCategory}
            >
              {category.name.toUpperCase()}
            </Link>
          </li>
        );
      });
    }

    //currency switcher button's arrow
    let arrow;
    if (this.state.currencyBoxVisible) {
      arrow = <img src={arrowUpSVG}></img>;
    } else {
      arrow = <img src={arrowDownSVG}></img>;
    }

    //currency switcher disappear
    if (this.state.currencyBoxVisible === true) {
      let main = document.querySelector(".main");
      main.addEventListener("click", () => {
        this.setState({ currencyBoxVisible: false });
      });
    }

    return (
      <header className="header" onClick={this.disappear}>
        <nav>
          <ul className="header__nav-categories">{categoriesOptions}</ul>
        </nav>

        <div>
          <img src={reloadSVG}></img>
        </div>

        <div className="header__buttons-section">
          <button
            className="header__currency-switcher-button"
            onClick={this.currencySwitcherShowUp}
          >
            <CurrencyContext.Consumer>
              {(currency) => {
                if (this.state.currencies.length > 0) {
                  return <span>{this.state.currencies[currency].symbol}</span>;
                }
              }}
            </CurrencyContext.Consumer>
            {arrow}
          </button>

          <button
            onClick={this.miniCartShowUp}
            className="header__mini-cart-button"
          >
            <CartContext.Consumer>
              {(productsInCart) => {
                if (productsInCart.length > 0) {
                  return (
                    <p className="header__mini-cart-button-counter">
                      {productsInCart.length}
                    </p>
                  );
                }
              }}
            </CartContext.Consumer>

            <img src={cartSVG}></img>
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
