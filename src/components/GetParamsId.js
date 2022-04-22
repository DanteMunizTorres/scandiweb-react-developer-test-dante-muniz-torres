import React from 'react';
import {useParams} from "react-router-dom";

import ProductDetail from './ProductDetail';

function GetParamsId(props) {

    const { id } = useParams();

    return (
        <div>
            <ProductDetail id={id} products={props.products} bringInfo={props.bringInfo} showModal={props.showModal} />
        </div>
    );
}

export default GetParamsId;