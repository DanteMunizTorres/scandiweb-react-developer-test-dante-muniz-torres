import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";

import CurrencyContext from "./ContextCurrency";
import ProductArticle from "./ProductArticle";

import './ProductList.css'

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //llamado a api
/*     if (this.props.products < 3) {
      document.querySelector('.product-list').style.justifyContent = 'space-evenly'
    } */
  }

  componentDidUpdate(prevProps) {
    /* console.log('me actualice'); */
    /* if (prevProps.products !== this.props.products && this.props.products.length < 3) {
      document.querySelector('.product-list').style.justifyContent = 'space-evenly'
    } else if (prevProps.products !== this.props.products && this.props.products.length >= 3) {
      document.querySelector('.product-list').style.justifyContent = 'space-between'
    } */
  }

  /* static contextType = CurrencyContext; */

  render() {

    if (document.querySelector('.product-list') && this.props.products.length < 3) {
      document.querySelector('.product-list').style.justifyContent = 'space-evenly'
    } else if (document.querySelector('.product-list') && this.props.products.length >= 3) {
      document.querySelector('.product-list').style.justifyContent = 'space-between'
    }

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
        <>
          <h2 className='main__title'>{this.props.category.toUpperCase()}</h2>
          <section className="product-list">
            {articles}
          </section>
        </>
      );
    }
  }
}
/* ProductArticle.contextType = CurrencyContext */

export default ProductList;
