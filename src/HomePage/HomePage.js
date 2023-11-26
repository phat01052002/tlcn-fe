import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import './css/HomePage.css';
import Banner from '../components/Banner/Banner';
import ListBestSellerProduct from './ListBestSellerProduct';
import ListCategoryRow from '../components/CategoryHomepage/ListCategoryRow';
import Footer from '../components/Footer/Footer';
import room1 from './img/room1.webp';
import room2 from './img/room2.webp';
import room3 from './img/room3.webp';
import room4 from './img/room4.webp';
import ListProductSale from './ListProductSale';
import ProductJustView from '../components/ProductJustView/ProductJustView';
export default function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <div className="row banner img-page-guest">
                <div className="col-0 col-lg-1"></div>
                <div className="col-12 col-lg-6">
                    <Banner />
                </div>
                <div className="col-12 col-lg-4 row banner-noslide">
                    <div className="">
                        <img src="https://theme.hstatic.net/200000796751/1001150659/14/slide_3_img.jpg?v=482" />
                    </div>
                    <div>
                        <img src="https://theme.hstatic.net/200000796751/1001150659/14/slide_4_img.jpg?v=482" />
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
            <div className="list-room-homepage row">
                <div className="col-1"></div>
                <div className="col-10 row">
                    <div
                        className="col-lg-3 col-6 room-nav"
                        onClick={() => {
                            window.location = '/room/1';
                        }}
                    >
                        <img src={room1}></img>
                        <div>Phòng khách</div>
                        <span>Xem ngay</span>
                    </div>
                    <div
                        className="col-lg-3 col-6 room-nav"
                        onClick={() => {
                            window.location = '/room/3';
                        }}
                    >
                        <img src={room2}></img>
                        <div>Phòng ngủ</div>
                        <span>Xem ngay</span>
                    </div>
                    <div
                        className="col-lg-3 col-6 room-nav"
                        onClick={() => {
                            window.location = '/room/5';
                        }}
                    >
                        <img src={room3}></img>
                        <div>Phòng bếp</div>
                        <span>Xem ngay</span>
                    </div>
                    <div
                        className="col-lg-3 col-6 room-nav"
                        onClick={() => {
                            window.location = '/room/4';
                        }}
                    >
                        <img src={room4}></img>
                        <div>Phòng làm việc</div>
                        <span>Xem ngay</span>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
            <div id="content" className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="title-top-product title-product-sale-off">
                        <label className="title-top-product-style title-product-sale-off visible-arrow-bottom ">
                            Sale Off
                        </label>
                        <div className="sale-animation"></div>
                    </div>
                    <ListProductSale />
                    <ListCategoryRow />
                    <div className="title-top-product">
                        <label className="title-top-product-style visible-arrow-bottom ">
                            <i class="fa fa-bolt fa-beat fa-2x"></i>
                            Bán Chạy
                            <i class="fa fa-bolt fa-beat fa-2x"></i>
                        </label>
                    </div>
                    <div className="product-bestSeller">
                        <div id="product-bestSeller">
                            <div className="list-product-bestSeller">
                                <ListBestSellerProduct />
                            </div>
                        </div>
                    </div>
                    <ProductJustView />
                </div>
                <div className="col-1"></div>
            </div>
            <Footer />
        </div>
    );
}
