import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
import React, { Component } from "react";

class ProductDetailAttributesBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributesChosen: false,
      isInCart: false

    };
  }

  componentDidMount() {
    //llamado a api
    this.setState({attributesChosen: this.props.attributesChosen})
    if (this.props.isInCart) {
      this.setState({isInCart: true})
    }
  }

  componentDidUpdate() {
    /* console.log('me actualice'); */
  }


  render() {
    const attributes = this.props.attributes;
    const attributesChosen = this.state.attributesChosen;

/*     let crux
    if (attributes && attributesChosen) {
      crux = attributes.find(atr => attributesChosen.find(chosen => chosen.name === atr.name))
    }

    console.log('crux------------------------------', crux); */



  

    /* let checked
    if(attributes.id === a) {

    } */

    /* console.log(
      "this.state.attributes----------------------------------------",
      this.state.attributes
    );

    console.log(
      "this.state.attributesChosen----------------------------------------",
      this.state.attributesChosen
    ); */



    let attributesBox;
      //if it's called inside Cart or Mini cart component
    if (attributes && this.state.isInCart === true){
      /* console.log('isincart_________________________',this.state.isInCart) */
      attributesBox = (      
        attributes.map((attribute, i) => {

          return <>
            <div key={attribute.name + i}>
              <h4>{attribute.name}</h4>
            </div>
            <div>

            {attribute.items.map((item, indx) => {

              let match = attributesChosen.find(atrb => atrb.value === item.value)
              /* console.log('match_____----------______', match) */
              if (attribute.id === "Color" && match !== undefined && item.value === match.value) {
                /* console.log('match_____-----IN FI-----______', match) */

                return <div key={attribute.id + indx}>
                  <input type="radio" name={attribute.id + this.props.id} id={item.id} value={match.value}  checked disabled />
                  <label
                    style={{color: item.value, backgroundColor: item.value, border: "1px solid black"}}
                    htmlFor={item.id}
                  >
                    {item.displayValue}
                  </label>
                </div>;
              }
              else if (attribute.id === "Color") {
               /*  console.log('if else************************', item.value) */
                return <div key={attribute.id + indx}>
                  <input type="radio" name={attribute.id + this.props.id} id={item.id} value={item.value} disabled />
                  <label
                    style={{color: item.value, backgroundColor: item.value, border: "1px solid black"}}
                    htmlFor={item.id}
                  >
                    {item.displayValue}
                  </label>
                </div>;
              } else {
                if ( match !== undefined && item.value === match.value) {
                  return <div key={attribute.id + indx}>
                  <input type="radio" name={attribute.id + this.props.id} id={item.id + attribute.id} value={item.value} checked disabled />
                  <label htmlFor={item.id + attribute.id} >{item.displayValue}</label>
                </div>;
                } else {
                  return <div key={attribute.id + indx}>
                    <input type="radio" name={attribute.id + this.props.id} id={item.id + attribute.id} value={item.value} disabled />
                    <label htmlFor={item.id + attribute.id} >{item.displayValue}</label>
                  </div>;
                }
              }
            })}
            </div>
          </>;
        })
      
    );
    //if it's called inside Product detail component
    } else if ( attributes ) {
      /* console.log('isincart_________________________',this.state.isInCart) */
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
