import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Bars, ColorRing } from 'react-loader-spinner';
import {
    notifyErrorCanceledOrder,
    notifyInfoOrder,
    notifySuccessCanceledOrder,
    notifySuccessOrder,
} from '../components/NotificationInPage/NotificationInPage';
import { changeListNotify, changeNumberNotify, formatter, useStore } from '../Store';

export default function ProductOrder({ order }) {
    const [productOrder, setProductOrder] = useState([]);
    const [orderState, setOrderState] = useState(order.state);
    const [globalState, dispatch] = useStore();
    const { user } = globalState;
    //
    const jump = (h) => {
        const url = window.location.href;
        window.location.href = '#' + h;
        window.history.replaceState(null, null, url);
    };
    const handleCancelOrder = useCallback(async (user) => {
        const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
        var config = {
            method: 'post',
            url: `/user/canceledOrder/${order.orderId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        await axios.request(config).then(async (res) => {
            console.log(res.data);
            if (res.data == 'canceled success') {
                setOrderState('canceled');
                notifySuccessCanceledOrder();
                try {
                    if (user.length != 0) {
                        var numberNotifyCurrent = 0;
                        const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                        let config = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: '/user/getNotification',
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        };
                        await axios.request(config).then((res) => {
                            for (var i = 0; i < res.data.length; i++) {
                                if (!res.data[i].state) {
                                    numberNotifyCurrent += 1;
                                }
                            }
                            dispatch(changeNumberNotify(numberNotifyCurrent));
                            dispatch(changeListNotify(res.data));
                        });
                    }
                } catch {}
            } else {
                notifyErrorCanceledOrder();
            }
        });
    }, []);
    const handleRestoreOrder = useCallback(async (user) => {
        const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
        var config = {
            method: 'post',
            url: `/user/restoredOrder/${order.orderId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        await axios.request(config).then((res) => {
            if (res.data == 'restore success') {
                setOrderState('processing');
                notifySuccessOrder();
            } else {
                notifyInfoOrder();
            }
        });
        try {
            if (user.length != 0) {
                var numberNotifyCurrent = 0;
                const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: '/user/getNotification',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
                await axios.request(config).then((res) => {
                    for (var i = 0; i < res.data.length; i++) {
                        if (!res.data[i].state) {
                            numberNotifyCurrent += 1;
                        }
                    }
                    dispatch(changeNumberNotify(numberNotifyCurrent));
                    dispatch(changeListNotify(res.data));
                });
            }
        } catch {}
    }, []);
    useEffect(() => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'get',
                url: `/user/findProductByOrderId/${order.orderId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.request(config).then((res) => setProductOrder(res.data));
        } catch {}
    }, []);
    useEffect(() => {
        if (sessionStorage.getItem('orderFocus')) {
            try {
                jump(`order-${sessionStorage.getItem('orderFocus')}`);
                document.getElementById(`order-${sessionStorage.getItem('orderFocus')}`).classList.add('orderFocus');
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
    });
    return (
        <div id={`order-${order.orderId}`} className="border-bottom order row">
            {productOrder.length == 0 ? (
                <>
                    <div className="col-6"></div>
                    <div className="col-1">
                        <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />
                    </div>
                    <div className="col-5"></div>
                </>
            ) : (
                <>
                    <div className="col-xl-4 col-3 product-order">
                        <img src={productOrder.imageProducts[0].image}></img>
                    </div>
                    <span className="product-order-content col-xl-5 col-3">
                        <span>
                            <label className="productOrder-name"> {productOrder.name}</label>
                            <label className="productOrder-price">{formatter.format(productOrder.price)}</label>
                            <label> x {order.count}</label>
                        </span>
                    </span>
                    <div className=" col-xl-3 col-6">
                        <div className="productOrder-total">
                            {formatter.format(
                                order.count * productOrder.price + parseInt(order.nowDelivery ? 30000 : 0),
                            )}
                        </div>
                        <div className="productOrder-state">
                            {orderState == 'processing' ? (
                                <div>
                                    Đang xử lý &nbsp;
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        color="blue"
                                        fill="currentColor"
                                        class="bi bi-arrow-clockwise"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                                        />
                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                    </svg>
                                </div>
                            ) : orderState == 'processed' ? (
                                <div>
                                    Đang vận chuyển &nbsp;
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        color="gray"
                                        fill="currentColor"
                                        class="bi bi-ev-front-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848Zm6.75.51a.186.186 0 0 0-.23.034L6.05 7.246a.188.188 0 0 0 .137.316h1.241l-.673 2.195a.188.188 0 0 0 .085.218c.075.043.17.03.23-.034l2.88-3.187a.188.188 0 0 0-.137-.316H8.572l.782-2.195a.188.188 0 0 0-.085-.218Z" />
                                    </svg>
                                </div>
                            ) : orderState == 'delivered' ? (
                                <div>
                                    Đã giao hàng &nbsp;
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        color="green"
                                        fill="currentColor"
                                        class="bi bi-check-circle-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </div>
                            ) : orderState == 'canceled' ? (
                                <div>
                                    Đã huỷ &nbsp;
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        color="red"
                                        fill="currentColor"
                                        class="bi bi-x-octagon-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                    </svg>
                                </div>
                            ) : null}
                        </div>
                        <div className="productOrder-paid">{order.paid ? 'Đã thanh toán' : 'Chờ thanh toán'}</div>
                        <div className="productOrder-nowDelivery">
                            {order.nowDelivery ? 'Giao hàng nhanh' : 'Giao hàng tiết kiệm'}
                        </div>
                        <div className="productOrder-date">{order.date.substr(0, 10)}</div>
                        {orderState != 'canceled' ? (
                            <div className="btn-order-product">
                                <button onClick={() => handleCancelOrder(user)}>Hủy</button>
                            </div>
                        ) : (
                            <div className="btn-order-product restore">
                                <button onClick={() => handleRestoreOrder(user)}>Đặt lại</button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
