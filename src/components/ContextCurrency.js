import React from "react";


const CurrencyContext = React.createContext();

export default CurrencyContext

/* const Provider = ({children}) =>  {
  const value = {
    currencyIndex: 0,
    changeCurrency: (e) => {
      this.currencyIndex = e.target
    }
  }

  return (
    <CurrencyContext.Provider value = {value.currencyIndex}>
      {children}
    </CurrencyContext.Provider>
  )
}


export default  {
  Provider,
  Consumer: CurrencyContext.Consumer
} */
