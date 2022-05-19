
const productsCounter = (products) => {
  if (products.length > 0) {
    return products.map(product => product.quantity).reduce((a,b)=>a+b)
  } else {
    return []
  }
}

const productsTotalPrice = (productsArray, currencyIndex) => {
  const total = productsArray
  .map(product => product.prices[currencyIndex].amount * product.quantity)
  .reduce((a, b) => a + b, 0);
  return total.toFixed(2)
}

const taxesCalculator = (total, taxes) => {
  const totalTaxes = (total/100)*taxes;
  return totalTaxes.toFixed(2)
}


export { productsCounter, productsTotalPrice, taxesCalculator }