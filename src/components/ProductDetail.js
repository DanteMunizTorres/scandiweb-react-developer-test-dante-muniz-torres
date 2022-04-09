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
    };
  }

  componentDidMount() {
    //llamado a api
    const id = this.props.id;
    const products = this.props.products;
    let productToShow = products.find((product) => product.id === id);



    let productDescriptionDiv = document.querySelector(".productDescription");
    productDescriptionDiv.innerHTML = productToShow.description;

    this.setState({ productToShow: productToShow });
    this.setState({ products: products });
  }

  componentDidUpdate() {
    /* console.log('me actualice'); */
  }

  render() {
    let productToShow = this.state.productToShow;
    console.log(
      "atrubites---------------------------",
      productToShow.attributes
    );
    return (
      <section>
        <article>
          <div>litle imgs</div>
          <div>
            <img alt="product-img-big"></img>
          </div>
        </article>

        <form>
          <h2>{productToShow.brand}</h2>
          <h2>{productToShow.name}</h2>

          <ProductDetailAttributesBox attributes={productToShow.attributes} />

          {console.log(productToShow)}
          {<CurrencyContext.Consumer>
            {(currency) =>
                        <div>
                          <h4>Price:</h4>
                          <h3>{productToShow.prices[currency].currency.symbol}{productToShow.prices[currency].amount}</h3>
                      </div>
            }
          </CurrencyContext.Consumer>}
          

          <button>add to cart</button>
          <div className="productDescription"></div>
        </form>
      </section>
    );
  }
}

export default ProductDetail;

/* function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}

<input type="checkbox" name="check" onclick="onlyOne(this)">
<input type="checkbox" name="check" onclick="onlyOne(this)">
<input type="checkbox" name="check" onclick="onlyOne(this)">
<input type="checkbox" name="check" onclick="onlyOne(this)"></input> */
