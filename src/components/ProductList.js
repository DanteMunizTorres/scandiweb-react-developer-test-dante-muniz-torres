import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'


import ProductArticle from './ProductArticle'


class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products
    }
  }

  componentDidMount () {
    //llamado a api 
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }


  render () {

    console.log('en render PRODUCT LIST', this.state.products)
    console.log('en render PRODUCT LIST PROPS---------------', this.props.products)

    let articles
    if (this.props.products) {
      articles = this.props.products.map((product, i) => <ProductArticle key={i} product={product}/>)
    }

    return (
      <section>
        {articles}
      </section>
    );

  }
}

export default ProductList;



