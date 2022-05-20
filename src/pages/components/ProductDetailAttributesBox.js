import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import "./ProductDetailAttributesBox.css";

class ProductDetailAttributesBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      attributesChosen: false,
      isInCart: false,
    };
  }

  componentDidMount() {
    const { isInCart, attributesChosen } = this.props
    this.setState({ attributesChosen: attributesChosen });
    if (isInCart) {
      this.setState({ isInCart: true });
    }
  }

  render() {
    const { attributesChosen, isInCart } = this.state
    const { attributes, inStock } = this.props
    let cursorPointerNot = ''
    if(!inStock) {cursorPointerNot = 'cursor-pointer-not'} 

    let attributesBox;
    //if it's called inside Cart or Mini cart component
    if (attributes && isInCart === true) {
      const { id: productId } = this.props
      attributesBox = attributes.map(( {name, items, id}, i ) => {
        return (
          <div key={name + i} className="in-cart-attributes-main-box">
            <div>
              <h4 className="in-cart-attributes-title">{name}</h4>
            </div>

            <div className="attributes-boxes-wrapper">
              {items.map(({ value, id: itemId, displayValue}, indx) => {
                // find checked input
                const match = attributesChosen.find(
                  (atrb) =>
                    atrb.value === value && atrb.name === id
                );
                // swatch attributes (color)
                if ( id === "Color" && match !== undefined && value === match.value) {
                  return (
                    <div key={id + indx}>
                      <input
                        className="display-none"
                        type="radio"
                        name={id + productId}
                        id={itemId}
                        value={match.value}
                        checked
                        disabled
                      />
                      <label
                        className="minicart-attributes__input-label color-input__checked"
                        style={{
                          color: value,
                          backgroundColor: value,
                        }}
                        htmlFor={itemId}
                      ></label>
                    </div>
                  );
                }
                //attributes with color value
                else if (id === "Color") {
                  return (
                    <div key={id + indx}>
                      <input
                        className="display-none"
                        type="radio"
                        name={id + productId}
                        id={itemId}
                        value={value}
                        disabled
                      />
                      <label
                        className="minicart-attributes__input-label color-input__not-checked"
                        style={{
                          color: value,
                          backgroundColor: value,
                        }}
                        htmlFor={itemId}
                      ></label>
                    </div>
                  );
                } else {
                  // Not swatch attributes, find checked input
                  if (match !== undefined && value === match.value) {
                    return (
                      <div key={id + indx}>
                        <input
                          className="display-none"
                          type="radio"
                          name={id + productId}
                          id={itemId + id}
                          value={value}
                          checked
                          disabled
                        />
                        <label
                          className="minicart-attributes__input-label input__checked"
                          htmlFor={itemId + id}
                        >
                          {displayValue}
                        </label>
                      </div>
                    );
                  } else {
                    // all other inputs
                    return (
                      <div key={id + indx}>
                        <input
                          className="display-none"
                          type="radio"
                          name={id + productId}
                          id={itemId + id}
                          value={value}
                          disabled
                        />
                        <label
                          className="minicart-attributes__input-label input__not-checked"
                          htmlFor={itemId + id}
                        >
                          {displayValue}
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
      const {inputHandler} = this.props
      attributesBox = attributes.map(( {name, items, id}, i ) => {
        return (
          <div key={name + i}>
            <div>
              <h4 className="attributes-title">
                {name.toUpperCase()}
              </h4>
            </div>

            <div className="attributes-boxes-wrapper">
              {items.map(( { value, id: itemId, displayValue}, indx) => {
                if (id === "Color") {
                  return (
                    <div key={id + indx}>
                      <label
                        /* htmlFor={itemId + attribute.id} */
                        className={`product-detail__input-label ${cursorPointerNot}`}
                        style={{
                          color: value,
                          backgroundColor: value,
                        }}
                      >
                        {inStock? (
                          <input
                            id={itemId + id}
                            className="display-none product-detail__input input-color"
                            type="radio"
                            name={id}
                            value={value}
                            onChange={inputHandler}
                            inStock
                          />
                        ) : (
                          <input
                          id={itemId + id}
                          className="display-none product-detail__input input-color"
                          type="radio"
                          name={id}
                          value={value}
                          disabled
                        />
                        )}
                      </label>
                    </div>
                  );
                } else {
                  return (
                    <div key={id + indx}>
                      <label
                        /* htmlFor={itemId + attribute.id}  */
                        className={`product-detail__input-label ${cursorPointerNot}`}
                      >
                        {displayValue}
                        {inStock? (
                          <input
                            id={itemId + id}
                            className="display-none product-detail__input input-not-color"
                            type="radio"
                            name={id}
                            value={value}
                            onChange={inputHandler}
                          />
                        ) : (
                          <input
                          id={itemId + id}
                          className="display-none product-detail__input input-not-color"
                          type="radio"
                          name={id}
                          value={value}
                          disabled
                        />
                        )}
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

ProductDetailAttributesBox.propTypes = {
  id: PropTypes.number,
  isInCart: PropTypes.bool,
  attributes: PropTypes.array,
  attributesChosen: PropTypes.array,
  inputHandler: PropTypes.func,
  inStock: PropTypes.bool
};

export default ProductDetailAttributesBox;
