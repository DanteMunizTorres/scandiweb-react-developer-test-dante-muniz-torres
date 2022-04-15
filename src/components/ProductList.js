import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";

import CurrencyContext from "./ContextCurrency";
import ProductArticle from "./ProductArticle";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //llamado a api
  }

  componentDidUpdate() {
    /* console.log('me actualice'); */
  }

  /* static contextType = CurrencyContext; */

  render() {

    let articles;
    if (this.props.products) {
      articles = (
        <CurrencyContext.Consumer>
          {(currency) =>
            this.props.products.map((product, i) => (
              <ProductArticle key={i} currency={currency} product={product} bringInfo={this.props.bringInfo} />
            ))
          }
        </CurrencyContext.Consumer>
      );

      return (
        <section>{articles}</section>
      );
    }
  }
}
/* ProductArticle.contextType = CurrencyContext */

export default ProductList;
