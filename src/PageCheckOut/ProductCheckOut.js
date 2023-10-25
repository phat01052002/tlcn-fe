import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatter } from '../Store';

export default function ProductCheckOut({ productId, count }) {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get(`/guest/product/${productId}`).then((res) => setProduct(res.data));
    }, []);
    return (
        <div className="row product-checkout">
            <div className="col-4 img-product-checkout">
                <img src={product.image}></img>
            </div>
            <div className="col-5 inf-product">
                <label className="label-product-name">{product.name}</label>
                <label className="label-product-price">
                    {formatter.format(product.price)} x {count}
                </label>
            </div>
            <div className="col-3">
                <label className="total-price-product-checkout">{formatter.format(product.price * count)}</label>
            </div>
        </div>
    );
}
