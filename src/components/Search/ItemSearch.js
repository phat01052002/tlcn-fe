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
            {productSearch.name}
        </div>
    );
}
