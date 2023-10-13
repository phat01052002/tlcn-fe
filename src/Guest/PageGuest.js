import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import HeaderGuest from '../components/Header/HeaderGuest';
import './css/PageGuest.css';
import ListBestSellerProduct from './ListBestSellerProduct';
export default function PageGuest() {
    return (
        <div>
            <HeaderGuest />
            <div className="img-page-guest"></div>
            <div id="content">
                <div className="row product-bestSeller">
                    <div className="col-1"></div>
                    <div className="col-10" id="product-bestSeller">
                        <h3>Sản Phẩm Bán Chạy</h3>
                        <div className="list-product-bestSeller">
                            <ListBestSellerProduct />
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer></Footer>
        </div>
    );
}
