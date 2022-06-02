import React, { PureComponent } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import CurrencyContext from "./contexts/ContextCurrency";
import CartContext from "./contexts/ContextCart";
import { CartOverlayProvider } from "./contexts/CartOverlayContext";

import Header from "./pages/components/Header";
import Main from "./pages/Main";

import client from './grapgql/client'
import currenciesQuery from "./grapgql/queryCurrencies";
import { productsByCategory } from "./grapgql/querierProductsByCategory";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currencyChosen: 0,
      category: "all",
      currencies: [],
      productList: [],
      productListFilteredByCategory: [],
      productsInCart: [],
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

  bringInfo(productToAdd) {
    const {productsInCart} = this.state
    let newProductsInCart;
    let checkProductsInCart = productsInCart.find(product => product.id === productToAdd.id && JSON.stringify(product.info) === JSON.stringify(productToAdd.info))
    if (checkProductsInCart !== undefined) {
      newProductsInCart = productsInCart.map(product => {
        if( product.id === productToAdd.id && JSON.stringify(product.info) === JSON.stringify(productToAdd.info) ) {
          return {...product, quantity: product.quantity + 1}
        }
        return product         
      })
    } else {
      newProductsInCart = [...productsInCart, productToAdd]
    }
    return this.setState({ productsInCart: newProductsInCart });
  }

  resetCartInfo() {
    return this.setState({ productsInCart: [] });
  }

  manageQuantity(newQuantity) {
    let modifiedProduct = this.state.productsInCart.map((prdct, index) => {
      if (prdct.id === newQuantity.id && index === newQuantity.index) {
        prdct.quantity = newQuantity.number;
      }
        return prdct;
    });
    modifiedProduct = modifiedProduct.filter(prdct => prdct.quantity > 0 )
    return this.setState({ productsInCart: modifiedProduct });
  }

  pickCategory(e) {
    const categoryChosen = e.target.innerText.toLowerCase();
    return this.setState({ category: categoryChosen });
  }

  componentDidMount() {
    //products
    const { category } = this.state
    client
      .query(productsByCategory(category))
      .then((result) => {
        return this.setState({ productListFilteredByCategory: result.data.category.products })
      })
      .catch(err => console.log(err));
    //currencies
    client
      .query(currenciesQuery)
      .then((result) => {
        return this.setState({ currencies: result.data.currencies });
      });
  }

  componentDidUpdate(__prevProps, prevState) {
    const { category } = this.state
    if (prevState.category !== category) {
      client
      .query(productsByCategory(category))
      .then((result) => {
        return this.setState({ productListFilteredByCategory: result.data.category.products })
      })
      .catch(err => console.log(err));
    }

  }

  render() {
    const { category, productsInCart, currencyChosen, productListFilteredByCategory, currencies } = this.state

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
      <CartContext.Provider value={productsInCart}>
        <CurrencyContext.Provider value={currencyChosen}>
          <CartOverlayProvider>
            <BrowserRouter>
              <Header
                pickCategory={this.pickCategory}
              />
              <Main
                category={category}
                /* productListAll={productList} */
                productListFilteredByCategory={productListFilteredByCategory}
                currencies={currencies}
                bringInfo={this.bringInfo}
                resetCartInfo={this.resetCartInfo}
                changeCurrency={this.changeCurrency}
                manageQuantity={this.manageQuantity}
              />
            </BrowserRouter>
          </CartOverlayProvider>
        </CurrencyContext.Provider>
      </CartContext.Provider>
    );
  }
}

export default App;
