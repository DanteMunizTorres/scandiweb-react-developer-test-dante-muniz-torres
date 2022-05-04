import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import "./CurrencySwitcher.css";

class CurrencySwitcher extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.miniCartDesapear = this.miniCartDesapear.bind(this);
  }

  miniCartDesapear() {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  }

  render() {
    const {changeCurrency, currencies} = this.props

    let currencyOptions;
    if (currencies.length > 0) {
      currencyOptions = currencies.map((currency, i) => {
        return (
          <div className="currency-switcher__option" key={i + currency.label}>
            <input
              type="radio"
              className="currency-switcher__option-input"
              id={currency.label}
              name="currency"
              key={i}
              value={i}
              onChange={(e) => changeCurrency(e)}
            />
            <label
              htmlFor={currency.label}
              className="currency-switcher__option-label"
            >
              {currency.symbol}
              {currency.label}
            </label>
          </div>
        );
      });
    }

    return <form className="currency-switcher__form">{currencyOptions}</form>;
  }
}

CurrencySwitcher.propTypes = {
  changeCurrency: PropTypes.func,
  currencies: PropTypes.array,
};

export default CurrencySwitcher;
