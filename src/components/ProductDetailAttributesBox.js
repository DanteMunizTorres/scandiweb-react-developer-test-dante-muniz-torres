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
    const attributes = this.props.attributes;
/*     console.log(
      "props.attributes----------------------------------------",
      attributes
    ); */
    let attributesBox;
    if (attributes) {
      attributesBox = (
        
          attributes.map((attribute, i) => {

            return <>
              <div key={attribute.name + i}>
                <h4>{attribute.name}</h4>
              </div>
              <div>

              {attribute.items.map((item, indx) => {
                if (attribute.id === "Color") {
                  return <div key={attribute.id + indx}>
                    <input type="radio" name={attribute.id} id={item.id} value={item.value} onChange={this.props.inputHandler} />
                    <label
                      style={{color: item.value, backgroundColor: item.value, border: "1px solid black"}}
                      htmlFor={item.id}
                    >
                      {item.displayValue}
                    </label>
                  </div>;
                } else {
                  return <div key={attribute.id + indx}>
                    <input type="radio" name={attribute.id} id={item.id + attribute.id} value={item.value} onChange={this.props.inputHandler} />
                    <label htmlFor={item.id + attribute.id} >{item.displayValue}</label>
                  </div>;
                }
              })}
              </div>
            </>;
          })
        
      );
    }

    return <>{attributesBox}</>;
  }
}

export default ProductDetailAttributesBox;
