import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'



import ProductList from './ProductList';
import CartTinyView from './CartTinyView'
import CurrencySwitcher from './CurrencySwitcher'
import Cart from './Cart'
import GetParamsId from './GetParamsId';

import './Main.css'


/* import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery, //I'm not going to use this hook because the assigment says hooks can't be used: 
  gql
} from "@apollo/client";


const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
}); */



class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productDetail: '',
      productsInCart: []
    }
  }

render () {




    return (
      
      <main className='main'>
        <CurrencySwitcher 
          changeCurrency={this.props.changeCurrency} 
          currencies={this.props.currencies} 
        />
        {/* <h2 className='main__title'>{this.props.category.toUpperCase()}</h2> */}
        <CartTinyView 
          productsList={this.props.productList} 
          manageQuantity={this.props.manageQuantity} 
        />
      <Routes>
        <Route path='/' exact={true} element={ <ProductList products={this.props.productList} bringInfo={this.props.bringInfo} category={this.props.category} />} />
        <Route path='/cart' exact={true} element={ <Cart productsList={this.props.productList} manageQuantity={this.props.manageQuantity} />} />
        <Route path='/detail/:id' exact={true} element={ <GetParamsId products={this.props.productList} bringInfo={this.props.bringInfo} />} />
        
      </Routes>
      </main>
      
    );

  }
}

export default Main;



