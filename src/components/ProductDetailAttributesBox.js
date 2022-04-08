import React, { Component } from "react";



class ProductDetailAttributesBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //llamado a api
  }

  componentDidUpdate() {
    /* console.log('me actualice'); */
  }

  render() {

    

    const attributes = this.props.attributes
    let attributesBox
    if (attributes) {
      attributesBox =
      attributes.map((attribute, i) => {
        return (
        <div key={i}>
          <h4>{attribute.id}</h4>
          <div>
            {attribute.map((item, i) => {
              return (
                <input type="checkbox" />
              )
            })}
          </div>
        </div>
        )
      })
    } else {
      attributesBox = ''
    }

    return (
          <div>
            <h4>size:</h4>
            <div>
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
            </div>
          </div>
    );
  }
}

export default ProductDetailAttributesBox;