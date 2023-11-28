import { async } from '@firebase/util';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertChangeToPageInfoUser } from '../components/Alert/Alert';
import Header from '../components/Header/Header';
import {
    notifyErrorCantOrder,
    notifyErrorLeakAddress,
    notifyErrorLeakDelivery,
    notifyErrorLeakPaymentMethod,
    notifyErrorLeakPhone,
    notifyErrorLeakProductOrder,
    notifyInfoOrder,
    notifySuccessOrder,
    notifyUpdateSussess,
    notifyWarningUpdateInfoUser,
} from '../components/NotificationInPage/NotificationInPage';
import {
    addLoad,
    changeListCountProductCheckOut,
    changeListProductCheckOut,
    changeNumberCart,
    changeRole,
    changeTotalPrice,
    changeUser,
    formatter,
    getNumber,
    removeLoad,
    useStore,
} from '../Store';
import './CheckOut.css';
import ListProductCheckOut from './ListProductCheckOut';
export default function CheckOut() {
    //constant price of delivery,contructor is 0 for delivery (giao hàng tiết kiệm)
    const paidParams = useParams();
    const [priceDelivery, setPriceDelivery] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [globalState, dispatch] = useStore();
    const { roleState, listProductCheckOut, listCountProductCheckOut, totalPrice, user } = globalState;
    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const handleEnterInputAddress = useCallback((e, user) => {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == '13') {
            if (user.length != 0) {
                let accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                let data = {
                    name: user.name,
                    address: e.target.value,
                };
                let config = {
                    method: 'patch',
                    maxBodyLength: Infinity,
                    url: '/user/saveUser',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: data,
                };

                axios
                    .request(config)
                    .then((response) => {
                        notifyUpdateSussess();
                        dispatch(changeUser(response.data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                notifyWarningUpdateInfoUser();
            }
        }
    }, []);
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
    //
    const handleClickUpdatePhone = useCallback(() => {
        AlertChangeToPageInfoUser();
    }, []);
    //remove product when checkout success
    const removeProduct = (listProductCheckOut) => {
        listProductCheckOut.map((productId, index) => {
            localStorage.removeItem(productId);
        });
    };
    //pay-checkout
    const handleClickPayCheckout = useCallback(
        async (paymentMethod, priceDelivery, user, listProductCheckOut, listCountProductCheckOut) => {
            if (!paymentMethod) {
                notifyErrorLeakPaymentMethod();
                return;
            }
            if (priceDelivery == null) {
                notifyErrorLeakDelivery();
                return;
            }
            if (user.length != 0 && listProductCheckOut.length != 0) {
                if (user.phone == '') {
                    notifyErrorLeakPhone();
                    return;
                }
                if (user.address == '') {
                    notifyErrorLeakAddress();
                    return;
                }
                try {
                    addLoad();
                    let nowDelivery = priceDelivery != 0 ? true : false;
                    let paid = paymentMethod == 'online' ? true : false;
                    if (paid == true && paidParams.state == undefined) {
                        let accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                        let data = JSON.stringify({
                            productIds: listProductCheckOut,
                            counts: listCountProductCheckOut,
                            nowDelivery: nowDelivery,
                        });
                        let config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: `/user/pay/${sessionStorage.getItem('totalPrice')}`,
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json',
                            },
                            data: data,
                        };

                        await axios.request(config).then((res) => {
                            removeProduct(listProductCheckOut);
                            window.location = res.data;
                        });
                        removeLoad();
                    } else {
                        if (paidParams.state != undefined) {
                            return;
                        }
                        let accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                        listProductCheckOut.map(async (productId, index) => {
                            ///////////
                            let data = JSON.stringify({
                                nowDelivery: nowDelivery,
                                paid: paid,
                                count: listCountProductCheckOut[index],
                            });
                            let config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: `/user/saveOrder/${productId}`,
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                    'Content-Type': 'application/json',
                                },
                                data: data,
                            };
                            await axios.request(config).then((res) => {
                                if (res.status == 204) {
                                    ///////////
                                    localStorage.removeItem(productId);
                                    dispatch(changeNumberCart(getNumber()));
                                } else {
                                    notifyInfoOrder();
                                    clearTimeout(redirectAfterCheckOutSuccess);
                                }
                            });
                        });
                        removeLoad();
                        notifySuccessOrder();
                        const redirectAfterCheckOutSuccess = setTimeout(() => {
                            dispatch(changeListProductCheckOut([]));
                            dispatch(changeListCountProductCheckOut([]));
                            sessionStorage.removeItem('checkout');
                            window.location = '/order';
                        }, 3500);
                    }
                } catch {
                    notifyErrorCantOrder();
                }
            } else {
                notifyErrorLeakProductOrder();
            }
        },
        [],
    );
    //
    useEffect(() => {
        if (paidParams.state == undefined) {
            dispatch(changeTotalPrice(sessionStorage.getItem('totalPrice')));
            checkUser();
        }
        if (paidParams.state == 'success') {
            notifySuccessOrder();
            setTimeout(() => {
                sessionStorage.removeItem('checkout');
                window.location = '/';
            }, 3000);
        }
    }, []);
    useEffect(() => {
        if (user.city) {
            axios.get(`https://provinces.open-api.vn/api/p/${user.city}`).then((res) => setCity(res.data.name));
        }
        if (user.district) {
            axios.get(`https://provinces.open-api.vn/api/d/${user.district}`).then((res) => setDistrict(res.data.name));
        }
        if (user.ward) {
            axios.get(`https://provinces.open-api.vn/api/w/${user.ward}`).then((res) => setWard(res.data.name));
        }
    }, [user]);
    return (
        <div>
            <Header />
            <div className="content-checkout row">
                <div className="col-lg-8 col-12 order-detail">
                    <div className="info-detail">
                        <label>TÓM TẮT ĐƠN HÀNG</label>
                        <span className="delivery-checkout">
                            <label>Vận chuyển</label>
                            <label className="delivery-checkout-label">Liên hệ để biết thêm</label>
                        </span>
                        <div className="list-checkout">
                            <label>Sản phẩm</label>
                            <ListProductCheckOut />
                        </div>
                        <div className="policy-payment"></div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 info-delivery">
                    <div className="user-info">
                        <label>Thông tin vận chuyển</label>
                        <div className="div-input">
                            <label>Tên khách hàng:</label>
                            <input
                                className="input-checkout input-user-name"
                                value={user.name}
                                readOnly={user.name ? true : false}
                            ></input>
                        </div>
                        <div className="div-input">
                            <label>Số điện thoại:</label>
                            {user.phone ? (
                                <input
                                    className="input-checkout input-user-phone"
                                    value={user.phone}
                                    placeholder="Vui lòng cập nhật thông tin"
                                    readOnly={true}
                                ></input>
                            ) : (
                                <button className="input-checkout btn-update" onClick={handleClickUpdatePhone}>
                                    Cập nhật
                                </button>
                            )}
                        </div>
                        <div className="div-input">
                            <label>Giao đến:</label>
                            {user.apartmentNumber && city && district && ward ? (
                                <input
                                    className="input-checkout input-user-address"
                                    value={`${user.apartmentNumber},${ward},${district},${city}`}
                                    placeholder="Vui lòng cập nhật thông tin"
                                    onKeyDown={(e) => handleEnterInputAddress(e, user)}
                                ></input>
                            ) : (
                                <button className="input-checkout btn-update" onClick={handleClickUpdatePhone}>
                                    Cập nhật
                                </button>
                            )}
                        </div>
                        <div className="div-input-code">
                            <svg
                                class="coupon-icon"
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.2803 14.7803L14.7803 10.2803C15.0732 9.98744 15.0732 9.51256 14.7803 9.21967C14.4874 8.92678 14.0126 8.92678 13.7197 9.21967L9.21967 13.7197C8.92678 14.0126 8.92678 14.4874 9.21967 14.7803C9.51256 15.0732 9.98744 15.0732 10.2803 14.7803Z"
                                    fill="#0B74E5"
                                ></path>
                                <path
                                    d="M10.125 10.5C10.7463 10.5 11.25 9.99632 11.25 9.375C11.25 8.75368 10.7463 8.25 10.125 8.25C9.50368 8.25 9 8.75368 9 9.375C9 9.99632 9.50368 10.5 10.125 10.5Z"
                                    fill="#0B74E5"
                                ></path>
                                <path
                                    d="M15 14.625C15 15.2463 14.4963 15.75 13.875 15.75C13.2537 15.75 12.75 15.2463 12.75 14.625C12.75 14.0037 13.2537 13.5 13.875 13.5C14.4963 13.5 15 14.0037 15 14.625Z"
                                    fill="#0B74E5"
                                ></path>
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M3.75 5.25C3.33579 5.25 3 5.58579 3 6V9.75C3 10.1642 3.33579 10.5 3.75 10.5C4.61079 10.5 5.25 11.1392 5.25 12C5.25 12.8608 4.61079 13.5 3.75 13.5C3.33579 13.5 3 13.8358 3 14.25V18C3 18.4142 3.33579 18.75 3.75 18.75H20.25C20.6642 18.75 21 18.4142 21 18V14.25C21 13.8358 20.6642 13.5 20.25 13.5C19.3892 13.5 18.75 12.8608 18.75 12C18.75 11.1392 19.3892 10.5 20.25 10.5C20.6642 10.5 21 10.1642 21 9.75V6C21 5.58579 20.6642 5.25 20.25 5.25H3.75ZM4.5 9.08983V6.75H19.5V9.08983C18.1882 9.41265 17.25 10.5709 17.25 12C17.25 13.4291 18.1882 14.5874 19.5 14.9102V17.25H4.5V14.9102C5.81181 14.5874 6.75 13.4291 6.75 12C6.75 10.5709 5.81181 9.41265 4.5 9.08983Z"
                                    fill="#0B74E5"
                                ></path>
                            </svg>
                            <input className="input-code" placeholder="Nhập mã khuyến mãi"></input>
                        </div>
                        <div className="payment-method">
                            <label>Phương thức thanh toán</label>
                            <span>
                                <input
                                    className="radio-checkout"
                                    type="radio"
                                    name="payment"
                                    onChange={() => {
                                        setPaymentMethod('online');
                                    }}
                                />{' '}
                                &nbsp;&nbsp;
                                <img
                                    class="method-icon"
                                    src="https://salt.tikicdn.com/ts/upload/7e/48/50/7fb406156d0827b736cf0fe66c90ed78.png"
                                    width="32"
                                    height="32"
                                    alt="icon"
                                ></img>{' '}
                                Thanh toán online
                            </span>
                            <span>
                                <input
                                    className="radio-checkout"
                                    type="radio"
                                    name="payment"
                                    onChange={() => {
                                        setPaymentMethod('offline');
                                    }}
                                />{' '}
                                &nbsp;&nbsp;
                                <img
                                    class="method-icon"
                                    src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                                    width="32"
                                    height="32"
                                    alt="icon"
                                ></img>{' '}
                                Thanh toán khi nhận hàng
                            </span>
                        </div>
                        <div className="delivery-method">
                            <label>Phương thức giao hàng</label>
                            <span>
                                <input
                                    className="radio-checkout"
                                    type="radio"
                                    name="delivery"
                                    onChange={() => {
                                        setPriceDelivery(30000);
                                    }}
                                />
                                &nbsp;&nbsp; &nbsp;
                                <img
                                    class="method-logo"
                                    alt="delivery-method-icon"
                                    width="32"
                                    height="16"
                                    src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                                />{' '}
                                Giao hàng nhanh
                            </span>
                            <span>
                                <input
                                    className="radio-checkout"
                                    type="radio"
                                    name="delivery"
                                    onChange={() => {
                                        setPriceDelivery(0);
                                    }}
                                />{' '}
                                &nbsp;&nbsp;
                                <svg
                                    class="fulfillment-icon"
                                    width="24"
                                    height="26"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M3 4.5C3 4.08579 3.33579 3.75 3.75 3.75H10.5C10.9142 3.75 11.25 4.08579 11.25 4.5V6.75H16.5C16.8442 6.75 17.1441 6.98422 17.2276 7.3181L17.8939 9.98345L20.5854 11.3292C20.8395 11.4562 21 11.7159 21 12V16.5C21 16.9142 20.6642 17.25 20.25 17.25H17.25C17.25 18.9069 15.9069 20.25 14.25 20.25C12.5931 20.25 11.25 18.9069 11.25 17.25H10.5C10.0858 17.25 9.75 16.9142 9.75 16.5V5.25H3.75C3.33579 5.25 3 4.91421 3 4.5ZM12.8306 16.7635C12.834 16.7546 12.8372 16.7455 12.8402 16.7364C13.0499 16.1609 13.602 15.75 14.25 15.75C14.898 15.75 15.4501 16.1609 15.6598 16.7364C15.6628 16.7455 15.666 16.7546 15.6694 16.7635C15.7216 16.9161 15.75 17.0797 15.75 17.25C15.75 18.0784 15.0784 18.75 14.25 18.75C13.4216 18.75 12.75 18.0784 12.75 17.25C12.75 17.0797 12.7784 16.9161 12.8306 16.7635ZM16.8487 15.75C16.3299 14.8533 15.3604 14.25 14.25 14.25C13.1396 14.25 12.1701 14.8533 11.6513 15.75H11.25V8.25H15.9144L16.5224 10.6819C16.5755 10.8943 16.7188 11.0729 16.9146 11.1708L19.5 12.4635V15.75H16.8487ZM3 8.25C3 7.83579 3.33579 7.5 3.75 7.5H7.5C7.91421 7.5 8.25 7.83579 8.25 8.25C8.25 8.66421 7.91421 9 7.5 9H3.75C3.33579 9 3 8.66421 3 8.25ZM13.5 9C13.9142 9 14.25 9.33579 14.25 9.75V10.5H15C15.4142 10.5 15.75 10.8358 15.75 11.25C15.75 11.6642 15.4142 12 15 12H13.5C13.0858 12 12.75 11.6642 12.75 11.25V9.75C12.75 9.33579 13.0858 9 13.5 9ZM4.5 12C4.5 11.5858 4.83579 11.25 5.25 11.25H7.5C7.91421 11.25 8.25 11.5858 8.25 12C8.25 12.4142 7.91421 12.75 7.5 12.75H5.25C4.83579 12.75 4.5 12.4142 4.5 12ZM6 15.75C6 15.3358 6.33579 15 6.75 15H7.5C7.91421 15 8.25 15.3358 8.25 15.75C8.25 16.1642 7.91421 16.5 7.5 16.5H6.75C6.33579 16.5 6 16.1642 6 15.75Z"
                                        fill="#38383D"
                                    ></path>
                                </svg>{' '}
                                Giao hàng tiết kiệm
                            </span>
                        </div>
                        <span className="price-checkout">
                            Thành tiền
                            <label className="price-checkout-label">{formatter.format(totalPrice)}</label>
                        </span>
                        <span className="price-delivery price-checkout">
                            Phí giao hàng
                            <label className="price-checkout-label">
                                {priceDelivery ? formatter.format(priceDelivery) : '0'}
                            </label>
                        </span>
                        <span className="price-total price-checkout">
                            Tổng
                            <label className="price-checkout-label">
                                {priceDelivery
                                    ? formatter.format(parseInt(totalPrice) + priceDelivery)
                                    : formatter.format(parseInt(totalPrice))}
                            </label>
                        </span>
                        <div className="pay-checkout">
                            <button
                                onClick={() =>
                                    handleClickPayCheckout(
                                        paymentMethod,
                                        priceDelivery,
                                        user,
                                        listProductCheckOut,
                                        listCountProductCheckOut,
                                    )
                                }
                            >
                                Đặt mua
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
