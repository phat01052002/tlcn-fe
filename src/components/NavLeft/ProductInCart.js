import { Button } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useLinkClickHandler, useNavigate } from 'react-router-dom';
import { changeCheckToFalse, changeNumberCart, getNumber, useStore } from '../../Store';
import { AlertPleaseLogin } from '../Alert/Alert';
import { notifyWarningPleaseLogin } from '../NotificationInPage/NotificationInPage';

export default function ProductInCart({ key, productId, handleCheck, increaseCount, decreaseCount, deleteItem }) {
    const [globalState, dispatch] = useStore();
    const { roleState } = globalState;
    //variable product
    const [render, setRender] = useState(true); //set this component render,if false is not render
    const [product, setProduct] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    //varialbe count product
    const [countProduct, setCountProduct] = useState(0);
    //variable count that user want to order
    //format money
    const formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
    });
    //get data
    useEffect(() => {
        if (localStorage.getItem(productId)) {
            setCountProduct(parseInt(JSON.parse(localStorage.getItem(productId)).count));
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `/guest/product/${productId}`,
            headers: {},
        };
        axios.request(config).then((res) => setProduct(res.data));
        document.querySelectorAll('.price-incart').forEach((element) => {
            element.style.pointerEvents = 'none';
        });
    }, []);
    //function increase and decrease product in cart
    const handleClickDecreaseProductInCart = useCallback(() => {
        if (parseInt(JSON.parse(localStorage.getItem(productId)).count) >= 1) {
            localStorage.setItem(
                productId,
                JSON.stringify({
                    count: parseInt(JSON.parse(localStorage.getItem(productId)).count) - 1,
                    check: JSON.parse(localStorage.getItem(productId)).check,
                }),
            );
            setCountProduct(parseInt(JSON.parse(localStorage.getItem(productId)).count));
        }
    }, []);
    const handleClickIncreaseProductInCart = useCallback(() => {
        localStorage.setItem(
            productId,
            JSON.stringify({
                count: parseInt(JSON.parse(localStorage.getItem(productId)).count) + 1,
                check: JSON.parse(localStorage.getItem(productId)).check,
            }),
        );
        setCountProduct(parseInt(JSON.parse(localStorage.getItem(productId)).count));
    }, []);
    // to chage value of checked box when click
    const chageChecked = useCallback(() => {
        setIsChecked((prev) => (prev = !prev));
        localStorage.setItem(
            productId,
            JSON.stringify({
                count: parseInt(JSON.parse(localStorage.getItem(productId)).count),
                check: !JSON.parse(localStorage.getItem(productId)).check,
            }),
        );
    }, []);
    //when delete product incart,we setRender to false to not render
    const deleteItemProductIncart = useCallback(() => {
        setRender(false);
        dispatch(changeNumberCart(getNumber()));
    }, []);

    //handle click pay(if state is guest must be login,admin cant not buy because cant redirect this)
    const handleClickPay = useCallback((totalPrice) => {
        if (roleState == 'guest') {
            document.body.style.pointerEvents = 'auto';
            notifyWarningPleaseLogin();
            sessionStorage.setItem(
                'checkout',
                JSON.stringify([
                    { productId: productId, count: JSON.parse(localStorage.getItem(`${productId}`)).count },
                ]),
            );
            sessionStorage.setItem('totalPrice', totalPrice);
            AlertPleaseLogin();
        } else {
            sessionStorage.setItem(
                'checkout',
                JSON.stringify([
                    { productId: productId, count: JSON.parse(localStorage.getItem(`${productId}`)).count },
                ]),
            );
            changeCheckToFalse();
            sessionStorage.setItem('totalPrice', totalPrice);
            window.location = '/checkout';
        }
    }, []);
    //click name product in cart
    const handleClickNameProductInCart = useCallback(() => {
        window.location = `/productDetail/${productId}`;
    }, []);
    if (render == true) {
        return (
            <div id={productId} className="row product-in-cart">
                {product.length == 0 ? (
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
                        <div className="delete-item-cart">
                            <svg
                                onClickCapture={() =>
                                    deleteItem(product.productId, product.price, isChecked, deleteItemProductIncart)
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
                        <div className="product-in-cart-img col-4">
                            <img src={product.imageProducts[0].image}></img>
                            <input
                                onClickCapture={() => {
                                    handleCheck(product.productId, product.price, isChecked, chageChecked);
                                }}
                                className="checkbox-cart"
                                type="checkbox"
                            ></input>
                        </div>
                        <div className="col-8 row product-name-cart">
                            <div>
                                <label onClickCapture={handleClickNameProductInCart}> {product.name} </label>
                            </div>
                            <div className="col-5 count-product-cart">
                                <button
                                    onClickCapture={() =>
                                        decreaseCount(
                                            product.productId,
                                            product.price,
                                            isChecked,
                                            handleClickDecreaseProductInCart,
                                            deleteItemProductIncart,
                                        )
                                    }
                                >
                                    -
                                </button>
                                <input id="input-count-product-in-cart" value={countProduct}></input>
                                <button
                                    onClickCapture={() =>
                                        increaseCount(
                                            product.productId,
                                            product.price,
                                            isChecked,
                                            handleClickIncreaseProductInCart,
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <div className="col-7 buy-in-cart">
                                <Button onClickCapture={() => handleClickPay(countProduct * product.price)}>
                                    Thanh toán
                                </Button>
                                <input
                                    className="price-incart"
                                    value={formatter.format(countProduct * product.price)}
                                ></input>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    } else {
        return <></>;
    }
}
