import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

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
          <li><Link to='/'></Link></li>
        </ul>

        <CurrencyMenu currencies={[]} />
      </header>
    );

  }
}

export default Header;