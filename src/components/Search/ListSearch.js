import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ProgressBar, TailSpin } from 'react-loader-spinner';
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
                axios.get(`/guest/product/containing/${inputSearch}`).then((res) => {
                    if(res.data==null){

                    }else{
                        setListProduct(res.data);
                    }
                });
            }
        }, 500);
    }, [inputSearch]);
    if (inputSearch) {
        return (
            <div className="list-search">
                {listProduct.length != 0 ? (
                    listProduct.map((product) => <ItemSearch key={product.productId} productSearch={product} />)
                ) : (
                    <div className="load-search">
                        <TailSpin
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                )}
            </div>
        );
    } else {
        return <div></div>;
    }
}
