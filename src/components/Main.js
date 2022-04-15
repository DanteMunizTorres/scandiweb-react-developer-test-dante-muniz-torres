import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'



import ProductList from './ProductList';
import CartTinyView from './CartTinyView'
import Cart from './Cart'
import GetParamsId from './GetParamsId';


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
      /* productList: [], */
      productsInCart: []
    }
  }

  componentDidMount () {
    //llamado a api 
    
/*     client
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
            description
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
  }); */
}

componentDidUpdate () {
  /* console.log('me actualice'); */

  
}


render () {




    return (
      
      <main>
        {/* <CartTinyView /> */}
      <Routes>
        <Route path='/' exact={true} element={ <ProductList products={this.props.productList} bringInfo={this.props.bringInfo} />} />
        <Route path='/cart' exact={true} element={ <Cart productsList={this.props.productList} />} />
        <Route path='/detail/:id' exact={true} element={ <GetParamsId products={this.props.productList} bringInfo={this.props.bringInfo} />} />
        
      </Routes>
      </main>
      
    );

  }
}

export default Main;



