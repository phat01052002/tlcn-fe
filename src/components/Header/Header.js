import React, { useCallback, useEffect, useState } from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.css';
import ListSearch from '../Search/ListSearch';
import PageCart from '../Cart/Cart';
import ListCategory from '../Category/ListCategory';
import axios from 'axios';
import ListRoom from '../Room/ListRoom';
import NotificationInPage from '../NotificationInPage/NotificationInPage';
import { changeCheckToFalse, changeNumberCart, changePriceAll, changeRole, getNumber, useStore } from '../../Store';

export default function Header() {
    //number product in cart
    const [globalState, dispatch] = useStore();
    const { numberCart, roleState} = globalState; //numberCart is state get from Store
    //user
    const [user, setUser] = useState(null);
    //list product in cart
    const [listProduct, setListProduct] = useState([]);
    ///
    const [inputSearch, setInputSearch] = useState('');
    //input search onChange
    const handleChangeInputSearch = useCallback((e) => {
        setInputSearch(e.target.value);
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
    //
    const handleClickLogout = useCallback(() => {
        sessionStorage.removeItem('USER');
        dispatch(changeRole('guest'));
        window.location = '/login';
    });
    //function to set list product in cart
    const setListProductInCart = useCallback(async () => {
        await setListProduct([]);
        for (let i = 0; i < localStorage.length; i++) {
            setListProduct((prev) => [localStorage.key(i), ...prev]);
        }
    }, []);
    //reload pagecart
    const reloadPageCart = useCallback(() => {
        setListProductInCart();
    }, []);
    //get username (if state is user or admin)
    const getUserName = () => {
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

            axios.request(config).then((res) => setUser(res.data));
        } catch {
            window.location = '/login';
        }
    };
    //Click cart
    const handleClickCart = useCallback(() => {
        ////
        reloadPageCart();
        /////
        const pageCart = document.getElementById('page-cart');
        ////
        pageCart.classList.add('page-cart-visible');
        document.body.style.pointerEvents = 'none';
        ////
        const overCart = document.getElementById('over-cart');
        ////
        pageCart.style.pointerEvents = 'auto';
        overCart.style.visibility = 'visible';
        overCart.style.pointerEvents = 'auto';
        overCart.addEventListener('click', () => {
            pageCart.classList.remove('page-cart-visible');
            overCart.style.visibility = 'hidden';
            document.body.style.pointerEvents = 'auto';
            dispatch(changePriceAll(0))
            changeCheckToFalse()
            dispatch(changeNumberCart(getNumber()));
        });
        pageCart.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
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

            const request = await axios.request(config);
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
    }, []);
    useEffect(() => {
        if (roleState == 'user') {
            getUserName();
        }
    }, [roleState]);
    ///icon user return
    const iconUser = () => {
        if (user && roleState === 'user') {
            return (
                <div className="col-3 isUser" onClick={handleClickUser}>
                    <label>{user.name}</label>
                    <div id="user-nav" className="user-nav-hidden">
                        <label>Tài khoản</label>
                        <label>Đơn hàng</label>
                        <label onClick={handleClickLogout}>Đăng xuất</label>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="col-3 login">
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
                    <div className="col-3 notification">
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
                    </div>
                    <div className="col-6 cart " onClick={handleClickCart}>
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
                        <label>{numberCart}</label>
                        &nbsp;
                    </div>
                    {iconUser()}
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
                        <img
                            src={'https://i.pinimg.com/originals/69/34/73/693473a49f5048dd83077eb82b4513f9.jpg'}
                            className="logo-img"
                        ></img>
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
            </div>
            <div id="over-cart">
                <div id="page-cart" className="page-cart-hidden">
                    <PageCart listProduct={listProduct} />
                </div>
            </div>
            <NotificationInPage />
        </div>
    );
}
