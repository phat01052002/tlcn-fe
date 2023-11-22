import axios from 'axios';
import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decreaseNumerNotify, formatter, useStore } from '../../Store';
import './css/PageCart.css';

export default function Notify({ notify, deletePageNotify }) {
    const [productOrder, setProductOrder] = useState([]);
    const [globalState, dispatch] = useStore();
    const nav = useNavigate();
    //
    const jump = (h) => {
        const url = window.location.href;
        window.location.href = '#' + h;
        window.history.replaceState(null, null, url);
    };
    //
    const handleClickNotify = useCallback(() => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'post',
                url: `/user/checkNotification/${notify.notificationId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios
                .request(config)
                .then(dispatch(decreaseNumerNotify()))
                .then((notify.state = true));
            document.body.style.pointerEvents = 'auto';
            sessionStorage.setItem('orderFocus', notify.order.orderId);
            window.location = '/order';
            if (sessionStorage.getItem('orderFocus')) {
                try {
                    jump(`order-${sessionStorage.getItem('orderFocus')}`);
                    document
                        .getElementById(`order-${sessionStorage.getItem('orderFocus')}`)
                        .classList.add('orderFocus');
                    deletePageNotify();
                    setTimeout(() => {
                        try {
                            document
                                .getElementById(`order-${sessionStorage.getItem('orderFocus')}`)
                                .classList.remove('orderFocus');
                        } catch {}
                        sessionStorage.removeItem('orderFocus');
                    }, [2000]);
                } catch {}
            }
        } catch {}
    }, []);
    useEffect(() => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'get',
                url: `/user/findProductByOrderId/${notify.order.orderId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => setProductOrder(res.data));
        } catch {}
    }, []);
    return (
        <div
            className={`row product-notify ${!notify.state ? 'uncheck-notify' : 'checked-notify'}`}
            onClickCapture={handleClickNotify}
        >
            <div className="col-4 product-notify-img">
                <img src={productOrder.image}></img>
            </div>
            <div className="col-8">
                <div className="product-name-notify">{productOrder.name}</div>
                <div className="total-notify">Tổng : {formatter.format(productOrder.price * notify.order.count)}</div>
                <div className="notify-description">{notify.description}</div>
                <div className="date-notify">{notify.date.substr(0, 10)}</div>
                <div className="code-order">Mã đơn hàng : {notify.order.orderId}</div>
            </div>
        </div>
    );
}
