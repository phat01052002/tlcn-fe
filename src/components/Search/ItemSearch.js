import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ItemSearch({ key, productSearch }) {
    const naviga = useNavigate();
    const handleClickProductSearch = useCallback((e) => {
        var nav = `/productdetail/${productSearch.productId}`;
        naviga(nav);
        window.location.reload();
    }, []);
    return (
        <div className="product-search" onClick={handleClickProductSearch}>
            <span>
                <img src={productSearch.imageProducts[0].image}></img>
                <label>{productSearch.name}</label>
            </span>
        </div>
    );
}
