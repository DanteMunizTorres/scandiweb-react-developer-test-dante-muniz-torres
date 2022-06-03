import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import "./Modal.css";

import { show_false } from "../redux/features/modal/modalSlice";
import { useSelector, useDispatch } from 'react-redux'

function ModalRedux ({children}) {
  const { show } = useSelector(state => state.modal)
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
  }

  render() {
    return (
      <ModalRedux>
        <section className="modal-container">
          <article className="modal__message-container">
            <ModalMessage />
            <CloseModalBtn />
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
