import React, { Component } from "react";

import CurrencyContext from "./ContextCurrency";
import ProductArticle from "./ProductArticle";

import './ProductList.css'

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {productsLength: ''};
  }

  componentDidMount() {
    this.setState({productsLength: this.props.products.length})
  }


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

      if (document.querySelector('.product-list')) {
        if(this.state.productsLength < 3 || this.props.products.length < 3) {
        document.querySelector('.product-list').style.justifyContent = 'space-evenly'
      } else {
        document.querySelector('.product-list').style.justifyContent = 'space-between'
      }
    }
      
      }



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

export default ProductList;
