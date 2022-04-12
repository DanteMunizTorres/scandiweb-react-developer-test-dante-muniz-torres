import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import CurrencyContext from './components/ContextCurrency';
import CartContext from './components/ContextCart';

import Header from './components/header/Header'
import Main from './components/Main';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencyChosen: 0,
      product: []
    }
    this.bringInfo = this.bringInfo.bind(this)
    this.changeCurrency = this.changeCurrency.bind(this)
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

  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }


  render () {
    console.log('this.state.product---------------------',this.state.product)

    return (
      <CartContext.Provider value={this.state.product} >
        <CurrencyContext.Provider value={this.state.currencyChosen}>
          <BrowserRouter>
            <Header changeCurrency={this.changeCurrency}/>
            <Main bringInfo={this.bringInfo} />
          </BrowserRouter>
        </CurrencyContext.Provider>
      </CartContext.Provider>
        
    );

  }
}

export default App;
