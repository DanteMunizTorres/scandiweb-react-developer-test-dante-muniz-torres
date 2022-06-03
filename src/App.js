import React, { PureComponent } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import CurrencyContext from "./contexts/ContextCurrency";
import { CartProvider } from "./contexts/ContextCart";
import { CartOverlayProvider } from "./contexts/CartOverlayContext";

import Header from "./pages/components/Header";
import Main from "./pages/Main";

import client from "./grapgql/client";
import currenciesQuery from "./grapgql/queryCurrencies";
import { productsByCategory } from "./grapgql/querierProductsByCategory";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currencyChosen: 0,
      category: "all",
      currencies: [],
      productListFilteredByCategory: [],
    };
    this.changeCurrency = this.changeCurrency.bind(this);
    this.pickCategory = this.pickCategory.bind(this);
  }

  changeCurrency(e) {
    const value = e.target.value;
    return this.setState({ currencyChosen: value });
  }

  pickCategory(e) {
    const categoryChosen = e.target.innerText.toLowerCase();
    return this.setState({ category: categoryChosen });
  }

  componentDidMount() {
    //products
    const { category } = this.state;
    client
      .query(productsByCategory(category))
      .then((result) => {
        return this.setState({
          productListFilteredByCategory: result.data.category.products,
        });
      })
      .catch((err) => console.log(err));
    //currencies
    client.query(currenciesQuery).then((result) => {
      return this.setState({ currencies: result.data.currencies });
    });
  }

  componentDidUpdate(__prevProps, prevState) {
    const { category } = this.state;
    if (prevState.category !== category) {
      client
        .query(productsByCategory(category))
        .then((result) => {
          return this.setState({
            productListFilteredByCategory: result.data.category.products,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const {
      category,
      currencyChosen,
      productListFilteredByCategory,
      currencies,
    } = this.state;

    // category nav style
    if (document.querySelector(`.${category}`)) {
      const categoryNav = document.getElementsByClassName("category-li__link");
      for (let i = 0; categoryNav.length > i; i++) {
        if (
          categoryNav[i].classList.contains(
            `category-active__${categoryNav[i].name}`
          )
        ) {
          categoryNav[i].classList.remove(
            `category-active__${categoryNav[i].name}`
          );
        }
        if (categoryNav[i].name === category) {
          categoryNav[i].classList.add(
            `category-active__${categoryNav[i].name}`
          );
        }
      }
    }

    return (
      <CartProvider>
        <CurrencyContext.Provider value={currencyChosen}>
          <CartOverlayProvider>
            <BrowserRouter>
              <Header pickCategory={this.pickCategory} />
              <Main
                category={category}
                productListFilteredByCategory={productListFilteredByCategory}
                currencies={currencies}
                changeCurrency={this.changeCurrency}
              />
            </BrowserRouter>
          </CartOverlayProvider>
        </CurrencyContext.Provider>
      </CartProvider>
    );
  }
}

export default App;
