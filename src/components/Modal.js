import React, { Component } from 'react'


import './Modal.css'

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.disappear = this.disappear.bind(this)
    this.modalDesapear = this.modalDesapear.bind(this)
    
  }

  componentDidMount () {
    let cartForm = document.querySelector('.cart')
  }

  componentDidUpdate () {
    /* console.log('me actualice'); */
  }

  disappear(e) {
    e.preventDefault()
    let modal = document.querySelector('.modal-container')
    if(e.target === modal) {
      modal.style.display = 'none'
    }
  }
  modalDesapear(e) {
    e.preventDefault()
    let modal = document.querySelector('.modal-container')
    modal.style.display = 'none'
    }

  render () {

/*     const openEls = document.querySelectorAll("[data-open]");
    const isVisible = "is-visible";
 
    for(const el of openEls) {
      el.addEventListener("click", function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
      });
    }
 */

    return (
      <section 
        className='modal-container'
        onClick={this.disappear} 
      >
        <article className='modal__message-container'>
          <p className='modal__message'>{this.props.message}</p>
          <button className='modal__ok-button' onClick={this.modalDesapear}>ok</button>
        </article>
      </section>
    );

  }
}

export default Modal;