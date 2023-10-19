import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './css/Search.css';
import ItemSearch from './ItemSearch';
export default function ListSearch({ inputSearch }) {
    const [listProduct, setListProduct] = useState([]);
    //debounce by useRef var, when this components render, the current is clear, so the old timeOut is not exist
    const typingTimeoutRef = useRef(null);
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
    }
    // set new timeOut for the current and wait user stop type the keyboard
    useEffect(() => {
        typingTimeoutRef.current = setTimeout(() => {
            if (inputSearch) {
                axios
                .get(`/guest/product/containing/${inputSearch}`)
                .then((res) => setListProduct(res.data))
            }
        }, 500);
    }, [inputSearch]);
    if (inputSearch) {
        return (
            <div className="list-search">
                {listProduct.map((product) => (
                    <ItemSearch key={product.productId} productSearch={product} />
                ))}
            </div>
        );
    } else {
        return <div></div>;
    }
}
