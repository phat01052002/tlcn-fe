import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { formatter } from '../Store';
import { HEADER_API } from '../Store/Contants';

export default function ProductCheckOut({ productId, count, rankUser }) {
    let percentRank = 1;
    if (rankUser == 'BRONZE') {
        percentRank = 0.99;
    }
    if (rankUser == 'SILVER') {
        percentRank = 0.98;
    }
    if (rankUser == 'GOLD') {
        percentRank = 0.97;
    }
    if (rankUser == 'PLATINUM') {
        percentRank = 0.96;
    }
    if (rankUser == 'DIAMOND') {
        percentRank = 0.95;
    }
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get(`${HEADER_API}/guest/product/${productId}`).then((res) => setProduct(res.data));
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
                            {product.discount
                                ? formatter.format(product.price - product.price * product.discount.percentDiscount)
                                : formatter.format(product.price)}
                            x {count}
                        </label>
                    </div>
                    <div className="col-3">
                        <label className="total-price-product-checkout">
                            {product.discount
                                ? formatter.format(
                                      (product.price * count -
                                          product.price * count * product.discount.percentDiscount) *
                                          percentRank,
                                  )
                                : formatter.format(product.price * count * percentRank)}
                        </label>
                        {percentRank == 1 ? null : <label className='rank-info'>- {Math.round((1 - percentRank) * 100)} %</label>}
                    </div>
                </>
            )}
        </div>
    );
}
