import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import CurrencyContext from "../contexts/ContextCurrency";
import ProductArticle from "./components/ProductArticle";

import "./ProductList.css";

class ProductList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {products, bringInfo, category } = this.props

    let articles;
    if (products) {
      articles = (
        <CurrencyContext.Consumer>
          {(currency) =>
            products.map((product, i) => (
              <ProductArticle
                key={i}
                currency={parseInt(currency)}
                product={product}
                bringInfo={bringInfo}
              />
            ))
          }
        </CurrencyContext.Consumer>
      );
    }
    return (
      <>
        <h2 className="main__title">{category.toUpperCase()}</h2>
        <section className="product-list ">{articles}</section>
      </>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array,
  category: PropTypes.string,
  bringInfo: PropTypes.func,
};

export default ProductList;
