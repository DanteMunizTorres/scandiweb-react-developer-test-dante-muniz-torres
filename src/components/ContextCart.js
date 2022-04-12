import React from "react";



/* class setCartContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {id: '', info: ''}
    }
    this.bringInfo = this.bringInfo.bind(this)
  }
  
  bringInfo( productInfo) {
    this.setState({product: productInfo})
  }
  
  render() {
    return(
      <CartContext.Provider
      value={this.state.product}
      >
        { this.props.children }
      </CartContext.Provider>
    )
  }
  
} */

const CartContext = React.createContext();

export default CartContext