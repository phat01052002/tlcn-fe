import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/PageProductDetail.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/Header/Header';
import BenhindProductDetail from './BenhindProductDetail';
import { changeNumberCart, formatter, getNumber, useStore } from '../Store';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {
    notifyAddToCartSussess,
    notifyInfoThanks,
    notifyWarningPleaseLogin,
} from '../components/NotificationInPage/NotificationInPage';
import ReactStars from 'react-rating-stars-component';
import { ColorRing, ProgressBar } from 'react-loader-spinner';
import ListProductNear from './ListProductNear';
import Footer from '../components/Footer/Footer';

export default function PageProductDetail() {
    /////
    const [globalState, dispatch] = useStore();
    ///////
    const { numberCart, user } = globalState;
    //
    const { productId } = useParams();
    //the product for this page
    const [product, setProduct] = useState([]);
    //the number for user to buy or add to card
    const [number, setNumber] = useState(1);
    //the current behind product detail (1:review 2:insuranse 3:transport)
    const [currentBehind, setCurrentBehind] = useState(1);
    //rating
    const [rating, setRating] = useState(0);
    //this vars to set color behind product detail
    //handle buy now
    const handleClickBuyNow = useCallback((e) => {
        console.log('buynow');
    }, []);
    //rating
    const ratingChanged = async (newRating, user) => {
        if (user.length != 0) {
            notifyInfoThanks();
            setRating(newRating);
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `/user/saveRating/${user.userId}/${productId}/${newRating}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(config);
        } else {
            notifyWarningPleaseLogin();
        }
    };
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
    //
    const getRating = (user) => {
        if (user.length != 0) {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `/user/getRating/${user.userId}/${productId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => {
                if (res.data) setRating(res.data.point);
            });
        }
    };
    //get product by Id
    useEffect(() => {
        axios.get(`/guest/product/${productId}`).then((res) => {
            if (res.data == null) {
                window.location = '/notfound';
            } else {
                setProduct(res.data);
            }
        });
    }, []);
    useEffect(() => {
        getRating(user);
    }, [user]);
    return (
        <div>
            <Header />
            <div className="row page-product-detail">
                <div className="col-1"></div>
                <div className="col-10 row product-detail">
                    {product.length == 0 ? (
                        <ProgressBar
                            height="80"
                            width="160"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass="progress-bar-wrapper"
                            borderColor="#F4442E"
                            barColor="#51E5FF"
                        />
                    ) : (
                        <>
                            <div className="col-12 col-lg-7">
                                <Carousel
                                    autoPlay={true}
                                    infiniteLoop={true}
                                    interval={5000}
                                    stopOnHover={false}
                                    showStatus={false}
                                    showThumbs={true}
                                    showArrows={false}
                                >
                                    {product.imageProducts.map((imgProduct) => (
                                        <img className="image-product" src={imgProduct.image}></img>
                                    ))}
                                </Carousel>
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
                                <h8>{product.description}</h8>
                            </div>
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
                            <BenhindProductDetail currentBehind={currentBehind} productId={productId} />
                        </>
                    )}
                    <div className="tittle-near-product">Sản phẩm tương tự</div>
                    <div className="near-product">
                        <ListProductNear productId={productId} />
                    </div>
                </div>
                <div className="col-1">
                    <div className="star">
                        <ReactStars
                            /*A work-around for this is to provide a key prop to force React to re-render the component when rating changes*/
                            key={`stars_${rating}`}
                            count={5}
                            onChange={(newRating) => ratingChanged(newRating, user)}
                            size={24}
                            value={rating}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
