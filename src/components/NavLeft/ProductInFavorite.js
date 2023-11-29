import axios from 'axios';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import {
    addLoad,
    changeListFavorite,
    changeNumberFavorite,
    changeProductUnlike,
    formatter,
    removeLoad,
    useStore,
} from '../../Store';
export default function ProductInFavorite(favorite) {
    const [globalState, dispatch] = useStore();
    const { user, productUnlike } = globalState;
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
    }, [favorite]);
    //delete
    const handleClickDeleteProductFavorite = useCallback(async (user, productId, productUnlike) => {
        if (user.length != 0) {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let configPost = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `/user/deleteFavorite/${user.userId}/${productId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            addLoad();
            await axios.request(configPost).catch();
            try {
                const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `/user/favoriteByUser/${user.userId}`,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
                await axios
                    .request(config)
                    .then((res) => {
                        dispatch(changeNumberFavorite(res.data.length));
                        dispatch(changeListFavorite(res.data));
                        dispatch(changeProductUnlike([...productUnlike, productId]));
                    })
                    .catch();
                removeLoad();
            } catch {
                window.location = '/login';
            }
        }
    }, []);
    //
    const handleCLickProductNameFavorite = useCallback((productId) => {
        window.location = `/productDetail/${productId}`;
    }, []);
    return (
        <div className="product-favorite row">
            {productFavorite.length == 0 ? (
                <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            ) : (
                <>
                    <div className="col-5 product-favorite-img">
                        <img src={`${productFavorite.imageProducts[0].image}`}></img>
                    </div>
                    <div className="col-6">
                        <div className="product-favorite-name">
                            <label onClickCapture={() => handleCLickProductNameFavorite(productFavorite.productId)}>
                                {productFavorite.name}
                            </label>
                        </div>
                        <div>{formatter.format(productFavorite.price)}</div>
                    </div>
                    <div className="delete-item-favorite">
                        <svg
                            onClickCapture={() =>
                                handleClickDeleteProductFavorite(user, productFavorite.productId, productUnlike)
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            class="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </div>
                </>
            )}
        </div>
    );
}
