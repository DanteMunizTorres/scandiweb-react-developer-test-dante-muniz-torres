import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import CartContext from '../ContextCart'
import CurrencyContext from '../ContextCurrency'

import cartSVG from '../../icons/cart.svg'
import arrowDownSVG from '../../icons/arrowDown.svg'
import arrowUpSVG from '../../icons/arrowUp.svg'
import reloadSVG from '../../icons/reload.svg'

import './Header.css'

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
      categories: [],
      currencyBoxVisible: false,
      miniCartVisible: false
    }
    this.miniCartShowUp = this.miniCartShowUp.bind(this)
    this.currencySwitcherShowUp = this.currencySwitcherShowUp.bind(this)
    this.disappear = this.disappear.bind(this)
  }

  miniCartShowUp() {
    /* let modal = document.querySelector('.modal') */
/*       if(this.state.miniCartVisible === false) {
        this.setState({miniCartVisible: true})
      } else if (this.state.miniCartVisible === true) {
        this.setState({miniCartVisible: false})
      } */

      this.setState({ miniCartVisible: !this.state.miniCartVisible})
        /* modal.style.display = 'block' */
  }

  currencySwitcherShowUp(e) {
    this.setState({ currencyBoxVisible: !this.state.currencyBoxVisible})

    /* document.querySelector('.currency-switcher__form').addClass('visible') */
  }

  disappear(e) {
    
    if(this.state.currencyBoxVisible) {
      this.setState({ currencyBoxVisible: false})
    }
    if(this.state.miniCartVisible) {
      this.setState({ miniCartVisible: false})
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

  componentDidUpdate (__prevProps, prevState) {
    /* console.log('me actualice'); */
    //currencybox
    if (prevState.currencyBoxVisible !== this.state.currencyBoxVisible) {
      let currencySwitcher = document.querySelector('.currency-switcher__form')
      if (this.state.currencyBoxVisible) {
        currencySwitcher.style.display = 'flex'
      } else if (!this.state.currencyBoxVisible) {
        currencySwitcher.style.display = 'none'
      }
    }
    //minicart
    if (prevState.miniCartVisible !== this.state.miniCartVisible) {
      let modal = document.querySelector('.modal')
      if (this.state.miniCartVisible) {
        modal.style.display = 'block'
      } else if (!this.state.miniCartVisible) {
        modal.style.display = 'none'
      }
    }
  }


  render () {
    let categoriesOptions
    if (this.state.categories) {
      categoriesOptions = 
            this.state.categories.map( (category, i ) => {
              return <li className='category-li' key={ category.name + i }><Link to='/' onClick={this.props.pickCategory}>{category.name.toUpperCase()}</Link></li>
            })

    }

    //currency switcher button's arrow
    let arrow
    if (this.state.currencyBoxVisible) {
      arrow =  <img src={arrowUpSVG}></img>
    } else {
      arrow = <img src={arrowDownSVG}></img>
    }

    //currency switcher disappear
    if(this.state.currencyBoxVisible === true) {
      let main = document.querySelector('.main')
      main.addEventListener('click', ()=> {
        /* console.log('click');  */               
        this.setState({ currencyBoxVisible: false})
      })
    }

    return (
      <header className='header' onClick={this.disappear}>
        <nav>
          <ul className='header__nav-categories'>
            {categoriesOptions}
        
          </ul>
        </nav>
        
        <div>

            <img src={reloadSVG}></img>


        </div>
        
        <div className='header__buttons-section'>
          
{/* {        <select className='selectCurrency' onChange={()=>this.props.changeCurrency()}>
          {this.state.currencies.map((currency, i) => {return <option key={i} value={i}>{currency.symbol}{currency.label}</option>})}
        </select>} */}

      <button className='header__currency-switcher-button' onClick={this.currencySwitcherShowUp}>
        <CurrencyContext.Consumer>
          {
            (currency) => {
              if (this.state.currencies.length > 0) {
                return <span>{this.state.currencies[currency].symbol}</span> 
              }
            } 
          }
        </CurrencyContext.Consumer>
        
        {/* {currency.symbol} */} {arrow}
      </button>
        
          <button onClick={this.miniCartShowUp} className='header__mini-cart-button'>
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
        
        </div>
      </header>
    );

  }
}

export default Header;




