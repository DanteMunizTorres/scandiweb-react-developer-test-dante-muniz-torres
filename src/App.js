import React, { PureComponent } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import CurrencyContext from "./components/ContextCurrency";
import CartContext from "./components/ContextCart";

import Header from "./components/header/Header";
import Main from "./components/Main";

import client from './grapgql/client'
import productsQuery from './grapgql/queryProducts'
import currenciesQuery from "./grapgql/queryCurrencies";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currencyChosen: 0,
      category: "all",
      currencies: [],
      productList: [],
      productListFilteredByCategory: [],
      product: [],
    };
    this.bringInfo = this.bringInfo.bind(this);
    this.resetCartInfo = this.resetCartInfo.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.pickCategory = this.pickCategory.bind(this);
    this.manageQuantity = this.manageQuantity.bind(this);
  }

  changeCurrency(e) {
    const value = e.target.value;
    return this.setState({ currencyChosen: value });
  }

  bringInfo(info) {
    return this.setState({ product: [...this.state.product, info] });
  }
  resetCartInfo() {
    return this.setState({ product: [] });
  }

  manageQuantity(newQuantity) {
    const modifiedProduct = this.state.product.map((prdct, index) => {
      if (prdct.id === newQuantity.id && index === newQuantity.index) {
        prdct.quantity = newQuantity.number;
      }
      return prdct;
    });
    return this.setState({ product: modifiedProduct });
  }

  pickCategory(e) {
    const categoryChosen = e.target.innerText.toLowerCase();
    return this.setState({ category: categoryChosen });
  }

  componentDidMount() {
    //products
    client
      .query(productsQuery)
      .then((result) => {
        return this.setState({ productList: result.data.category.products });
      });
    //currencies
    client
      .query(currenciesQuery)
      .then((result) => {
        return this.setState({ currencies: result.data.currencies });
      });
  }

  componentDidUpdate(__prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      const filteredCategory = this.state.productList.filter((product) => product.category === this.state.category);
      if (this.state.category !== "all") {
        this.setState({ productListFilteredByCategory: filteredCategory });
      } else {
        this.setState({
          productListFilteredByCategory: this.state.productList,
        });
      }
    }
    if (prevState.productList !== this.state.productList) {
      this.setState({ productListFilteredByCategory: this.state.productList });
    }
  }

  render() {
    // category nav style
    if (document.querySelector(`.${this.state.category}`)) {
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
        if (categoryNav[i].name === this.state.category) {
          categoryNav[i].classList.add(
            `category-active__${categoryNav[i].name}`
          );
        }
      }
    }

    return (
      <CartContext.Provider value={this.state.product}>
        <CurrencyContext.Provider value={this.state.currencyChosen}>
          <BrowserRouter>
            <Header
              changeCurrency={this.changeCurrency}
              pickCategory={this.pickCategory}
            />
            <Main
              category={this.state.category}
              productListAll={this.state.productList}
              productList={this.state.productListFilteredByCategory}
              currencies={this.state.currencies}
              bringInfo={this.bringInfo}
              resetCartInfo={this.resetCartInfo}
              changeCurrency={this.changeCurrency}
              manageQuantity={this.manageQuantity}
            />
          </BrowserRouter>
        </CurrencyContext.Provider>
      </CartContext.Provider>
    );
  }
}

export default App;
