import { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import CartContext from './ContextCart';
import cartSVG from '../icons/cart.svg'

class ProductArticle extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }






  render () {

    return (
      <Link to={`/detail/${this.props.product.id}`}>

                <article>
                  {<img src={this.props.product.gallery[0]} alt=''></img>}
                  <CartContext.Consumer>
                    {(products) => 
                      products.filter(product => product.id === this.props.product.id).length > 0? <div><img src={cartSVG}></img></div>: ''                     
                    }
                   </CartContext.Consumer>
                  <h4>{this.props.product.name}</h4>
                  <h3>{this.props.product.prices[this.props.currency].currency.symbol}{this.props.product.prices[this.props.currency].amount}</h3>
                </article>    

      </Link>
    )
  }
}


export default ProductArticle





/* function ProductArticle (props) {

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

export default ProductArticle */