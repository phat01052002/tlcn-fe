import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    addLoad,
    changeCheckToFalse,
    changeNumberCart,
    changePriceAll,
    decreasePriceAll,
    getNumber,
    getToCheckOut,
    increasePriceAll,
    removeLoad,
    useStore,
} from '../../Store';
import { AlertPleaseLogin } from '../Alert/Alert';
import { notifyWarningChooseProduct, notifyWarningPleaseLogin } from '../NotificationInPage/NotificationInPage';
import './css/PageCart.css';
import Notify from './Notify';
import ProductInCart from './ProductInCart';
import ProductInFavorite from './ProductInFavorite';
export default function PageCart({ listProductCart }) {
    const [globalState, dispatch] = useStore();
    const { roleState, priceAll } = globalState;
    //format
    const formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
    });
    //if check we set price and change the value of state isChecked of the component ProductInCart
    const handleCheck = useCallback((productId, price, check, chageChecked) => {
        if (!check) {
            dispatch(increasePriceAll(parseInt(JSON.parse(localStorage.getItem(productId)).count) * price));
            chageChecked();
        } else {
            dispatch(decreasePriceAll(parseInt(JSON.parse(localStorage.getItem(productId)).count) * price));
            chageChecked();
        }
    }, []);
    //delete page cart function
    const handleClickDeletePageCart = useCallback((e) => {
        document.getElementById('page-navleft-cart').classList.remove('page-navleft-visible');
        document.body.style.pointerEvents = 'auto';
        document.getElementById('over-navleft-cart').style.visibility = 'hidden';
        dispatch(changeNumberCart(getNumber()));
        dispatch(changePriceAll(0));
        changeCheckToFalse();
    }, []);
    //when decrease count
    const decreaseCount = useCallback(async (productId, price, check, decrease, deleteItemProductIncart) => {
        if (check && parseInt(JSON.parse(localStorage.getItem(productId)).count) >= 1) {
            dispatch(decreasePriceAll(price));
        }
        await decrease();
        //reload page cart when delete item
        if (parseInt(JSON.parse(localStorage.getItem(productId)).count) == 0) {
            localStorage.removeItem(productId);
            deleteItemProductIncart();
        }
    }, []);
    //when increase count
    const increaseCount = useCallback((productId, price, check, increase) => {
        increase();
        if (check) {
            dispatch(increasePriceAll(price));
        }
    }, []);

    //when click delete item
    const deleteItem = useCallback(async (productId, price, check, deleteItemProductIncart) => {
        addLoad();
        if (check) {
            await dispatch(decreasePriceAll(parseInt(JSON.parse(localStorage.getItem(productId)).count * price)));
        }
        localStorage.removeItem(productId);
        deleteItemProductIncart();
        removeLoad();
    }, []);

    //click pay all
    const handleClickPayAll = useCallback((priceAll, roleState) => {
        if (priceAll != 0) {
            if (roleState == 'guest') {
                document.body.style.pointerEvents = 'auto';
                notifyWarningPleaseLogin();
                sessionStorage.setItem('checkout', JSON.stringify(getToCheckOut()));
                sessionStorage.setItem('totalPrice', priceAll);
                AlertPleaseLogin();
            } else {
                sessionStorage.setItem('checkout', JSON.stringify(getToCheckOut()));
                changeCheckToFalse();
                sessionStorage.setItem('totalPrice', priceAll);
                window.location = '/checkout';
            }
        } else {
            notifyWarningChooseProduct();
        }
    }, []);
    useEffect(() => {
        document.getElementById('input-price-all').style.pointerEvents = 'none';
    }, []);
    return (
        <>
            <div className="page-cart">
                <div className="delete-page-cart" onClickCapture={handleClickDeletePageCart}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-x-circle-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                </div>
                <h5>GIỎ HÀNG</h5>
                {listProductCart.length == 0 ? (
                    <div className="notthing-cart">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill="currentColor"
                            class="bi bi-ban"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15 8a6.973 6.973 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8ZM2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Z" />
                        </svg>
                        <br/>
                        <br/>
                        <br/>
                        Không có sản phẩm nào
                    </div>
                ) : (
                    listProductCart.map((productId) => (
                        <ProductInCart
                            key={productId}
                            productId={productId}
                            handleCheck={handleCheck}
                            increaseCount={increaseCount}
                            decreaseCount={decreaseCount}
                            deleteItem={deleteItem}
                        />
                    ))
                )}
                <div className="buyAll-in-cart">
                    <input id="input-price-all" value={formatter.format(priceAll)}></input>
                    <Button onClickCapture={() => handleClickPayAll(priceAll, roleState)}>Thanh Toán</Button>
                </div>
            </div>
        </>
    );
}
