import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { changeRole, changeTotalPrice, formatter, useStore } from '../Store';
import './CheckOut.css';
import ListProductCheckOut from './ListProductCheckOut';
export default function CheckOut() {
    const [globalState, dispatch] = useStore();
    const { roleState, listProductCheckOut, listCountProductCheckOut, totalPrice } = globalState;
    const checkUser = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/user/check',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const request = await axios.request(config);
            dispatch(changeRole('user'));
        } catch {
            window.location = '/login';
        }
    };
    useEffect(() => {
        dispatch(changeTotalPrice(sessionStorage.getItem('totalPrice')));
        checkUser();
    }, []);
    return (
        <div>
            <Header />
            <div className="content-checkout row">
                <div className="col-lg-6 col-12 order-detail">
                    <div className="info-detail">
                        <label>TÓM TẮT ĐƠN HÀNG</label>
                        <span className="price-checkout">
                            <label>Thành tiền</label>
                            <label className="price-checkout-label">{formatter.format(totalPrice)}</label>
                        </span>
                        <span className="price-checkout">
                            <label>Vận chuyển</label>
                            <label className="delivery-checkout-label">Liên hệ để biết thêm</label>
                        </span>
                        <div className="list-checkout">
                            <label>Sản phẩm</label>
                            <ListProductCheckOut />
                        </div>
                        <div className="policy-payment"></div>
                        <div className="pay-checkout">
                            <button>Đặt mua</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-12 info-delivery"></div>
            </div>
        </div>
    );
}