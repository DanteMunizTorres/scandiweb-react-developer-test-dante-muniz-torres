import React from "react";
import PropTypes from "prop-types";

const CartOverlayContext = React.createContext();

class CartOverlayProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOverlayVisible: false,
    };
    this.cartOverlayToggler = this.cartOverlayToggler.bind(this);
    this.cartOverlayHide = this.cartOverlayHide.bind(this);
  }

  cartOverlayToggler() {
    return this.setState({
      cartOverlayVisible: !this.state.cartOverlayVisible,
    });
  }

  cartOverlayHide() {
    return this.setState({ cartOverlayVisible: false });
  }

  render() {
    return (
      <CartOverlayContext.Provider
        value={{
          cartOverlayToggler: this.cartOverlayToggler,
          cartOverlayHide: this.cartOverlayHide,
          cartOverlayVisible: this.state.cartOverlayVisible,
        }}
      >
        {this.props.children}
      </CartOverlayContext.Provider>
    );
  }
}
CartOverlayProvider.propTypes = {
  children: PropTypes.element,
};
export { CartOverlayContext, CartOverlayProvider };
