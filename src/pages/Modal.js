import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import "./Modal.css";

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.disappear = this.disappear.bind(this);
    this.modalDesapear = this.modalDesapear.bind(this);
  }

  disappear(e) {
    e.preventDefault();
    const modal = document.querySelector(".modal-container");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }
  modalDesapear(e) {
    e.preventDefault();
    const modal = document.querySelector(".modal-container");
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

Modal.propTypes = {
  message: PropTypes.string
};

export default Modal;
