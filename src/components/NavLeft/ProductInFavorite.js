import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ProductInFavorite(favorite) {
    const [productFavorite, setProductFavorite] = useState([]);
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `/user/productByFavorite/${favorite.favorite.favoriteId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('USER')).token}`,
            },
        };

        axios
            .request(config)
            .then((response) => {
                setProductFavorite(response.data);
            })
            .catch(() => {});
    }, []);
    return <div>{productFavorite.name}</div>;
}
