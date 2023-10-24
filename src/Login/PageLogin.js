import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useResolvedPath, useSearchParams } from 'react-router-dom';
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_GRANT_TYPE,
    GOOGLE_REDIRECT_URI,
} from '../Contants/ContantsGmail';
import { changeGmail, changeGmailAccessToken, changeRole, useStore } from '../Store';
import './PageLogin.css';
export default function PageLogin() {
    const [globalState, dispatch] = useStore();
    var gmailCode = '';
    //var nav
    const nav = useNavigate();

    //functions getGmail
    const getGmail = async () => {
        const query = new URLSearchParams(window.location.search);
        gmailCode = query.get('code');
        console.log(gmailCode);
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
                await sessionStorage.setItem('gmailAccesstoken', JSON.stringify(response.data.access_token));
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
                    //save access token to sessionStorage
                    await sessionStorage.setItem('gmail', JSON.stringify(response.data));
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
                        const response = await axios.request(config);
                        //save access token to sessionStorage
                        sessionStorage.setItem('USER', JSON.stringify(response.data));
                        //reload
                        dispatch(changeRole('user'));
                        window.location='/'
                        sessionStorage.removeItem('gmail');
                        sessionStorage.removeItem('gmailAccesstoken');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
    //if get gmail success so we redirect to homepage
    getGmail();
    //function login
    const handleClickBtnLoginGmail = useCallback((e) => {
        window.location = `https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://localhost:3000/login&response_type=code&client_id=${GOOGLE_CLIENT_ID}&approval_prompt=force`;
    }, []);
    const handleClickLogin = useCallback(async (e) => {
        var username = document.getElementById('name').value;
        var password = document.getElementById('password').value;
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
            //reload
            dispatch(changeRole('user'));
            nav('/');
        } catch {
            alert('Tài khoản mật khẩu không đúng');
        }
    }, []);
    return (
        <div className="page-login">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 ">
                    <div className="form-login">
                        <div className="title-login">ĐĂNG NHẬP</div>
                        <div className="input-name">
                            <input id="name" placeholder="Tên đăng nhập"></input>
                        </div>
                        <div className="input-password">
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
                            <a href="/">Quên mật khẩu</a>
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
                <div className="col-2"></div>
            </div>
        </div>
    );
}
