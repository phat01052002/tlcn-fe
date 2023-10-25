import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    changeCheckToFalse,
    changeNumberCart,
    changePriceAll,
    changeTotalPrice,
    decreasePriceAll,
    getNumber,
    increasePriceAll,
    useStore,
} from '../../Store';
import { AlertPleaseLogin } from '../Alert/Alert';
import { notifyAddToCartSussess, notifyWarningChooseProduct, notifyWarningPleaseLogin } from '../NotificationInPage/NotificationInPage';
import './css/PageCart.css';
import ProductInCart from './ProductInCart';
export default function PageCart({ listProduct }) {
    const [globalState, dispatch] = useStore();
    const { roleState, priceAll, totalPrice } = globalState;
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
    useEffect(() => {
        document.getElementById('input-price-all').style.pointerEvents = 'none';
    }, []);
    //delete page cart function
    const handleClickDeletePageCart = useCallback((e) => {
        document.getElementById('page-cart').classList.remove('page-cart-visible');
        document.body.style.pointerEvents = 'auto';
        document.getElementById('over-cart').style.visibility = 'hidden';
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
        if (check) {
            await dispatch(decreasePriceAll(parseInt(JSON.parse(localStorage.getItem(productId)).count * price)));
        }
        localStorage.removeItem(productId);
        deleteItemProductIncart();
    }, []);

    //click pay all
    const handleClickPayAll = useCallback((priceAll, roleState) => {
        if (priceAll != 0) {
            if (roleState == 'guest') {
                document.body.style.pointerEvents = 'auto';
                notifyWarningPleaseLogin()
                AlertPleaseLogin()
            } else {
                //var to get products in cart are checked
                var productInCartCheck = [];
                for (var i = 0; i < localStorage.length; i++) {
                    if (JSON.parse(localStorage.getItem(localStorage.key(i))).check == true) {
                        //if product is checked,we add them to 'checkout'
                        productInCartCheck = [
                            {
                                productId: JSON.parse(localStorage.key(i)),
                                count: JSON.parse(localStorage.getItem(localStorage.key(i))).count,
                            },
                            ...productInCartCheck,
                        ];
                    }
                }
                sessionStorage.setItem('checkout', JSON.stringify(productInCartCheck));
                changeCheckToFalse();
                sessionStorage.setItem('totalPrice',priceAll)
                window.location = '/checkout';
            }
        } else {
            notifyWarningChooseProduct();
        }
    }, []);
    return (
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
            {listProduct.map((productId) => (
                <ProductInCart
                    key={productId}
                    productId={productId}
                    handleCheck={handleCheck}
                    increaseCount={increaseCount}
                    decreaseCount={decreaseCount}
                    deleteItem={deleteItem}
                />
            ))}
            <div className="buyAll-in-cart">
                <input id="input-price-all" value={formatter.format(priceAll)}></input>
                <button onClickCapture={() => handleClickPayAll(priceAll, roleState)}>Thanh Toán</button>
            </div>
        </div>
    );
}
