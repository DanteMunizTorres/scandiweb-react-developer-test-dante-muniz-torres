import React from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";

import ProductDetail from "./ProductDetail";

function GetParamsId(props) {
  const { id } = useParams();

  return (
    <div>
      <ProductDetail
        id={id}
        products={props.products}
        bringInfo={props.bringInfo}
        showModal={props.showModal}
      />
    </div>
  );
}

GetParamsId.propTypes = {
  products: PropTypes.array,
  bringInfo: PropTypes.func,
  showModal: PropTypes.func,
};

export default GetParamsId;
