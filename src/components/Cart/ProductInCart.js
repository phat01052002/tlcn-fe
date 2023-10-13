import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

export default function ProductInCart({ key, productId, handleCheck, increaseCount, decreaseCount, deleteItem }) {
    //variable product
    const [product, setProduct] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    //varialbe count product
    const [countProduct, setCountProduct] = useState(parseInt(localStorage.getItem(productId)));
    //variable count that user want to order
    //format money
    const formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
    });
    useEffect(() => {
        axios
            .get(`/guest/product/${productId}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));

        document.querySelectorAll('.price-incart').forEach((element) => {
            element.style.pointerEvents = 'none';
        });
    }, []);
    //function increase and decrease product in cart
    const handleClickDecreaseProductInCart = useCallback(() => {
        if (parseInt(localStorage.getItem(productId)) >= 1) {
            localStorage.setItem(productId, parseInt(localStorage.getItem(productId)) - 1);
            setCountProduct(parseInt(localStorage.getItem(productId)));
        }
    }, []);
    const handleClickIncreaseProductInCart = useCallback(() => {
        localStorage.setItem(productId, parseInt(localStorage.getItem(productId)) + 1);
        setCountProduct(parseInt(localStorage.getItem(productId)));
    }, []);
    // to chage value of checked box when click
    const chageChecked = useCallback(() => {
        setIsChecked((prev) => (prev = !prev));
    }, []);
    return (
        <div className="row product-in-cart">
            <div className="delete-item-cart">
                <svg
                    onClickCapture={() => deleteItem(product.productId, product.price, isChecked)}
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
                <img src={product.image}></img>
                <input
                    onClickCapture={() => {
                        handleCheck(product.productId, product.price, isChecked, chageChecked);
                    }}
                    className="checkbox-cart"
                    type="checkbox"
                ></input>
            </div>
            <div className="col-8 row">
                <div>{product.name}</div>
                <div className="col-5 count-product-cart">
                    <button
                        onClickCapture={() =>
                            decreaseCount(product.productId, product.price, isChecked, handleClickDecreaseProductInCart)
                        }
                    >
                        -
                    </button>
                    <input id="input-count-product-in-cart" value={countProduct}></input>
                    <button
                        onClickCapture={() =>
                            increaseCount(product.productId, product.price, isChecked, handleClickIncreaseProductInCart)
                        }
                    >
                        +
                    </button>
                </div>
                <div className="col-7 buy-in-cart">
                    <button>Thanh toán</button>
                    <input className="price-incart" value={formatter.format(countProduct * product.price)}></input>
                </div>
            </div>
        </div>
    );
}
