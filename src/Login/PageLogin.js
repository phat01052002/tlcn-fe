import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useResolvedPath, useSearchParams } from 'react-router-dom';
import { AlertDontHaveInfo, AlertLoginFalse } from '../components/Alert/Alert';
import NotificationInPage from '../components/NotificationInPage/NotificationInPage';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_GRANT_TYPE, GOOGLE_REDIRECT_URI } from '../Contants/Contants';
import {
    changeGmail,
    changeGmailAccessToken,
    changeRole,
    changeUser,
    handleClickBack,
    removeAllSession,
    useStore,
} from '../Store';
import './PageLogin.css';
export default function PageLogin() {
    const nav = useNavigate();
    const [globalState, dispatch] = useStore();
    var gmailCode = '';
    //////////////////
    //check authenticate
    //get username (if state is user or admin)
    const getUserName = async () => {
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
    };
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
            nav('/admin');
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
            getUserName();
        } catch {}
    };
    //var nav
    //functions getGmail
    const getGmail = useCallback(async () => {
        const query = new URLSearchParams(window.location.search);
        gmailCode = query.get('code');
        if (gmailCode != null) {
            try {
                let data = JSON.stringify({
                    client_id: GOOGLE_CLIENT_ID,
                    client_secret: GOOGLE_CLIENT_SECRET,
                    redirect_uri: GOOGLE_REDIRECT_URI,
                    code: gmailCode,
                    grant_type: GOOGLE_GRANT_TYPE,
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://accounts.google.com/o/oauth2/token',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data,
                };

                const response = await axios.request(config);
                //save access token to sessionStorage
                sessionStorage.setItem('gmailAccesstoken', JSON.stringify(response.data.access_token));
                if (sessionStorage.getItem('gmailAccesstoken')) {
                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${sessionStorage.getItem(
                            'gmailAccesstoken',
                        )}`,
                        headers: {},
                    };
                    const response = await axios.request(config);
                    //save gmail to sessionStorage
                    sessionStorage.setItem('gmail', JSON.stringify(response.data));
                    if (sessionStorage.getItem('gmail')) {
                        let data = JSON.stringify({
                            username: `${JSON.parse(sessionStorage.getItem('gmail')).email}`,
                            password: `${JSON.parse(sessionStorage.getItem('gmail')).password}`,
                        });

                        let config = {
                            method: 'post',
                            maxBodyLength: Infinity,
                            url: '/api/v1/auth/login-gmail',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            data: data,
                        };
                        sessionStorage.removeItem('gmail');
                        sessionStorage.removeItem('gmailAccesstoken');
                        await axios.request(config).then(async (res) => {
                            if (res.status == 200) {
                                //save access token to sessionStorage
                                sessionStorage.setItem('USER', JSON.stringify(res.data));
                                checkUser();
                                checkAdmin();
                                //reload
                                if (sessionStorage.getItem('checkout')) {
                                    nav('/checkout');
                                } else {
                                    nav('/');
                                }
                            } else if (res.status == 201) {
                                sessionStorage.removeItem('gmail');
                                sessionStorage.removeItem('gmailAccesstoken');
                                sessionStorage.setItem('USER', JSON.stringify(res.data));
                                checkUser();
                                checkAdmin();
                                if (sessionStorage.getItem('checkout')) {
                                    nav('/checkout');
                                } else {
                                    nav('/');
                                }
                            } else {
                                nav('/');
                            }
                        });
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, []);
    ////////
    useEffect(() => {
        removeAllSession();
        getGmail();
    }, []);
    //function login
    const handleClickBtnLoginGmail = useCallback((e) => {
        window.location = `https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://localhost:3000/login&response_type=code&client_id=${GOOGLE_CLIENT_ID}&approval_prompt=force`;
    }, []);
    const handleClickLogin = useCallback(async (e) => {
        var username = document.getElementById('name').value;
        var password = document.getElementById('password').value;
        if (!username || !password) {
            AlertDontHaveInfo();
            return;
        }
        try {
            let data = JSON.stringify({
                username: `${username}`,
                password: `${password}`,
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/v1/auth/login',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            };
            const response = await axios.request(config);
            //save access token to sessionStorage
            sessionStorage.setItem('USER', JSON.stringify(response.data));
            checkUser();
            checkAdmin();
            //reload
            if (sessionStorage.getItem('checkout')) {
                nav('/checkout');
            } else {
                nav('/');
            }
        } catch {
            AlertLoginFalse();
        }
    }, []);
    return (
        <div className="page-login">
            <div className="row">
                <div className="col-lg-2 col-1"></div>
                <div className="col-lg-8 col-10 ">
                    <div className="form-login">
                        <div className="back-icon" onClick={handleClickBack}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-skip-backward-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z" />
                            </svg>
                        </div>
                        <div className="title-login">ĐĂNG NHẬP</div>
                        <div className="input input-name">
                            <input id="name" type="number" placeholder="Số điện thoại"></input>
                        </div>
                        <div className="input input-password">
                            <input
                                id="password"
                                type="password"
                                className=" input-password"
                                placeholder="Mật khẩu"
                            ></input>
                        </div>
                        <div className="btn-login">
                            <button onClick={handleClickLogin}>Đăng Nhập</button>
                        </div>
                        <div className="forgot-password-link login-link">
                            <a href="/ForgotPassword">Quên mật khẩu</a>
                        </div>
                        <div className="btn-login-gmail">
                            <button className="btn-login" onClick={handleClickBtnLoginGmail}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="14"
                                    fill="currentColor"
                                    class="bi bi-google"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>
                            </button>
                        </div>
                        <div className="register-link login-link">
                            <a href="/register">Đăng ký</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-1"></div>
            </div>
            <NotificationInPage />
        </div>
    );
}
