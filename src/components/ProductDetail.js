import React, { Component } from "react";

import ProductDetailAttributesBox from "./ProductDetailAttributesBox";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      products: this.props.products,
      productToShow: {
        name: 'loading...',
        brand: 'loading...',
      }
    };
  }

  componentDidMount() {
    //llamado a api
    const id = this.props.id
    const products = this.props.products
    let productToShow = products.find(product => product.id === id)

    console.log('atrubites---------------------------',productToShow.attributes);


    this.setState({productToShow: productToShow})
    this.setState({products: products})
  }

  componentDidUpdate() {
    /* console.log('me actualice'); */
  }

  render() {


    let productToShow = this.state.productToShow
    

    



    return (
      <section>
        <article>
          <div>litle imgs</div>
          <div>
            <img alt="product-img-big"></img>
          </div>
        </article>
        <article>
          <h2>{productToShow.brand}</h2>
          <h2>{productToShow.name}</h2>

          <ProductDetailAttributesBox atributes={productToShow.attributes} />

          <div>
            <h4>price:</h4>
            <h3>xxxxx</h3>
          </div>
          <button>add to cart</button>
          <p>
            description description description description description
            description description description description description
            description description description description description
            description description description description description
            description description description
          </p>
        </article>
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