import React, { Component } from "react";

import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.disappear = this.disappear.bind(this);
    this.modalDesapear = this.modalDesapear.bind(this);
  }

  disappear(e) {
    e.preventDefault();
    let modal = document.querySelector(".modal-container");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }
  modalDesapear(e) {
    e.preventDefault();
    let modal = document.querySelector(".modal-container");
    modal.style.display = "none";
  }

  render() {
    return (
      <section className="modal-container" onClick={this.disappear}>
        <article className="modal__message-container">
          <p className="modal__message">{this.props.message}</p>
          <button className="modal__ok-button" onClick={this.modalDesapear}>
            ok
          </button>
        </article>
      </section>
    );
  }
}

export default Modal;
