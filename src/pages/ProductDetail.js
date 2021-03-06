import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CurrencyContext from "../contexts/ContextCurrency";
import { CartContext } from "../contexts/ContextCart";

import ProductDetailAttributesBox from "./components/ProductDetailAttributesBox";

import client from "../grapgql/client";
import { productById } from "../grapgql/querierProductById";

import { OpenModalBtn } from "./components/OpenModalBtn";

import "./ProductDetail.css";

class ProductDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productToShow: undefined,
      inputsUsed1: undefined,
      inputsUsed2: undefined,
      inputsUsed3: undefined,
    };
    this.addToCart = this.addToCart.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.showBig = this.showBig.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;

    client
      .query(productById(id))
      .then((result) => {
        return this.setState({ productToShow: result.data.product });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    const {
      productToShow: { description, gallery },
    } = this.state;
    if (document.querySelector(".productDescription")) {
      const productDescriptionDiv = document.querySelector(
        ".productDescription"
      );
      productDescriptionDiv.innerHTML = description;
    }

    if (document.querySelector(".imgs-gallery__mini-img-container")) {
      if (gallery.length < 2) {
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

  addToCart(e, bringInfoFunc) {
    e.preventDefault();
    const { id } = this.props;
    const { prices } = this.state.productToShow;

    const { inputsUsed1, inputsUsed2, inputsUsed3 } = this.state;
    const inputsAll = [inputsUsed1, inputsUsed2, inputsUsed3];
    const inputsToSend = inputsAll.filter((input) => input != undefined);

    const sendToCart = {
      id: id,
      quantity: 1,
      info: inputsToSend,
      prices: prices,
    };
    bringInfoFunc(sendToCart);
  }

  inputHandler(e) {
    const target = e.target;
    const { name, value } = target;

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
    const { inputsUsed1, inputsUsed2, inputsUsed3 } = this.state;
    //input 1
    if (inputsUsed1 === undefined) {
      return this.setState({ inputsUsed1: { name: name, value: value } });
    }
    if (name === inputsUsed1.name) {
      return this.setState({ inputsUsed1: { name: name, value: value } });
    }
    //input 2
    if (name != inputsUsed1.name && inputsUsed2 === undefined) {
      return this.setState({ inputsUsed2: { name: name, value: value } });
    }
    if (name === inputsUsed2.name) {
      return this.setState({ inputsUsed2: { name: name, value: value } });
    }
    //input 3
    if (name != inputsUsed2.name && inputsUsed3 === undefined) {
      return this.setState({ inputsUsed3: { name: name, value: value } });
    }
    if (name === inputsUsed3.name) {
      return this.setState({ inputsUsed3: { name: name, value: value } });
    }
  }

  render() {
    const { inputsUsed1, inputsUsed2, inputsUsed3 } = this.state;
    const inputsAll = [inputsUsed1, inputsUsed2, inputsUsed3];
    const inputsToSend = inputsAll.filter((input) => input != undefined);

    const { productToShow } = this.state;
    let productDetail;
    if (productToShow === undefined) {
      productDetail = (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    } else {
      const { gallery, id, brand, name, attributes, prices, inStock } =
        productToShow;
      const outOfSotck = {
        cssClass: "PDP-out-of-stock",
        label: (
          <div className={`sign__out-of-stock display-flex`}>
            <p className="sign__out-of-stock--p">out of stock</p>
          </div>
        ),
      };
      if (inStock) {
        (outOfSotck.cssClass = ""), (outOfSotck.label = "");
      }
      productDetail = (
        <section className="product-detail-main-section">
          <article className={`imgs-gallery ${outOfSotck.cssClass}`}>
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
              {outOfSotck.label}
              <img
                src={gallery[0]}
                className="imgs-gallery__big-img"
                alt="product big image"
              ></img>
            </div>
          </article>
          <CartContext.Consumer>
            {({ bringInfo }) => {
              return (
                <form
                  onSubmit={(e) => this.addToCart(e, bringInfo)}
                  value={id}
                  className="product-detail__info"
                >
                  <h2 className="product-detail__brand">{brand}</h2>
                  <h2 className="product-detail__name">{name}</h2>

                  <div className="attributes-container">
                    <ProductDetailAttributesBox
                      attributes={attributes}
                      inputHandler={this.inputHandler}
                      instock={inStock}
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
                  {!inStock ? (
                    <OpenModalBtn
                      className="addToCartButton"
                      message="Sorry, this product is out of stock by now"
                      buttonText="add to cart"
                    />
                  ) : attributes.length !== inputsToSend.length ? (
                    <OpenModalBtn
                      className="addToCartButton"
                      message="You need to choose the product attributes before adding it to the cart"
                      buttonText="add to cart"
                    />
                  ) : (
                    <button className="addToCartButton" type="submit">
                      add to cart
                    </button>
                  )}
                  <div className="productDescription attributes-product-detail__description"></div>
                </form>
              );
            }}
          </CartContext.Consumer>
        </section>
      );
    }

    return <>{productDetail}</>;
  }
}

ProductDetail.propTypes = {
  id: PropTypes.string,
  products: PropTypes.array,
};

export default ProductDetail;
