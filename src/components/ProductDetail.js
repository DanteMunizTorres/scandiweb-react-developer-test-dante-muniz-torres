import React, { Component } from "react";
import { Navigate } from 'react-router-dom'
import CurrencyContext from "./ContextCurrency";
import ProductDetailAttributesBox from "./ProductDetailAttributesBox";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      products: this.props.products,
      productToShow: undefined,
      inputsUsed1: undefined,
      inputsUsed2: undefined,
      inputsUsed3: undefined,
      navigate: false
    }; 
    this.addToCart = this.addToCart.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
  }

  componentDidMount() {    
    const id = this.props.id;
    const products = this.props.products;
    let productToShow = products.find((product) => product.id === id);
    this.setState({ productToShow: productToShow });   
/*     if(document.querySelector(".productDescription")) {
      let productDescriptionDiv = document.querySelector(".productDescription");
      productDescriptionDiv.innerHTML = productToShow.description;
    } */
  }
  
  componentDidUpdate() {
    if(document.querySelector(".productDescription")) {
      let productDescriptionDiv = document.querySelector(".productDescription");
      productDescriptionDiv.innerHTML = this.state.productToShow.description;
    }
  }

  addToCart(e) {
    e.preventDefault()
    let input1 = this.state.inputsUsed1
    let input2 = this.state.inputsUsed2
    let input3 = this.state.inputsUsed3

    let inputsAll = [ input1, input2, input3 ]
    let inputsToSend = inputsAll.filter(input => input != undefined)
    
    let sendToCart = {
      id: this.state.id,
      info: inputsToSend
    }    
    //lifting info to App.js
    this.props.bringInfo(sendToCart) 

    return this.setState({navigate: true}) 
  }

  inputHandler(e) {
    let target = e.target
    let name = target.name
    let value = target.value
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
      <section>
        <article>
          <div>litle imgs</div>
          <div>
            <img alt="product-img-big"></img>
          </div>
        </article>

        <form onSubmit={this.addToCart} value={productToShow.id}>
          <h2>{productToShow.brand}</h2>
          <h2 value={productToShow.id} name='productId'>{productToShow.name}</h2>

        <div>
          <ProductDetailAttributesBox attributes={productToShow.attributes} inputHandler={this.inputHandler} />
        </div>
          <CurrencyContext.Consumer>
            {(value) =>
                        <div>
                          {console.log('valueeee----------------------',value)}
                          {console.log('prices----------------------',productToShow.prices)}
                          <h4>Price:</h4>
                          <h3>{productToShow.prices[value].currency.symbol}{productToShow.prices[value].amount}</h3>
                      </div>
            }
          </CurrencyContext.Consumer>
          <button type="submit">add to cart</button>
          <div className="productDescription"></div>
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

