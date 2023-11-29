import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.css';
import ListSearch from '../Search/ListSearch';
import NavLeftCart from '../NavLeft/NavLeftCart';
import ListCategory from '../Category/ListCategory';
import axios from 'axios';
import ListRoom from '../Room/ListRoom';
import NotificationInPage, { notifyWarningPleaseLogin } from '../NotificationInPage/NotificationInPage';
import { Bars } from 'react-loader-spinner';
import {
    changeCheckToFalse,
    changeListFavorite,
    changeListNotify,
    changeNumberCart,
    changeNumberFavorite,
    changeNumberNotify,
    changePriceAll,
    changeRole,
    changeUser,
    getNumber,
    handleClickNavLeftCart,
    handleClickNavLeftFavorite,
    handleClickNavLeftNotify,
    useStore,
} from '../../Store';
import { AlertLogout } from '../Alert/Alert';
import { useNavigate } from 'react-router-dom';
import NavLeftFavorite from '../NavLeft/NavLeftFavorite';
import NavLeftNotify from '../NavLeft/NavLeftNotify';
import ChatMessage from '../ChatMessage/ChatMessage';
import { useLayoutEffect } from 'react';
import logo from './logo.png';
var limitNotify = 5;
export default function Header() {
    //
    var timeRender = 0;
    //remove recatpcha
    localStorage.removeItem('_grecaptcha');
    const nav = useNavigate();
    //number product in cart
    const [globalState, dispatch] = useStore();
    const { numberCart, roleState, user, numberFavorite, numberNotify, listFavorite, listNotify } = globalState; //numberCart is state get from Store
    //list product in cart
    const [listProductCart, setListProductCart] = useState([]);
    ///
    const [inputSearch, setInputSearch] = useState('');
    //click more-notification
    const handleClickMoreNotify = useCallback(() => {
        limitNotify += 5;
        console.log(limitNotify);
        getNotify(user);
    });
    //input search onChange
    const handleChangeInputSearch = useCallback((e) => {
        var string = e.target.value
            .replace('/', '')
            .replace('<', '')
            .replace('>', '')
            .replace(';', '')
            .replace(':', '')
            .replace('.', '')
            .replace('?', '');
        setInputSearch(string);
    }, []);

    //handle mouse move all product and move leave
    const handleMouseMoveCategory = useCallback((e) => {
        document.getElementById('listcategory').classList.add('listcategory-visible');
        document.getElementById('listcategory').classList.remove('listcategory-hidden');
    }, []);

    const handleMouseLeaveCategory = useCallback((e) => {
        document.getElementById('listcategory').classList.remove('listcategory-visible');
        document.getElementById('listcategory').classList.add('listcategory-hidden');
    }, []);
    //handle mouse move room and move leave
    const handleMouseMoveRoom = useCallback((e) => {
        document.getElementById('list-room').classList.add('list-room-visible');
        document.getElementById('list-room').classList.remove('list-room-hidden');
    }, []);

    const handleMouseLeaveRoom = useCallback((e) => {
        document.getElementById('list-room').classList.remove('list-room-visible');
        document.getElementById('list-room').classList.add('list-room-hidden');
    }, []);
    //click design
    const handleClickDesign = useCallback((e) => {
        window.location = '/design';
    }, []);
    //
    const handleClickUser = useCallback(() => {
        if (document.getElementById('user-nav').classList.contains('user-nav-visible')) {
            document.getElementById('user-nav').classList.remove('user-nav-visible');
        } else {
            document.getElementById('user-nav').classList.add('user-nav-visible');
        }
    }, []);
    //handleClickInfoUser
    const handleClickInfoUser = useCallback(() => {
        window.location = '/infoUser';
    }, []);
    //call back logout to tranfer to alert
    const logOut = useCallback(() => {
        try {
            sessionStorage.removeItem('checkout');
            dispatch(changeRole('guest'));
            window.location = '/login';
        } catch {
            window.location = '/login';
        }
    }, []);
    const handleClickLogout = useCallback(() => {
        AlertLogout(logOut);
    });
    //function to set list product in cart
    const setListProductInCart = useCallback(async () => {
        var listProductInCart = [];
        for (let i = 0; i < localStorage.length; i++) {
            listProductInCart = [localStorage.key(i), ...listProductInCart];
        }
        setListProductCart(listProductInCart);
    }, []);
    //reload pagecart
    const reloadPageCart = useCallback(() => {
        setListProductInCart();
    }, []);
    //get favorite by user
    const getFavorite = (user) => {
        if (user.length != 0) {
            try {
                if (user.length != 0) {
                    const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `/user/favoriteByUser/${user.userId}`,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    };
                    axios
                        .request(config)
                        .then((res) => {
                            dispatch(changeNumberFavorite(res.data.length));
                            dispatch(changeListFavorite(res.data));
                        })
                        .catch();
                }
            } catch {
                window.location = '/login';
            }
        }
    };
    //get nottify
    const getNotify = (user) => {
        if (user.length != 0) {
            try {
                if (user.length != 0) {
                    var numberNotifyCurrent = 0;
                    const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `/user/getNotification/${limitNotify}`,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    };
                    axios
                        .request(config)
                        .then((res) => {
                            for (var i = 0; i < res.data.length; i++) {
                                if (!res.data[i].state) {
                                    numberNotifyCurrent += 1;
                                }
                            }
                            dispatch(changeNumberNotify(numberNotifyCurrent));
                            dispatch(changeListNotify(res.data));
                        })
                        .catch();
                }
            } catch {
                window.location = '/login';
            }
        }
    };
    //get username (if state is user or admin)
    const getUserName = async () => {
        if (user.length == 0) {
            try {
                const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: '/user/findByName',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };

                await axios.request(config).then((res) => dispatch(changeUser(res.data)));
            } catch {
                window.location = '/login';
            }
        }
    };
    //click order
    const handleClickOrder = useCallback(() => {
        window.location = '/order';
    }, []);
    //Click cart
    const handleClickCart = useCallback(() => {
        ////
        reloadPageCart();
        //
        handleClickNavLeftCart(dispatch, changeNumberCart);
        dispatch(changePriceAll(0));
        changeCheckToFalse();
        dispatch(changeNumberCart(getNumber()));
    }, []);
    //Click favorite
    const handleClickFavorite = useCallback((roleState, user) => {
        if (roleState == 'user') {
            handleClickNavLeftFavorite();
        } else {
            notifyWarningPleaseLogin();
        }
    }, []);
    //Click notify
    const handleClickNotify = useCallback((roleState) => {
        if (roleState == 'user') {
            handleClickNavLeftNotify();
        } else {
            notifyWarningPleaseLogin();
        }
    }, []);
    //////////////////
    //check authenticate
    //check admin fist
    const checkAdmin = async () => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/admin/check',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const request = await axios.request(config).catch();
            dispatch(changeRole('admin'));
            window.location = '/admin';
        } catch {}
    };
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
        } catch {}
    };

    /// USE EFFECT
    useEffect(() => {
        checkAdmin();
        checkUser();
        dispatch(changeNumberCart(getNumber()));
        changeCheckToFalse();
        timeRender += 1;
    }, []);
    useEffect(() => {
        if (roleState == 'user') {
            getUserName();
        }
    }, [roleState]);
    useEffect(() => {
        getFavorite(user);
        getNotify(user);
    }, [user]);
    ///icon user return
    const iconUser = () => {
        if (user.name != null && roleState === 'user') {
            return (
                <div className="isUser" onClick={handleClickUser}>
                    <label>{user.name}</label>
                    <div id="user-nav" className="user-nav-hidden">
                        <label onClickCapture={handleClickInfoUser}>Tài khoản</label>
                        <label onClickCapture={handleClickOrder}>Đơn hàng</label>
                        <label onClick={handleClickLogout}>Đăng xuất</label>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="login">
                    <a href="/login">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="23"
                            fill="currentColor"
                            class="bi bi-person-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                        &nbsp;
                    </a>
                </div>
            );
        }
    };
    return (
        <div className="header">
            <div className="row top-header">
                <div className="col-4 col-lg-4 search">
                    <input
                        className="input-search form-control"
                        value={inputSearch}
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={handleChangeInputSearch}
                    />
                    <span className="icon-search">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            class="bi bi-search"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>
                    <ListSearch inputSearch={inputSearch} />
                </div>
                <div className="col-lg-6 support-header"></div>
                <div className="row col-lg-2 icon">
                    <div className="col-lg-4 col-3 notification" onClick={() => handleClickNotify(roleState)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            class="bi bi-bell-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                        </svg>
                        <label>{numberNotify == 0 ? null : numberNotify}</label>
                    </div>
                    <div className="col-lg-4 col-6 heart" onClick={() => handleClickFavorite(roleState, user)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="18"
                            fill="currentColor"
                            class="bi bi-heart-fill"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            />
                        </svg>
                        <label>{numberFavorite == 0 ? null : numberFavorite}</label>
                    </div>
                    <div className="col-lg-4 col-3 cart " onClick={handleClickCart}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            class="bi bi-bag-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                        </svg>
                        <label>{numberCart == 0 ? null : numberCart}</label>
                        &nbsp;
                    </div>
                </div>
            </div>
            <div className="row bottom-header">
                <div className="col-1 visible-768 menu-768">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="35"
                        fill="currentColor"
                        class="bi bi-list"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                    </svg>
                </div>
                <div className="col-md-1 icon-page-guest">
                    <a href="/">
                        <img src={logo} className="logo-img"></img>
                    </a>
                </div>
                <div className="col-9 naviga-header">
                    <span onMouseMove={handleMouseMoveCategory} onMouseLeave={handleMouseLeaveCategory}>
                        <label className="label-products">SẢN PHẨM</label>
                        &nbsp;
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-chevron-down"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                            />
                        </svg>
                        <div id="listcategory" className="listcategory listcategory-hidden">
                            <ListCategory />
                        </div>
                    </span>
                    <span onMouseMove={handleMouseMoveRoom} onMouseLeave={handleMouseLeaveRoom}>
                        <label>PHÒNG</label>
                        &nbsp;
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-chevron-down"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                            />
                        </svg>
                        <div id="list-room" className="list-room list-room-hidden">
                            <ListRoom />
                        </div>
                    </span>
                    <span onClick={handleClickDesign}>
                        <label>THIẾT KẾ NỘI THẤT</label>
                    </span>
                </div>
                <div className="col-2 iconUser"> {iconUser()}</div>
            </div>
            <div id="over-navleft-cart">
                <div id="page-navleft-cart" className="page-navleft-hidden">
                    <NavLeftCart listProductCart={listProductCart} />
                </div>
            </div>
            <div id="over-navleft-favorite">
                <div id="page-navleft-favorite" className="page-navleft-hidden">
                    <NavLeftFavorite listProductFavorite={listFavorite} />
                </div>
            </div>
            <div id="over-navleft-notify">
                <div id="page-navleft-notify" className="page-navleft-hidden">
                    <NavLeftNotify
                        key={listNotify.length}
                        listNotify={listNotify}
                        handleClickMoreNotify={handleClickMoreNotify}
                    />
                </div>
            </div>
            <NotificationInPage />
            <div id="loader-page"></div>
            <div id="loader">
                <Bars
                    height="40"
                    width="50"
                    color="black"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
            <ChatMessage role={'user'} />
        </div>
    );
}
