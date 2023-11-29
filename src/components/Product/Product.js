import axios from 'axios';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appendListProductJustView, changeNumberCart, getNumber, useStore } from '../../Store';
import { notifyAddToCartSussess } from '../NotificationInPage/NotificationInPage';
import './css/Product.css';
import Like from './Like';
import ProductHot from './ProductHot';
import ProductSale from './ProductSale';
import Unlike from './Unlike';
export default function Product({ key, product, type }) {
    /////
    const [globalState, dispatch] = useStore();
    ///////
    const { numberCart, user, productUnlike } = globalState;
    //
    const [productCurrent, setProductCurrent] = useState(product);
    const [listFavorite, setListFavorite] = useState([]);
    //format
    const formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
    });
    //add to cart
    const handleClickAddToCart = useCallback((productId) => {
        if (localStorage.getItem(productId)) {
            try {
                localStorage.setItem(
                    productId,
                    JSON.stringify({
                        count: parseInt(JSON.parse(localStorage.getItem(productId)).count) + 1,
                        check: JSON.parse(localStorage.getItem(productId)).check,
                    }),
                );
                notifyAddToCartSussess();
                dispatch(changeNumberCart(getNumber()));
            } catch (e) {
                console.log(e);
            }
        } else {
            localStorage.setItem(productId, JSON.stringify({ count: 1, check: false }));
            dispatch(changeNumberCart(getNumber()));
            notifyAddToCartSussess();
        }
    }, []);
    //handle click product
    const handleClickProduct = useCallback((productId, productCurrent) => {
        var canAdd = true;
        var listProductJustViewInSession = JSON.parse(sessionStorage.getItem('productJustView'));
        if (listProductJustViewInSession) {
            for (var i = 0; i < listProductJustViewInSession.length; i++) {
                if (listProductJustViewInSession[i].productId == productId) {
                    canAdd = false;
                }
            }
        }
        if (canAdd) {
            sessionStorage.setItem(
                'productJustView',
                JSON.stringify([
                    ...(sessionStorage.getItem('productJustView') == null ? [] : listProductJustViewInSession),
                    productCurrent,
                ]),
            );
        }

        window.location = `/productdetail/${productId}`;
    }, []);
    const addType = () => {
        if (type == 'hot') return <ProductHot />;
    };
    //
    const isFavorite = (listFavoriteByUser, user, productUnlike, product) => {
        for (var i = 0; i < listFavoriteByUser.length; i++) {
            if (listFavoriteByUser[i].userId == user.userId) {
                for (var j = 0; j < productUnlike.length; j++) {
                    if (productUnlike[j] == product.productId) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    };
    //
    const addHeart = (user, product, productUnlike, listFavorite) => {
        if (listFavorite.length != 0 && user.length != 0) {
            if (isFavorite(listFavorite, user, productUnlike, product)) {
                return <Like product={product} setListFavorite={setListFavorite} />;
            } else {
                return <Unlike product={product} setListFavorite={setListFavorite} />;
            }
        } else {
            return <Unlike product={product} setListFavorite={setListFavorite} />;
        }
    };
    const getProductPrice = () => {
        if (productCurrent.discount) {
            return (
                <div className="price-discount">
                    <label className="price-old">{formatter.format(productCurrent.price)}</label>
                    <label className="price-new">
                        {formatter.format(productCurrent.price * (1 - productCurrent.discount.percentDiscount))}
                    </label>
                </div>
            );
        } else {
            return formatter.format(productCurrent.price);
        }
    };
    //discount
    const addDiscount = () => {
        if (productCurrent.discount) {
            return (
                <div className="product-sale">
                    <ProductSale discount={productCurrent.discount} />
                </div>
            );
        } else {
            return null;
        }
    };
    useEffect(() => {
        if (user.length != 0) {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/user/getFavoritesByProduct/${product.productId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => setListFavorite(res.data));
        }
    }, [user]);
    return (
        <div key={key} id="product" className={`product ${type == 'sale' ? 'width100' : null}`}>
            <div id="type-product" className="type-product">
                {addType()}
            </div>
            {addDiscount()}
            <div className="product-content">
                <img
                    className="img-product"
                    src={productCurrent.imageProducts.length > 0 ? productCurrent.imageProducts[0].image : null}
                    onClickCapture={() => handleClickProduct(productCurrent.productId, productCurrent)}
                />
                <img
                    className="img-product-new hidden"
                    src={
                        productCurrent.imageProducts.length > 0
                            ? productCurrent.imageProducts[product.imageProducts.length - 1].image
                            : null
                    }
                    onClickCapture={() => handleClickProduct(productCurrent.productId, productCurrent)}
                />
                <div className="info-product-content">
                    <label className="product-name">{productCurrent.name}</label>
                    <label className="product-price">{getProductPrice()}</label>
                </div>
                <div className="product-content-btn">
                    <button
                        className="btn-product btn-addtocart-product"
                        onClick={() => handleClickAddToCart(productCurrent.productId)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-bag-plus"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                            />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </button>
                    <button className="btn-product btn-like-product">
                        {addHeart(user, productCurrent, productUnlike, listFavorite)}
                    </button>
                </div>
                <label className="number-favorite">
                    {listFavorite.length != 0 ? listFavorite.length + ' lượt thích' : null}
                </label>
                <label className="number-quantity">
                    {productCurrent.quantity != 0 ? 'còn lại ' + productCurrent.quantity : null}
                </label>
            </div>
        </div>
    );
}
