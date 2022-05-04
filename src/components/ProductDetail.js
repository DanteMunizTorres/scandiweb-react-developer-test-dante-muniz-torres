import React, { PureComponent } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import CurrencyContext from "./ContextCurrency";
import ProductDetailAttributesBox from "./ProductDetailAttributesBox";

import "./ProductDetail.css";

class ProductDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productToShow: undefined,
      inputsUsed1: undefined,
      inputsUsed2: undefined,
      inputsUsed3: undefined,
      navigate: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.showBig = this.showBig.bind(this);
  }

  componentDidMount() {
    const id = this.props.id;
    const products = this.props.products;
    const productToShow = products.find((product) => product.id === id);
    this.setState({ productToShow: productToShow });
  }

  componentDidUpdate() {
    if (document.querySelector(".productDescription")) {
      const productDescriptionDiv = document.querySelector(".productDescription");
      productDescriptionDiv.innerHTML = this.state.productToShow.description;
    }

    if (document.querySelector(".imgs-gallery__mini-img-container")) {
      if (this.state.productToShow.gallery.length < 2) {
        document.querySelector(
          ".imgs-gallery__mini-img-container"
        ).style.display = "none";
      }
    }
  }

  showBig(e) {
    const bigImg = document.querySelector(".imgs-gallery__big-img");
    bigImg.src = e.target.src;
  }

  addToCart(e) {
    e.preventDefault();
    const { inputsUsed1, inputsUsed2, inputsUsed3 } = this.state
    const inputsAll = [inputsUsed1, inputsUsed2, inputsUsed3];
    const inputsToSend = inputsAll.filter((input) => input != undefined);

    const { prices, attributes } = this.state.productToShow
    
    const sendToCart = {
      id: this.props.id,
      quantity: 1,
      info: inputsToSend,
      prices: prices,
    };
    //show modal if no attribute is selected
    if (attributes.length !== sendToCart.info.length) {
      const message =
        "You need to choose the product attributes before adding it to the cart";
      return this.props.showModal(e, message);
    }
    //lifting info to App.js
    this.props.bringInfo(sendToCart);
    //go to product list
    return this.setState({ navigate: true });
  }

  inputHandler(e) {
    const target = e.target
    const {name, value} = target

    //modify inputs-labels styles
    if (target.classList.contains("input-not-color")) {
      const inputNotColor = document.getElementsByClassName("input-not-color");
      for (let i = 0; inputNotColor.length > i; i++) {
        if (inputNotColor[i].checked) {
          inputNotColor[i].parentElement.classList.add(
            "check__input-not-color"
          );
        } else if (
          !inputNotColor[i].checked &&
          inputNotColor[i].parentElement.classList.contains(
            "check__input-not-color"
          )
        ) {
          inputNotColor[i].parentElement.classList.remove(
            "check__input-not-color"
          );
        }
      }
    }
    if (target.classList.contains("input-color")) {
      const inputColor = document.getElementsByClassName("input-color");
      for (let i = 0; inputColor.length > i; i++) {
        if (inputColor[i].checked) {
          inputColor[i].parentElement.classList.add("check__input-color");
        } else if (
          !inputColor[i].checked &&
          inputColor[i].parentElement.classList.contains(
            "check__input-color",
            "check__input-color-green"
          )
        ) {
          inputColor[i].parentElement.classList.remove("check__input-color");
        }
      }
    }
    const { inputsUsed1, inputsUsed2, inputsUsed3 } = this.state
    //input 1
    if (inputsUsed1 === undefined) {
      return this.setState({ inputsUsed1: { name: name, value: value } });
    }
    if (name === inputsUsed1.name) {
      return this.setState({ inputsUsed1: { name: name, value: value } });
    }
    //input 2
    if (
      name != inputsUsed1.name &&
      inputsUsed2 === undefined
    ) {
      return this.setState({ inputsUsed2: { name: name, value: value } });
    }
    if (name === inputsUsed2.name) {
      return this.setState({ inputsUsed2: { name: name, value: value } });
    }
    //input 3
    if (
      name != inputsUsed2.name &&
      inputsUsed3 === undefined
    ) {
      return this.setState({ inputsUsed3: { name: name, value: value } });
    }
    if (name === inputsUsed3.name) {
      return this.setState({ inputsUsed3: { name: name, value: value } });
    }
  }

  render() {

    if (this.state.navigate === true) {
      return <Navigate to="/" replace={true} />;
    }
    let productDetail;
    if (this.state.productToShow === undefined) {
      productDetail = (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    } else {
      const { gallery, id, brand, name, attributes, prices } = this.state.productToShow;
      productDetail = (
        <section className="product-detail-main-section">
          <article className="imgs-gallery">
            <div className="imgs-gallery__mini-img-container">
              {gallery.map((img, i) => {
                return (
                  <div key={i} className="mini-img-wrapper">
                    <img
                      src={img}
                      className="imgs-gallery__mini-img"
                      alt="product little image"
                      onClick={this.showBig}
                    ></img>
                  </div>
                );
              })}
            </div>

            <div className="imgs-gallery__big-img-container">
              <img
                src={gallery[0]}
                className="imgs-gallery__big-img"
                alt="product big image"
              ></img>
            </div>
          </article>

          <form
            onSubmit={this.addToCart}
            value={id}
            className="product-detail__info"
          >
            <h2 className="product-detail__brand">{brand}</h2>
            <h2 className="product-detail__name">{name}</h2>

            <div className="attributes-container">
              <ProductDetailAttributesBox
                attributes={attributes}
                inputHandler={this.inputHandler}
              />
            </div>
            <CurrencyContext.Consumer>
              {(value) => (
                <div>
                  <h4 className="attributes-price-title">price:</h4>
                  <h3 className="attributes-price-number">
                    {prices[value].currency.symbol}
                    {prices[value].amount.toFixed(2)}
                  </h3>
                </div>
              )}
            </CurrencyContext.Consumer>
            <button className="addToCartButton" type="submit">
              add to cart
            </button>
            <div className="productDescription attributes-product-detail__description"></div>
          </form>
        </section>
      );
    }

    return <>{productDetail}</>;
  }
}

ProductDetail.propTypes = {
  id: PropTypes.string,
  products: PropTypes.array,
  showModal: PropTypes.func,
  bringInfo: PropTypes.func,
};

export default ProductDetail;
