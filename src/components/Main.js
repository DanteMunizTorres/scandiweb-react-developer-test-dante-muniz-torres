import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart'


class Main extends Component {

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
      <main>
      <Routes>
        <Route path='/' exact={true} element={ <Cart />}/>
        <Route path='/' exact={true} element={ <ProductDetail />}/>
        <Route path='/' exact={true} element={ <ProductList />}/>
      </Routes>
      </main>
    );

  }
}

export default Main;



