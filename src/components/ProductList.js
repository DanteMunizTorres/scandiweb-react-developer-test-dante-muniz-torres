import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'


import ProductArticle from './ProductArticle'


class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
    //llamado a api 
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }


  render () {


    return (
      <section>
        <ProductArticle />
      </section>
    );

  }
}

export default ProductList;



