import React, { PureComponent } from "react";
import { Route, Routes } from "react-router-dom";
import PropTypes from 'prop-types';

import ProductList from "./ProductList";
import CartTinyView from "./CartTinyView";
import CurrencySwitcher from "./CurrencySwitcher";
import Cart from "./Cart";
import GetParamsId from "./GetParamsId";
import Modal from "./Modal";

import "./Main.css";

class Main extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      productDetail: "",
      productsInCart: [],
      message: "Ups, somthing went wrong...",
    };
    this.showModal = this.showModal.bind(this);
  }

  
  showModal(e, message) {
    e.preventDefault();
    const checkOutModal = document.querySelector(".modal-container");
    checkOutModal.style.display = "flex";
    return this.setState({ message: message });
  }
  render() {
    const {productList, productListAll, currencies, category, manageQuantity, changeCurrency, resetCartInfo, bringInfo} = this.props
    return (
      <main className="main">
        <Modal message={this.state.message} />
        <CurrencySwitcher
          changeCurrency={changeCurrency}
          currencies={currencies}
        />
        <CartTinyView
          productsList={productListAll}
          manageQuantity={manageQuantity}
          showModal={this.showModal}
          resetCartInfo={resetCartInfo}
        />
        <Routes>
          <Route
            path="/"
            exact={true}
            element={
              <ProductList
                products={productList}
                bringInfo={bringInfo}
                category={category}
              />
            }
          />
          <Route
            path="/cart"
            exact={true}
            element={
              <Cart
                productsList={productListAll}
                manageQuantity={manageQuantity}
                showModal={this.showModal}
                resetCartInfo={resetCartInfo}
              />
            }
          />
          <Route
            path="/detail/:id"
            exact={true}
            element={
              <GetParamsId
                products={productList}
                bringInfo={bringInfo}
                showModal={this.showModal}
              />
            }
          />
        </Routes>
      </main>
    );
  }
}

Main.propTypes = {
  productList: PropTypes.array,
  productListAll: PropTypes.array,
  currencies: PropTypes.array,
  category: PropTypes.string,
  manageQuantity: PropTypes.func,
  changeCurrency: PropTypes.func,
  resetCartInfo: PropTypes.func,
  bringInfo: PropTypes.func,
};

export default Main;
