import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

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
      currencies: []
    }
  }


  componentDidMount () {
    //llamado a api 
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

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }


  render () {


    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>women</Link></li>
            <li><Link to='/'>men</Link></li>
            <li><Link to='/'>kid</Link></li>          
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
        <button>
          <p>x</p>
          <img src={cartSVG}></img>
        </button>
        </div>
      </header>
    );

  }
}

export default Header;




