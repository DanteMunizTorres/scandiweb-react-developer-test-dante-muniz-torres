import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import CartContext from '../ContextCart'

import cartSVG from '../../icons/cart.svg'
import arrowDownSVG from '../../icons/arrowDown.svg'
import arrowUpSVG from '../../icons/arrowUp.svg'
import reloadSVG from '../../icons/reload.svg'



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



class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      categories: []
    }
  }


  componentDidMount () {
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
  //categories
  client
  .query({
    query: gql`
    query {
      categories {
        name
      }
    }
    `
})
.then(result => {
  return this.setState({categories: result.data.categories})
});
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }


  render () {
    let categoriesOptions
    if (this.state.categories) {
      categoriesOptions = 
            this.state.categories.map( (category, i ) => {
              return <li key={ category.name + i }><Link to='/' value={category.name} onClick={this.props.pickCategory}>{category.name.toUpperCase()}</Link></li>
            })
    }

    return (
      <header>
        <nav>
          <ul>
            {categoriesOptions}
        
          </ul>
        </nav>
        <div>
          <button>
            <img src={reloadSVG}></img>
          </button>
        </div>
        <div>
        <button>
          $
          <img src={arrowDownSVG}></img>
        </button>


        <select className='selectCurrency' onChange={()=>this.props.changeCurrency()}>
          {this.state.currencies.map((currency, i) => {return <option key={i} value={i}>{currency.symbol}{currency.label}</option>})}
        </select>
        <Link to='/cart'>
          <button>
            <CartContext.Consumer>
              {(productsInCart) => {
                if (productsInCart.length > 0) {
                  return <p>{productsInCart.length}</p>
                }
                }
              }
            </CartContext.Consumer>
            
            <img src={cartSVG}></img>
          </button>
        </Link>
        </div>
      </header>
    );

  }
}

export default Header;




