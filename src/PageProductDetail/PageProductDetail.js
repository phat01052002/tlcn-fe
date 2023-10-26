import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/PageProductDetail.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/Header/Header';
import BenhindProductDetail from './BenhindProductDetail';
import { changeNumberCart, formatter, getNumber, useStore } from '../Store';
import { notifyAddToCartSussess } from '../components/NotificationInPage/NotificationInPage';
export default function PageProductDetail() {
    /////
    const [globalState, dispatch] = useStore();
    ///////
    const { numberCart } = globalState;
    //
    const { productId } = useParams();
    //the product for this page
    const [product, setProduct] = useState([]);
    //the number for user to buy or add to card
    const [number, setNumber] = useState(1);
    //the current behind product detail (1:review 2:insuranse 3:transport)
    const [currentBehind, setCurrentBehind] = useState(1);
    //this vars to set color behind product detail
    //handle buy now
    const handleClickBuyNow = useCallback((e) => {
        console.log('buynow');
    }, []);
    //handle add tocart
    const handleClickAddToCart = useCallback((e) => {
        const count = document.getElementById('number-product').value;
        if (localStorage.getItem(productId)) {
            try {
                localStorage.setItem(
                    productId,
                    JSON.stringify({
                        count: parseInt(JSON.parse(localStorage.getItem(productId)).count) + parseInt(count),
                        check: JSON.parse(localStorage.getItem(productId)).check,
                    }),
                );
                dispatch(changeNumberCart(getNumber()));
                notifyAddToCartSussess();
            } catch (e) {
                console.log(e);
            }
        } else {
            localStorage.setItem(productId, JSON.stringify({ count: count, check: false }));
            dispatch(changeNumberCart(getNumber()));
            notifyAddToCartSussess();
        }
    }, []);
    //handle Decrease number
    const handleClickDecrease = useCallback((e) => {
        if (document.getElementById('number-product').value > 1) setNumber((prev) => (prev -= 1));
    }, []);
    //handle Increase number
    const handleClickIncrease = useCallback((e) => {
        setNumber((prev) => (prev += 1));
    }, []);
    //handle click review
    const handleClickReview = useCallback((e) => {
        setCurrentBehind(1);
        const review = document.getElementById('review');
        const insuranse = document.getElementById('insuranse');
        const transport = document.getElementById('transport');
        review.classList.add('behind-productdetail-current');
        insuranse.classList.remove('behind-productdetail-current');
        transport.classList.remove('behind-productdetail-current');
    }, []);
    //handle click insuranse
    const handleClickInsuranse = useCallback((e) => {
        setCurrentBehind(2);
        const review = document.getElementById('review');
        const insuranse = document.getElementById('insuranse');
        const transport = document.getElementById('transport');
        review.classList.remove('behind-productdetail-current');
        insuranse.classList.add('behind-productdetail-current');
        transport.classList.remove('behind-productdetail-current');
    }, []);
    //handle click transport
    const handleClickTransport = useCallback((e) => {
        setCurrentBehind(3);
        const review = document.getElementById('review');
        const insuranse = document.getElementById('insuranse');
        const transport = document.getElementById('transport');
        review.classList.remove('behind-productdetail-current');
        insuranse.classList.remove('behind-productdetail-current');
        transport.classList.add('behind-productdetail-current');
    }, []);
    //product price
    const getProductPrice = () => {
        if (!product.discount) {
            return formatter.format(product.price);
        } else {
            return (
                <div>
                    <label className="price-product-detail-sale">{formatter.format(product.price)}</label>
                    <label className="price-product-detail-sale-new">
                        {formatter.format(product.price * product.discount.percentDiscount)}
                    </label>
                </div>
            );
        }
    };
    //get product by Id
    useEffect(() => {
        axios
            .get(`/guest/product/${productId}`)
            .then((res) => setProduct(res.data))
            .then((err) => console.log(err));
    }, []);
    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10 row product-detail">
                    <div className="col-12 col-lg-7">
                        <img className="image-product" src={product.image}></img>
                    </div>
                    <div className="col-12 col-lg-5 info-product">
                        <h2> {product.name}</h2>
                        <br />
                        <h6>{getProductPrice()}</h6>
                        <br />
                        <div>
                            <h5>Vật liệu: </h5>
                            {product.material}
                        </div>
                        <br />
                        <div>
                            <h5>Kích thước: </h5>
                            {product.size}
                        </div>
                        <br />
                        <div className="btn-productdetail row">
                            <div className=" col-4 chose-number">
                                <button className="decrease-btn" onClick={handleClickDecrease}>
                                    -
                                </button>
                                <input id="number-product" className="number-product" value={number}></input>
                                <button className="increase-btn" onClick={handleClickIncrease}>
                                    +
                                </button>
                            </div>
                            <div className="col-4 buynow">
                                <button className="btn-buynow" onClick={handleClickBuyNow}>
                                    {' '}
                                    Mua Ngay
                                </button>
                            </div>
                            <div className="col-4 addtocart">
                                <button className="btn-addtocart" onClick={handleClickAddToCart}>
                                    Thêm Vào Giỏ
                                </button>
                            </div>
                        </div>
                        <br />
                        Liên hệ tư vấn và đặt mua: 0865762255
                        <br />
                        <br />
                        <h7>{product.description}</h7>
                        <div className="behind-productdetail-content">
                            <span
                                id="review"
                                className="behind-productdetail behind-productdetail-current review-product"
                                onClick={handleClickReview}
                            >
                                Đánh Giá
                            </span>
                            <span
                                id="insuranse"
                                className="behind-productdetail insuranse-product"
                                onClick={handleClickInsuranse}
                            >
                                Bảo Hành
                            </span>
                            <span
                                id="transport"
                                className="behind-productdetail transport-product"
                                onClick={handleClickTransport}
                            >
                                Vận Chuyển
                            </span>
                        </div>
                        <br />
                        <br />
                        <br />
                        <BenhindProductDetail currentBehind={currentBehind} />
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
}
