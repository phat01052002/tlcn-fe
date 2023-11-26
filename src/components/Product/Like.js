import axios from 'axios';
import React from 'react';
import { useCallback } from 'react';
import { changeListFavorite, changeNumberFavorite, useStore } from '../../Store';
import { notifyWarningPleaseLogin } from '../NotificationInPage/NotificationInPage';

export default function Like({ product, setListFavorite }) {
    const [globalState, dispatch] = useStore();
    const { user } = globalState;
    const getFavorite = async (user) => {
        try {
            if (user.length != 0) {
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
                    })
                    .catch();
            }
        } catch {}
    };
    const handleClickLike = useCallback(async (user) => {
        if (user.length != 0) {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let configPost = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `/user/deleteFavorite/${user.userId}/${product.productId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            let configGet = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/user/getFavoritesByProduct/${product.productId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(configPost).catch();
            await axios.request(configGet).then((res) => setListFavorite(res.data));
            await getFavorite(user);
        } else {
            notifyWarningPleaseLogin();
        }
    }, []);
    return (
        <div>
            <svg
                onClick={() => handleClickLike(user)}
                color="red"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-suit-heart-fill"
                viewBox="0 0 16 16"
            >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
        </div>
    );
}
