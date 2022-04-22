import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'



import ProductList from './ProductList';
import CartTinyView from './CartTinyView'
import CurrencySwitcher from './CurrencySwitcher'
import Cart from './Cart'
import GetParamsId from './GetParamsId';
import Modal from './Modal';


import './Main.css'




class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productDetail: '',
      productsInCart: [],
      message: 'Ups, somthing is wrong...'
    }
    this.showModal = this.showModal.bind(this)
  }


  showModal(e, message) {
    e.preventDefault()
/*     let modal = document.querySelector('.modal')
    modal.style.display = 'none' */

    let checkOutModal = document.querySelector('.modal-container')
    checkOutModal.style.display = 'flex'

    return this.setState({message: message})
  }


render () {


    return (
      
      <main className='main'>
        <Modal message={this.state.message} />
        <CurrencySwitcher 
          changeCurrency={this.props.changeCurrency} 
          currencies={this.props.currencies} 
        />
        {/* <h2 className='main__title'>{this.props.category.toUpperCase()}</h2> */}
        <CartTinyView 
          productsList={this.props.productList} 
          manageQuantity={this.props.manageQuantity} 
          showModal={this.showModal}
        />
      <Routes>
        <Route path='/' exact={true} element={ <ProductList products={this.props.productList} bringInfo={this.props.bringInfo} category={this.props.category} />} />
        <Route path='/cart' exact={true} element={ <Cart productsList={this.props.productList} manageQuantity={this.props.manageQuantity} />} />
        <Route path='/detail/:id' exact={true} element={ <GetParamsId products={this.props.productList} bringInfo={this.props.bringInfo} showModal={this.showModal} />} />
        
      </Routes>
      </main>
      
    );

  }
}

export default Main;



