import React from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";

import ProductDetail from "./ProductDetail";

function GetParamsId(props) {
  const { id } = useParams();
  const { products, bringInfo, showModal} = props
  return (
    <div>
      <ProductDetail
        id={id}
        products={products}
        bringInfo={bringInfo}
        showModal={showModal}
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
