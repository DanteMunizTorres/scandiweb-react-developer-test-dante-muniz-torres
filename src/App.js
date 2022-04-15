import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import CurrencyContext from './components/ContextCurrency';
import CartContext from './components/ContextCart';

import Header from './components/header/Header'
import Main from './components/Main';

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


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencyChosen: 0,
      category: 'all',
      productList: [],
      productListFilteredByCategory: [],
      product: []
    }
    this.bringInfo = this.bringInfo.bind(this)
    this.changeCurrency = this.changeCurrency.bind(this)
    this.pickCategory = this.pickCategory.bind(this)
    /* this.filterCategory = this.filterCategory.bind(this) */
  }

  changeCurrency(){
    let select = document.querySelector('.selectCurrency')
    return this.setState({currencyChosen: select.value})
  }

  bringInfo(info) {
    console.log('infooooo------------------',info)
    return this.setState({product: [...this.state.product, info]})
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
            category
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
  });


/*   let filteredCategory = this.state.productList.filter(product => product.category === this.state.category)

  console.log('this.state.productList',this.state.productList)
  console.log('filteredCategory',filteredCategory)

  if (this.state.category !== 'all') {
    this.setState({productListFilteredByCategory: filteredCategory})
  } else {
    this.setState({productListFilteredByCategory: this.state.productList})
  } */
  this.setState({productListFilteredByCategory: this.state.productList})

  }

  componentDidUpdate (__prevProps, prevState) {

    if(prevState.category !== this.state.category) {
      let filteredCategory = this.state.productList.filter(product => product.category === this.state.category)
      if (this.state.category !== 'all') {
        this.setState({productListFilteredByCategory: filteredCategory})
      } else {
        this.setState({productListFilteredByCategory: this.state.productList})
      }
    }
    
    if (prevState.productList !== this.state.productList) {
      this.setState({productListFilteredByCategory: this.state.productList})
    }

  }



  pickCategory(e) {
    let categoryChosen = e.target.innerText.toLowerCase()
    return this.setState({category: categoryChosen})
  } 




  render () {
    console.log('this.state.product---------------------',this.state.productListFilteredByCategory)



    return (
      <CartContext.Provider value={this.state.product} >
        <CurrencyContext.Provider value={this.state.currencyChosen}>
          <BrowserRouter>
            <Header changeCurrency={this.changeCurrency} pickCategory={this.pickCategory} />
            <Main productList={this.state.productListFilteredByCategory} bringInfo={this.bringInfo} />
          </BrowserRouter>
        </CurrencyContext.Provider>
      </CartContext.Provider>
        
    );

  }
}

export default App;
