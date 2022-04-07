import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";

import CurrencyContext from "./ContextCurrency";
import ProductArticle from "./ProductArticle";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products,
    };
  }

  componentDidMount() {
    //llamado a api
  }

  componentDidUpdate() {
    /* console.log('me actualice'); */
  }

  /* static contextType = CurrencyContext; */

  render() {
    /* console.log('context--------------------------------',contextType); */

    console.log("en render PRODUCT LIST", this.state.products);
    console.log(
      "en render PRODUCT LIST PROPS---------------",
      this.props.products
    );

    let articles;
    if (this.props.products) {
      articles = (
        <CurrencyContext.Consumer>
          {(currency) =>
            this.props.products.map((product, i) => (
              <ProductArticle key={i} currency={currency} product={product} />
            ))
          }
        </CurrencyContext.Consumer>
      );

      return (
        /*<CurrencyContext.Consumer>
        {
          (currency) => (
            <section>             
              if (this.props.products) {
                this.props.products.map((product, i) => <ProductArticle key={i} currency={currency}  product={product}/>)
              }              
            </section>
          )
        }
      </CurrencyContext.Consumer> */
        <section>{articles}</section>
      );
    }
  }
}
/* ProductArticle.contextType = CurrencyContext */

export default ProductList;
