import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import cartSVG from '../../icons/cart.svg'
import arrowDownSVG from '../../icons/arrowDown.svg'
import arrowUpSVG from '../../icons/arrowUp.svg'
import reloadSVG from '../../icons/reload.svg'


import CurrencyMenu  from './CurrencyMenu';



class Header extends Component {

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
      <header>
        <ul>
          <li><Link to='/'>women</Link></li>
          <li><Link to='/'>men</Link></li>
          <li><Link to='/'>kid</Link></li>          
        </ul>
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
        <CurrencyMenu currencies={[]} />
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




