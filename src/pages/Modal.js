import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import "./Modal.css";

import { show_false } from "../redux/features/modal/modalSlice";
import { useSelector, useDispatch } from 'react-redux'

function ModalRedux ({children}) {
  const { show } = useSelector(state => state.modal)
  console.log('SHOW MODAL?  ', show);
  return <>
    {show &&
      <div>
        {children}
      </div>
    }
    </>
}

function CloseModalBtn () {
  const dispatch = useDispatch()
  return <>
      <button className="modal__ok-button" onClick={()=>dispatch(show_false())}>
        ok
      </button>
    </>
}

function ModalMessage () {
  const { message } = useSelector(state => state.modal)
  return <>
    <p className="modal__message">{ message }</p>
  </>
}


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
      <ModalRedux>
        <section className="modal-container" onClick={this.disappear}>
          <article className="modal__message-container">
            <ModalMessage />
            {/* <p className="modal__message">{this.props.message}</p> */}
            <CloseModalBtn />
{/*             <button className="modal__ok-button" onClick={this.modalDesapear}>
              ok
            </button> */}
            
          </article>
        </section>
      </ModalRedux>
    );
  }
}

Modal.propTypes = {
  message: PropTypes.string,
  children: PropTypes.element
};

ModalRedux.propTypes = {
  children: PropTypes.element
};

export default Modal;
