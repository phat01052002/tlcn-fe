import { render } from '@testing-library/react';
import React, { useCallback, useEffect, useState } from 'react';
import { changeListCountProductCheckOut, changeListProductCheckOut, useStore } from '../Store';
import ProductCheckOut from './ProductCheckOut';

export default function ListProductCheckOut() {
    const [globalState, dispatch] = useStore();
    const { listCountProductCheckOut, listProductCheckOut } = globalState;
    const getProduct = () => {
        var listProduct = [];
        var listCount = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem('checkout')).length; i++) {
            listProduct = [...listProduct, JSON.parse(sessionStorage.getItem('checkout')).at(i).productId];
            listCount = [...listCount, JSON.parse(sessionStorage.getItem('checkout')).at(i).count];
        }
        dispatch(changeListCountProductCheckOut(listCount));
        dispatch(changeListProductCheckOut(listProduct));
    };
    useEffect(() => {
        getProduct();
    }, []);
    return (
        <div className="list-product-checkout">
            {listProductCheckOut.map((product, index) => (
                <ProductCheckOut productId={product} count={listCountProductCheckOut.at(index)} />
            ))}
        </div>
    );
}
