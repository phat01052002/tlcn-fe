import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import './css/HomePage.css';
import Banner from '../components/Banner/Banner';
import ListBestSellerProduct from './ListBestSellerProduct';
import ListCategoryRow from '../components/CategoryHomepage/ListCategoryRow';
import Footer from '../components/Footer/Footer';
export default function HomePage() {
    return (
        <div>
            <Header />
            <div className="row banner img-page-guest">
                <div className="col-0 col-lg-1"></div>
                <div className="col-12 col-lg-6">
                    <Banner />
                </div>
                <div className="col-12 col-lg-4 row banner-noslide">
                    <div className="">
                        <img src="https://nhaxinh.com/wp-content/uploads/2021/10/nha-xinh-phong-khach-sofa-jazz-mau-cognac-phong-cach.jpg" />
                    </div>
                    <div>
                        <img src="https://nhaxinh.com/wp-content/uploads/2022/01/sofa-maxine-vai-vang-2.jpg" />
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
            <div id="content" className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <ListCategoryRow />
                </div>
                <div className="col-1"></div>
                <div className="sanphambanchay">Sản Phẩm Bán Chạy</div>
                <div className="row product-bestSeller">
                    <div className="col-1"></div>
                    <div className="col-10" id="product-bestSeller">
                        <div className="list-product-bestSeller">
                            <ListBestSellerProduct />
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="content-room row">
                            <div className="col-lg-6 col-sm-8 img-living-room">
                                <img src="https://nhaxinh.com/wp-content/uploads/2023/05/mau-phong-khach-nha-xinh-24523.jpg"></img>
                            </div>
                            <div className="col-lg-3 col-sm-4 living-decor-nav">
                                <div className="living-room-nav">
                                    <h3>Không gian phòng khách</h3>
                                    <a href="/room/1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-arrow-left"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                            />
                                        </svg>
                                        Tham khảo
                                    </a>
                                </div>
                                <div className="decor-nav">
                                    <h3>Đồ trang trí</h3>
                                    <a href="/room/6">
                                        Tham khảo
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-arrow-right"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-4 visible-768"></div>
                            <div className="col-lg-3 col-sm-8 img-decor">
                                <img src="https://nhaxinh.com/wp-content/uploads/2022/09/hang-trang-tri-nx-12-9-22.jpg"></img>
                            </div>
                            <div className="col-lg-6 col-sm-12 img-bed-room">
                                <div className="bed-room-nav">
                                    <h3>Không gian phòng ngủ</h3>
                                    <a href="/room/3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-arrow-down"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                                            />
                                        </svg>
                                        Tham khảo
                                    </a>
                                </div>
                                <img
                                    src={'https://nhaxinh.com/wp-content/uploads/2023/05/mau-phong-ngu-16-5-23.jpg'}
                                ></img>
                            </div>

                            <div className="col-lg-6 col-sm-12 img-dining">
                                <img src="https://nhaxinh.com/wp-content/uploads/2022/09/banner-phong-an-nha-xinh-12-9-22.jpg"></img>
                                <div className="dining-nav">
                                    <h3>Phòng ăn gia đình</h3>
                                    <a href="/room/6">
                                        Tham khảo
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-arrow-up"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
