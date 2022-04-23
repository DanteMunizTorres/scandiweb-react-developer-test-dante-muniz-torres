import React, { Component } from "react";

import "./ProductDetailAttributesBox.css";

class ProductDetailAttributesBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributesChosen: false,
      isInCart: false,
    };
  }

  componentDidMount() {
    this.setState({ attributesChosen: this.props.attributesChosen });
    if (this.props.isInCart) {
      this.setState({ isInCart: true });
    }
  }

  render() {
    const attributes = this.props.attributes;
    const attributesChosen = this.state.attributesChosen;

    let attributesBox;
    //if it's called inside Cart or Mini cart component
    if (attributes && this.state.isInCart === true) {
      attributesBox = attributes.map((attribute, i) => {
        return (
          <div key={attribute.name + i} className="in-cart-attributes-main-box">
            <div>
              <h4 className="in-cart-attributes-title">{attribute.name}</h4>
            </div>

            <div className="attributes-boxes-wrapper">
              {attribute.items.map((item, indx) => {
                // find checked input
                let match = attributesChosen.find(
                  (atrb) =>
                    atrb.value === item.value && atrb.name === attribute.id
                );
                // swatch attributes (color)
                if ( attribute.id === "Color" && match !== undefined && item.value === match.value) {
                  return (
                    <div key={attribute.id + indx}>
                      <input
                        className="display-none"
                        type="radio"
                        name={attribute.id + this.props.id}
                        id={item.id}
                        value={match.value}
                        checked
                        disabled
                      />
                      <label
                        className="minicart-attributes__input-label color-input__checked"
                        style={{
                          color: item.value,
                          backgroundColor: item.value,
                        }}
                        htmlFor={item.id}
                      ></label>
                    </div>
                  );
                }
                //attributes with color value
                else if (attribute.id === "Color") {
                  return (
                    <div key={attribute.id + indx}>
                      <input
                        className="display-none"
                        type="radio"
                        name={attribute.id + this.props.id}
                        id={item.id}
                        value={item.value}
                        disabled
                      />
                      <label
                        className="minicart-attributes__input-label color-input__not-checked"
                        style={{
                          color: item.value,
                          backgroundColor: item.value,
                        }}
                        htmlFor={item.id}
                      ></label>
                    </div>
                  );
                } else {
                  // Not swatch attributes, find checked input
                  if (match !== undefined && item.value === match.value) {
                    return (
                      <div key={attribute.id + indx}>
                        <input
                          className="display-none"
                          type="radio"
                          name={attribute.id + this.props.id}
                          id={item.id + attribute.id}
                          value={item.value}
                          checked
                          disabled
                        />
                        <label
                          className="minicart-attributes__input-label input__checked"
                          htmlFor={item.id + attribute.id}
                        >
                          {item.displayValue}
                        </label>
                      </div>
                    );
                  } else {
                    // all other inputs
                    return (
                      <div key={attribute.id + indx}>
                        <input
                          className="display-none"
                          type="radio"
                          name={attribute.id + this.props.id}
                          id={item.id + attribute.id}
                          value={item.value}
                          disabled
                        />
                        <label
                          className="minicart-attributes__input-label input__not-checked"
                          htmlFor={item.id + attribute.id}
                        >
                          {item.displayValue}
                        </label>
                      </div>
                    );
                  }
                }
              })}
            </div>
          </div>
        );
      });
      //if it's called inside Product detail component
    } else if (attributes) {
      attributesBox = attributes.map((attribute, i) => {
        return (
          <div key={attribute.name + i}>
            <div>
              <h4 className="attributes-title">
                {attribute.name.toUpperCase()}
              </h4>
            </div>

            <div className="attributes-boxes-wrapper">
              {attribute.items.map((item, indx) => {
                if (attribute.id === "Color") {
                  return (
                    <div key={attribute.id + indx}>
                      <label
                        /* htmlFor={item.id + attribute.id} */
                        className="product-detail__input-label"
                        style={{
                          color: item.value,
                          backgroundColor: item.value,
                        }}
                      >
                        <input
                          id={item.id + attribute.id}
                          className="display-none product-detail__input input-color"
                          type="radio"
                          name={attribute.id}
                          value={item.value}
                          onChange={this.props.inputHandler}
                        />
                      </label>
                    </div>
                  );
                } else {
                  return (
                    <div key={attribute.id + indx}>
                      <label
                        /* htmlFor={item.id + attribute.id}  */
                        className="product-detail__input-label"
                      >
                        {item.displayValue}
                        <input
                          id={item.id + attribute.id}
                          className="display-none product-detail__input input-not-color"
                          type="radio"
                          name={attribute.id}
                          value={item.value}
                          onChange={this.props.inputHandler}
                        />
                      </label>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      });
    }
    return <>{attributesBox}</>;
  }
}

export default ProductDetailAttributesBox;
