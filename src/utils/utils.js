
const productsCounter = (products) => {
  if (products.length > 0) {
    return products.map(product => product.quantity).reduce((a,b)=>a+b)
  } else {
    return []
  }
}


export { productsCounter }