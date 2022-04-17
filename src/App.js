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
      currencies: [],
      productList: [],
      productListFilteredByCategory: [],
      product: []
    }
    this.bringInfo = this.bringInfo.bind(this)
    this.changeCurrency = this.changeCurrency.bind(this)
    this.pickCategory = this.pickCategory.bind(this)
    /* this.filterCategory = this.filterCategory.bind(this) */
  }

  changeCurrency(e){
    /* let select = document.querySelector('.selectCurrency') */
    let value = e.target.value
    return this.setState({currencyChosen: value})
  }

  bringInfo(info) {
    console.log('infooooo------------------',info)
    return this.setState({product: [...this.state.product, info]})
  }

  pickCategory(e) {
    let categoryChosen = e.target.innerText.toLowerCase()
    return this.setState({category: categoryChosen})
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
      //currencies 
      client
      .query({
        query: gql`
        query {
          currencies {
            label
            symbol
          }
        }
        `
    })
    .then(result => {
      return this.setState({currencies: result.data.currencies})
    });

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




  render () {
    console.log('this.state.product---------------------',this.state.productListFilteredByCategory)



    return (
      <CartContext.Provider value={this.state.product} >
        <CurrencyContext.Provider value={this.state.currencyChosen}>
          <BrowserRouter>
            <Header changeCurrency={this.changeCurrency} pickCategory={this.pickCategory} />
            <Main 
              category={this.state.category} 
              productList={this.state.productListFilteredByCategory} 
              currencies={this.state.currencies}
              bringInfo={this.bringInfo} 
              changeCurrency={this.changeCurrency}
            />
          </BrowserRouter>
        </CurrencyContext.Provider>
      </CartContext.Provider>
        
    );

  }
}

export default App;
