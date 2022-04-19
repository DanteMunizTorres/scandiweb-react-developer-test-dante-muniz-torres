import React, { Component } from "react";
import { Navigate } from 'react-router-dom'
import CurrencyContext from "./ContextCurrency";
import ProductDetailAttributesBox from "./ProductDetailAttributesBox";

import './ProductDetail.css'

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productToShow: undefined,
      inputsUsed1: undefined,
      inputsUsed2: undefined,
      inputsUsed3: undefined,
      navigate: false
    }; 
    this.addToCart = this.addToCart.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
    this.showBig = this.showBig.bind(this)
  }

  componentDidMount() {    
    const id = this.props.id;
    const products = this.props.products;
    let productToShow = products.find((product) => product.id === id);
    this.setState({ productToShow: productToShow });   
  }
  
  componentDidUpdate() {
    if(document.querySelector(".productDescription")) {
      let productDescriptionDiv = document.querySelector(".productDescription");
      productDescriptionDiv.innerHTML = this.state.productToShow.description;
    }

    if (document.querySelector('.imgs-gallery__mini-img-container')) {
      if (this.state.productToShow.gallery.length < 2) {
        document.querySelector('.imgs-gallery__mini-img-container').style.display = 'none'
      }

    }
  }

  showBig(e) {
    let bigImg = document.querySelector('.imgs-gallery__big-img')
    bigImg.src = e.target.src
  }

  addToCart(e) {
    e.preventDefault()
    let input1 = this.state.inputsUsed1
    let input2 = this.state.inputsUsed2
    let input3 = this.state.inputsUsed3

    let inputsAll = [ input1, input2, input3 ]
    let inputsToSend = inputsAll.filter(input => input != undefined)
    
    let sendToCart = {
      id: this.props.id,
      quantity: 1,
      info: inputsToSend,
    }    
    //lifting info to App.js
    this.props.bringInfo(sendToCart) 

    return this.setState({navigate: true}) 
  }

  inputHandler(e) {
    let target = e.target
    let name = target.name
    let value = target.value

    console.log('value: ', value, '   name:   ', name);
    //input 1
    if (this.state.inputsUsed1 === undefined) {
      return this.setState({ inputsUsed1: {name: name, value: value} })
    }
    if (name === this.state.inputsUsed1.name) {
      return this.setState({ inputsUsed1: {name: name, value: value} })
    }
    //input 2
    if (name != this.state.inputsUsed1.name && this.state.inputsUsed2 === undefined) {
      return this.setState({ inputsUsed2: {name: name, value: value} })
    } 
    if (name === this.state.inputsUsed2.name) {
      return this.setState({ inputsUsed2: {name: name, value: value} })
    }
    //input 3
    if (name != this.state.inputsUsed2.name && this.state.inputsUsed3 === undefined) {
      return this.setState({ inputsUsed3: {name: name, value: value} })
    } 
    if (name === this.state.inputsUsed3.name) {
      return this.setState({ inputsUsed3: {name: name, value: value} })
    }
  }

  render() {

    if(this.state.navigate === true) {
      return <Navigate to='/' replace={true} />
    } 

    let productToShow = this.state.productToShow;
    



    let productDetail
    if (this.state.productToShow === undefined) {
      productDetail = <div><h3>Loading...</h3></div>
    } else {
      productDetail =
      <section className="product-detail-main-section">
        <article className="imgs-gallery">
          <div className="imgs-gallery__mini-img-container">
            {productToShow.gallery.map((img, i) => {
               return <img  src={img} key={img + i} className='imgs-gallery__mini-img' alt="product little image" onClick={this.showBig} ></img>
            })}
          </div>
          <div className="imgs-gallery__big-img-container">
            <img src={productToShow.gallery[0]} className='imgs-gallery__big-img' alt="product big image"></img>
          </div>
        </article>

        <form 
          onSubmit={this.addToCart} 
          value={productToShow.id}
          className='product-detail__info'
        >
          <h2 className="product-detail__brand">{productToShow.brand}</h2>
          <h2 className="product-detail__name">{productToShow.name}</h2>

        <div className="attributes-container">
          <ProductDetailAttributesBox attributes={productToShow.attributes} inputHandler={this.inputHandler} />
        </div>
          <CurrencyContext.Consumer>
            {(value) =>
                        <div>
                          <h4 className="attributes-price-title">PRICE:</h4>
                          <h3 className="attributes-price-number">{productToShow.prices[value].currency.symbol}{productToShow.prices[value].amount}</h3>
                      </div>
            }
          </CurrencyContext.Consumer>
          <button className="addToCartButton" type="submit">ADD TO CART</button>
          <div className="productDescription attributes-product-detail__description"></div>
        </form>
      </section>
    }



    return (
      <>
        {productDetail}
      </>
    );

  }
}

export default ProductDetail;

