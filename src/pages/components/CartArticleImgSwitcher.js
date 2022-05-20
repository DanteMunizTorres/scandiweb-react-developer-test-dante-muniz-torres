import  React, { Component } from "react";
import PropTypes from 'prop-types';

import "./CartArticleSwitcher.css";

/* import arrowLeft from '../../icons/arrowLeft.svg'
import arrowRight from '../../icons/arrowRight.svg' */

class CartArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryImgIndex: 0,
      articleIsInCart: false
    };
    this.changePhotoUp = this.changePhotoUp.bind(this)
    this.changePhotoDown = this.changePhotoDown.bind(this)
  }

  componentDidMount() {
    this.setState({articleIsInCart: this.props.articleIsInCart})
  }

  changePhotoUp(){
    const { galleryImgIndex } = this.state
    const lastPhotoIndex = this.props.gallery.length - 1;
    if (galleryImgIndex === lastPhotoIndex) {
      const FIRST_PHOTO_INDEX = 0;
      return this.setState({galleryImgIndex: FIRST_PHOTO_INDEX })
    }
    this.setState({galleryImgIndex: galleryImgIndex + 1})
  }
  changePhotoDown(){
    const { galleryImgIndex } = this.state
    if (galleryImgIndex === 0) {
      const lastPhotoIndex = this.props.gallery.length - 1;
      return this.setState({galleryImgIndex: lastPhotoIndex})
    }
    this.setState({galleryImgIndex: galleryImgIndex -1})
  }

  render() {
    const { galleryImgIndex: index, articleIsInCart } = this.state
    const { gallery } = this.props
    
    let showSwitchButtons = ''
    if (articleIsInCart && gallery.length > 1) {
      showSwitchButtons = 'show-switch-buttons'
    }

    return (
      <div className="cart-article__img-wrapper">
      <img
        src={gallery[index]}
        className="cart-article__img"
        alt="product"
      ></img>
      <div className={`cart-article__img-switch-buttons-container ${showSwitchButtons}`} >
        <button type="button" className="cart-article__img-switch-buttons" onClick={this.changePhotoDown}>
          <div className="arrow-left"></div>
        </button>
        <button type="button" className="cart-article__img-switch-buttons" onClick={this.changePhotoUp}>
          <div className="arrow-right"></div>
        </button>
      </div>
    </div>
    );
  }
}

CartArticle.propTypes = {
  gallery: PropTypes.array,
  articleIsInCart: PropTypes.bool,
};


export default CartArticle;
