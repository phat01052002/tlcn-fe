import axios from 'axios';
import React from 'react';
import { useCallback } from 'react';
import { changeListFavorite, changeNumberFavorite, changeProductUnlike, useStore } from '../../Store';
import { HEADER_API } from '../../Store/Contants';
import { notifyWarningPleaseLogin } from '../NotificationInPage/NotificationInPage';

export default function Unlike({ product, setListFavorite }) {
    const [globalState, dispatch] = useStore();
    const { user, productUnlike } = globalState;
    const getFavorite = async (user, productUnlike) => {
        try {
            if (user.length != 0) {
                const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `${HEADER_API}/user/favoriteByUser/${user.userId}`,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
                await axios
                    .request(config)
                    .then((res) => {
                        dispatch(changeNumberFavorite(res.data.length));
                        dispatch(changeListFavorite(res.data));
                        var productUnlikeNew = productUnlike.filter((productFilter) => {
                            return productFilter != product.productId;
                        });
                        dispatch(changeProductUnlike(productUnlikeNew));
                    })
                    .catch();
            }
        } catch {}
    };
    const hadleClickUnlike = useCallback(async (user, productUnlike) => {
        if (user.length != 0) {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let configPost = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${HEADER_API}/user/saveFavorite/${user.userId}/${product.productId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(configPost).catch();
            let configGet = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${HEADER_API}/user/getFavoritesByProduct/${product.productId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(configGet).then((res) => setListFavorite(res.data));

            await getFavorite(user, productUnlike);
        } else {
            notifyWarningPleaseLogin();
        }
    }, []);
    return (
        <div>
            <svg
                onClick={() => hadleClickUnlike(user, productUnlike)}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-suit-heart"
                viewBox="0 0 16 16"
            >
                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
            </svg>
        </div>
    );
}
