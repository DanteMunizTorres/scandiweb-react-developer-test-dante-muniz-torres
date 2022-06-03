import React from "react";
import PropTypes from "prop-types";

const CartContext = React.createContext();

class CartProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsInCart: [],
    };
    this.bringInfo = this.bringInfo.bind(this);
    this.resetCartInfo = this.resetCartInfo.bind(this);
    this.manageQuantity = this.manageQuantity.bind(this);
  }

  bringInfo(productToAdd) {
    const { productsInCart } = this.state;
    let newProductsInCart;
    let checkProductsInCart = productsInCart.find(
      (product) =>
        product.id === productToAdd.id &&
        JSON.stringify(product.info) === JSON.stringify(productToAdd.info)
    );
    if (checkProductsInCart !== undefined) {
      newProductsInCart = productsInCart.map((product) => {
        if (
          product.id === productToAdd.id &&
          JSON.stringify(product.info) === JSON.stringify(productToAdd.info)
        ) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
    } else {
      newProductsInCart = [...productsInCart, productToAdd];
    }
    return this.setState({ productsInCart: newProductsInCart });
  }

  resetCartInfo() {
    return this.setState({ productsInCart: [] });
  }

  manageQuantity(newQuantity) {
    let modifiedProduct = this.state.productsInCart.map((prdct, index) => {
      if (prdct.id === newQuantity.id && index === newQuantity.index) {
        prdct.quantity = newQuantity.number;
      }
      return prdct;
    });
    modifiedProduct = modifiedProduct.filter((prdct) => prdct.quantity > 0);
    return this.setState({ productsInCart: modifiedProduct });
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          bringInfo: this.bringInfo,
          resetCartInfo: this.resetCartInfo,
          manageQuantity: this.manageQuantity,
          productsInCart: this.state.productsInCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
CartProvider.propTypes = {
  children: PropTypes.element,
};
export { CartContext, CartProvider };
