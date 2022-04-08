import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import CurrencyContext from './ContextCurrency';

import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart'
import GetParamsId from './GetParamsId';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery, //I'm not going to use this hook because the assigment says hooks can't be used: 
  gql
} from "@apollo/client";


const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});



class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productDetail: '',
      productList: [],
      productsInCart: []
    }
  }

  componentDidMount () {
    //llamado a api 
    
    client
    .query({
      query: gql`
      query {
        category {
          products {
            id
            name
            brand
            inStock
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            gallery
            attributes {
              id
              name
              items {
                id
                value
                displayValue
              }
            }
          }
        }
      }
      `
  })
  .then(result => {
    return this.setState({productList: result.data.category.products})
  });
}

componentDidUpdate () {
  /* console.log('me actualice'); */

  
}


render () {




    return (
      
      <main>
      <Routes>
        <Route path='/' exact={true} element={ <ProductList products={this.state.productList}/>}/>
        <Route path='/' exact={true} element={ <Cart />}/>
        <Route path='/detail/:id' exact={true} element={ <GetParamsId products={this.state.productList} id={this.path}/>}/>
        {/* <Route path='/detail/:id' exact={true} component={ ()=> ProductDetail }/> */}
        {/* <Route path='/detail/:id' exact={true}> <ProductDetail /></Route> */}
      </Routes>
      </main>
      
    );

  }
}

export default Main;



