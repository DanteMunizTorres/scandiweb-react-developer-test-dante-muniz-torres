
import { Link, Route, Routes } from 'react-router-dom'

function ProductArticle (props) {
  /* console.log(props.product.id); */

  return (
    <Link to={`/detail/${props.product.id}`}>
    
    <article>
      {<img src={props.product.gallery[0]} alt=''></img>}
      <h4>{props.product.name}</h4>
      <h3>{props.product.prices[props.currency].currency.symbol}{props.product.prices[props.currency].amount}</h3>
    </article>    
    </Link>
  )
}

/* CurrencyContext.contextType = CurrencyContext */

export default ProductArticle