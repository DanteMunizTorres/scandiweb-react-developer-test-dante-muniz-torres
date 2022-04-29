import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import CurrencyContext from "./ContextCurrency";
import ProductArticle from "./ProductArticle";

import "./ProductList.css";

class ProductList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() { 
    let justifyContent
      if (this.props.products.length < 3) {
        justifyContent = "space-evenly";
      } else {
        justifyContent = "space-between";
      }

    let articles;
    if (this.props.products) {
      articles = (
        <CurrencyContext.Consumer>
          {(currency) =>
            this.props.products.map((product, i) => (
              <ProductArticle
                key={i}
                currency={parseInt(currency)}
                product={product}
                bringInfo={this.props.bringInfo}
              />
            ))
          }
        </CurrencyContext.Consumer>
      );
    }
    return (
      <>
        <h2 className="main__title">{this.props.category.toUpperCase()}</h2>
        <section className={"product-list " + justifyContent}>{articles}</section>
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
