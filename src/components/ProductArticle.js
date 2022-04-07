

function ProductArticle (props) {


  return (
    <article>
      {<img src={props.product.gallery[0]} alt=''></img>}
      <h4>{props.product.name}</h4>
      <h3>{props.product.prices[props.currency].currency.symbol}{props.product.prices[0].amount}</h3>
    </article>    
  )
}

/* CurrencyContext.contextType = CurrencyContext */

export default ProductArticle