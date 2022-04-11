import React, { Component } from "react";

import CurrencyContext from "./ContextCurrency";

import ProductDetailAttributesBox from "./ProductDetailAttributesBox";




class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      products: this.props.products,
      productToShow: {
        name: "loading...",
        brand: "loading...",
        prices: [{currency: {symbol: "loading..."}, amount: "loading..."}],
      },
      inputsUsed1: {},
      inputsUsed2: {},
      inputsUsed3: {},
    };
    this.addToCart = this.addToCart.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
  }

  componentDidMount() {
    
    const id = this.props.id;
    const products = this.props.products;
    let productToShow = products.find((product) => product.id === id);

    let productDescriptionDiv = document.querySelector(".productDescription");
    productDescriptionDiv.innerHTML = productToShow.description;

    this.setState({ products: products });
    this.setState({ productToShow: productToShow });
  }

  componentDidUpdate() {
    /* console.log('me actualice'); */
  }

  addToCart(e) {
    e.preventDefault()
    /* console.log(e) */
    let formData = new FormData()
    /* console.log('------------------------------------',this.state.id); */
    formData.append('productId', this.state.id)

    /* formData.append('productId', productToShow.id) */

/*     console.log('formData con id---------------------',formData);
    console.log('e.target-----------',e.target.name) */
  }



  inputHandler(e) {
    let target = e.target
    let name = target.name
    let value = target.value
    //input 1
    if (this.state.inputsUsed1.name === undefined) {
      return this.setState({ inputsUsed1: {name: name, value: value} })
    }
    if (name === this.state.inputsUsed1.name) {
      return this.setState({ inputsUsed1: {name: name, value: value} })
    }
    //input 2
    if (name != this.state.inputsUsed1.name && this.state.inputsUsed2.name === undefined) {
      return this.setState({ inputsUsed2: {name: name, value: value} })
    } 
    if (name === this.state.inputsUsed2.name) {
      return this.setState({ inputsUsed2: {name: name, value: value} })
    }
    //input 3
    if (name != this.state.inputsUsed2.name && this.state.inputsUsed3.name === undefined) {
      return this.setState({ inputsUsed3: {name: name, value: value} })
    } 
    if (name === this.state.inputsUsed3.name) {
      return this.setState({ inputsUsed3: {name: name, value: value} })
    }
  }

  


  render() {

    let productToShow = this.state.productToShow;

    console.log('input handler1---------------------', this.state.inputsUsed1);
    console.log('input handler2---------------------', this.state.inputsUsed2);
    console.log('input handler3---------------------', this.state.inputsUsed3);

    return (
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

          
          {<CurrencyContext.Consumer>
            {(currency) =>
                        <div>
                          <h4>Price:</h4>
                          <h3>{productToShow.prices[currency].currency.symbol}{productToShow.prices[currency].amount}</h3>
                      </div>
            }
          </CurrencyContext.Consumer>}
{/*           <input type={'radio'} name='test' value={1} onChange={this.inputHandler} />
          <input type={'radio'} name='test' value={2} onChange={this.inputHandler} />
          <input type={'radio'} name='test' value={3} onChange={this.inputHandler} />
          <input type={'radio'} name='test' value={4} onChange={this.inputHandler} /> */}

          <button type="submit">add to cart</button>
          <div className="productDescription"></div>
        </form>
      </section>
    );
  }
}

export default ProductDetail;

