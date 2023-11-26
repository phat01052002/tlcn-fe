import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { addLoad, removeLoad } from '../Store';
import './PageOrder.css';
import ProductOrder from './ProductOrder';
export default function PageOrder() {
    const [focusOrder, setFocusOrder] = useState(1);
    const [listOrder, setListOrder] = useState([]);
    //tất cả sản phẩm
    const handleClickFocus1 = useCallback(async () => {
        setFocusOrder(1);
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'get',
                url: '/user/findOrdersByUser',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(config).then((res) => setListOrder(res.data));
        } catch {}
    }, []);
    //Đang xử lý
    const handleClickFocus2 = useCallback(async () => {
        setFocusOrder(2);
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'get',
                url: '/user/findOrdersByUserAndState/processing',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(config).then((res) => setListOrder(res.data));
        } catch {}
    }, []);
    //Đang vận chuyển
    const handleClickFocus3 = useCallback(async () => {
        setFocusOrder(3);
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'get',
                url: '/user/findOrdersByUserAndState/processed',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(config).then((res) => setListOrder(res.data));
        } catch {}
    }, []);
    //Đã giao
    const handleClickFocus4 = useCallback(async () => {
        setFocusOrder(4);
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'get',
                url: '/user/findOrdersByUserAndState/delivered',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(config).then((res) => setListOrder(res.data));
        } catch {}
    }, []);
    //Đã huỷ
    const handleClickFocus5 = useCallback(async () => {
        setFocusOrder(5);
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'get',
                url: '/user/findOrdersByUserAndState/canceled',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            await axios.request(config).then((res) => setListOrder(res.data));
        } catch {}
    }, []);
    useEffect(() => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'get',
                url: '/user/findOrdersByUser',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => setListOrder(res.data));
        } catch {}
    }, []);
    return (
        <div className="page-order">
            <Header />
            {listOrder.length}
            <div className="title-page-order">ĐƠN HÀNG CỦA TÔI</div>
            <div className="page-order-content row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className=" header-page-content">
                        <div
                            className={`header-page-content-nav ${focusOrder == 1 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus1}
                        >
                            Tất cả đơn
                        </div>
                        <div
                            className={`header-page-content-nav ${focusOrder == 2 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus2}
                        >
                            Đang xử lý
                        </div>
                        <div
                            className={`header-page-content-nav ${focusOrder == 3 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus3}
                        >
                            Đang vận chuyển
                        </div>
                        <div
                            className={`header-page-content-nav ${focusOrder == 4 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus4}
                        >
                            Đã giao
                        </div>
                        <div
                            className={`header-page-content-nav ${focusOrder == 5 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus5}
                        >
                            Đã huỷ
                        </div>
                    </div>
                    <div className="list-product-order">
                        {listOrder.map((order) => (
                            <ProductOrder key={order.orderId} order={order} />
                        ))}
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
            <Footer></Footer>
        </div>
    );
}
