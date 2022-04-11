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
      currencyChosen: 0
    }
  }

  changeCurrency(){
    let select = document.querySelector('.selectCurrency')
    this.setState({currencyChosen: select.value})
  }

  componentDidMount () {
    //llamado a api 

  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }


  render () {


    return (

        <CurrencyContext.Provider value={this.state.currencyChosen}>
      <BrowserRouter>
          <Header changeCurrency={()=>this.changeCurrency()}/>
          <Main />
      </BrowserRouter>
        </CurrencyContext.Provider>
    );

  }
}

export default App;
