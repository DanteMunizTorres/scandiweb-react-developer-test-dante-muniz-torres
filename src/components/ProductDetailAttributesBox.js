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
    console.log(
      "props.attributes----------------------------------------",
      attributes
    );
    let attributesBox;
    if (attributes) {
      attributesBox = (
        
          attributes.map((attribute, i) => {

            return <>
              <div key={i}>
                <h4>{attribute.name}</h4>
              </div>

              {attribute.items.map((item, i) => {
                if (attribute.id === "Color") {
                  return <div>
                    <input type="radio" name={attribute.id} id={item.id}/>
                    <label
                      style={{color: item.value, backgroundColor: item.value, border: "1px solid black"}}
                      htmlFor={item.id}
                    >
                      {item.displayValue}
                    </label>
                  </div>;
                } else {
                  return <div>
                    <input type="radio" name={attribute.id} id={item.id + attribute.id} />
                    <label htmlFor={item.id + attribute.id} >{item.displayValue}</label>
                  </div>;
                }
              })}
            </>;
          })
        
      );
    }

    return <>{attributesBox}</>;
  }
}

export default ProductDetailAttributesBox;
