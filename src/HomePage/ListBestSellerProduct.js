import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../components/Product/Product';
import { HEADER_API } from '../Store/Contants';

export default function ListBestSellerProduct() {
    const [listProductBestSeller, setListProductBestSeller] = useState([]);
    useEffect(() => {
        axios.get(`${HEADER_API}/guest/product/top8Product`).then((res) => {
            if (res.data == null) {
                window.location = '/';
            }
            setListProductBestSeller(res.data);
        });
    }, []);
    return (
        <div>
            {listProductBestSeller.map((product) => (
                <Product key={product.productId} product={product} type={'hot'} />
            ))}
        </div>
    );
}
