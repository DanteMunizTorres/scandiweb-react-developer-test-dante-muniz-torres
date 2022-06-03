import React, { PureComponent } from "react";
import { Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";

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
    this.state = {};
  }

  render() {
    const {
      productListFilteredByCategory,
      currencies,
      category,
      changeCurrency,
    } = this.props;
    return (
      <main className="main">
        <Modal />
        <CurrencySwitcher
          changeCurrency={changeCurrency}
          currencies={currencies}
        />
        <CartTinyView />
        <Routes>
          <Route
            path="/"
            exact={true}
            element={
              <ProductList
                products={productListFilteredByCategory}
                category={category}
              />
            }
          />
          <Route path="/cart" exact={true} element={<Cart />} />
          <Route
            path="/detail/:id"
            exact={true}
            element={<GetParamsId products={productListFilteredByCategory} />}
          />
        </Routes>
      </main>
    );
  }
}

Main.propTypes = {
  productListFilteredByCategory: PropTypes.array,
  currencies: PropTypes.array,
  category: PropTypes.string,
  changeCurrency: PropTypes.func,
};

export default Main;
