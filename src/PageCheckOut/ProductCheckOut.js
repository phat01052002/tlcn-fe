import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { formatter } from '../Store';

export default function ProductCheckOut({ productId, count }) {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get(`/guest/product/${productId}`).then((res) => setProduct(res.data));
    }, []);
    return (
        <div className="row product-checkout">
            {product.length == 0 ? (
                <>
                    <div className="col-6"></div>
                    <div className="col-1">
                        <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                    </div>
                    <div className="col-5"></div>
                </>
            ) : (
                <>
                    <div className="col-4 img-product-checkout">
                        <img src={product.imageProducts[0].image}></img>
                    </div>
                    <div className="col-5 inf-product">
                        <label className="label-product-name">{product.name}</label>
                        <label className="label-product-price">
                            {formatter.format(product.price)} x {count}
                        </label>
                    </div>
                    <div className="col-3">
                        <label className="total-price-product-checkout">
                            {formatter.format(product.price * count)}
                        </label>
                    </div>
                </>
            )}
        </div>
    );
}
