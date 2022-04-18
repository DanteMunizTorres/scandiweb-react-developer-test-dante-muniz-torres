import React, { Component } from 'react'

import './CurrencySwitcher.css'

class CurrencySwitcher extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    /* this.disapear = this.disapear.bind(this) */
    this.miniCartDesapear = this.miniCartDesapear.bind(this)
    
  }

  componentDidMount () {
    
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }

/*   disapear(e) {
    let modal = document.querySelector('.modal')
    if(e.target === modal) {
      modal.style.display = 'none'
    }
  } */
  miniCartDesapear(e) {
    let modal = document.querySelector('.modal')
    modal.style.display = 'none'
    }

  render () {

    let currencyOptions
    if (this.props.currencies.length > 0) {
      console.log('this.props.currencies***********',this.props.currencies);
      currencyOptions =
      this.props.currencies.map((currency, i) => {
        return  <div 
                  className='currency-switcher__option' 
                  key={i + currency.label}
                  >
                  <input 
                    type='radio' 
                    className='currency-switcher__option-input'
                    id={currency.label} 
                    name='currency' 
                    key={i} 
                    value={i} 
                    onChange={(e)=>this.props.changeCurrency(e)} 
                  />
                  <label 
                  htmlFor={currency.label}
                  className='currency-switcher__option-label' 
                  >
                  {currency.symbol}{currency.label}
                  </label>
                </div>
              }
      )

    }

    return (
      <form 
      className='currency-switcher__form' 
      >
        {currencyOptions}
      </form>
    );

  }
}

export default CurrencySwitcher;