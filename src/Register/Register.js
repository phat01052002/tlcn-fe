import axios from 'axios';
import React, { useCallback } from 'react';
import { AlertAccountIsPresent } from '../components/Alert/Alert';
import { changeRole, handleClickBack, useStore } from '../Store';
import './Register.css';
export default function Register() {
    const [globalState, dispatch] = useStore();
    const { roleState } = globalState;
    const handleRegister = useCallback(() => {
        var name = document.getElementById('name-register').value;
        var password = document.getElementById('password-register').value;
        var username = document.getElementById('phone-register').value;
        let data = JSON.stringify({
            username: username,
            password: password,
            name: name,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/v1/auth/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios.request(config).then((res) => {
            if (res.data) {
                dispatch(changeRole('user'));
                sessionStorage.setItem('USER', JSON.stringify(res.data));
                window.location = '/';
            } else {
                AlertAccountIsPresent();
            }
        });
    }, []);
    return (
        <div>
            <div className="page-register">
                <div className="row">
                    <div className="col-lg-2 col-1"></div>
                    <div className="col-lg-8 col-10 ">
                        <div className="form-register">
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
                            <div className="title-register">ĐĂNG KÝ</div>
                            <div className="input input-phone-register">
                                <input id="phone-register" type="number" placeholder="Số điện thoại"></input>
                            </div>
                            <div className="input input-password-register">
                                <input id="password-register" type="password" placeholder="Mật khẩu"></input>
                            </div>
                            <div className="input input-name-register">
                                <input id="name-register" placeholder="Tên người dùng"></input>
                            </div>
                            <div className="btn-register" onClick={handleRegister}>
                                <button>Đăng Kí</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-1"></div>
                </div>
            </div>
        </div>
    );
}
