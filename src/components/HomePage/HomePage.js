import React, { useCallback, useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import HeaderGuest from '../Header/Header';
import './css/HomePage.css';
import ListBestSellerProduct from './ListBestSellerProduct';
export default function HomePage({role}) {
    return (
        <div>
            <HeaderGuest role={role}/>
            <div className="banner img-page-guest">
                <Banner/>
            </div>
            <div id="content">
                <div className="row product-bestSeller">
                    <div className="col-1"></div>
                    <div className="col-10" id="product-bestSeller">
                        <h3>Sản Phẩm Bán Chạy</h3>
                        <div className="list-product-bestSeller">
                            <ListBestSellerProduct />
                        </div>
                        <div className="content-room row">
                            <div className="col-lg-6 col-sm-8 img-living-room">
                                <img src="https://nhaxinh.com/wp-content/uploads/2023/05/mau-phong-khach-nha-xinh-24523.jpg"></img>
                            </div>
                            <div className="col-lg-3 col-sm-4 living-decor-nav">
                                <div className="living-room-nav">
                                    <h3>Không gian phòng khách</h3>
                                    <a href="/guest">
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
                                    <a href="/guest">
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
                            <div className='col-sm-4 visible-768'></div>
                            <div className="col-lg-3 col-sm-8 img-decor">
                                <img src="https://nhaxinh.com/wp-content/uploads/2022/09/hang-trang-tri-nx-12-9-22.jpg"></img>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
