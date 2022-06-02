import React from "react"
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux'
import { show_true } from "../../redux/features/modal/modalSlice";

function OpenModalBtn ({ message, buttonText, className, otherFunction1, otherFunction2 }) {
  const dispatch = useDispatch()

  function showNow() {
    dispatch(show_true(message))
    if (otherFunction1) {
      otherFunction1()
    }
    if (otherFunction2) {
      otherFunction2()
    }
  }

  return <>
    <button 
      type="button"
      className={className} 
      onClick={()=>showNow()}
    >
      {buttonText}
    </button>
    </>
}

/* export function OpenModalFunc(message) {
  const dispatch = useDispatch()
  dispatch(show_true(message))
} */


export { OpenModalBtn }

OpenModalBtn.propTypes = {
  message: PropTypes.string,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  otherFunction1: PropTypes.func,
  otherFunction2: PropTypes.func
};