import { Button } from '@mui/material';
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { AlertAccountIsPresent, AlertDontHaveInfo, AlertVerifyPhone } from '../components/Alert/Alert';
import NotificationInPage, {
    notifyErrorGetOTPPhone,
    notifyErrorIsNotVerify,
    notifyErrorVerifyPhone,
    notifyOTPSussess,
    notifyVerifySussess,
} from '../components/NotificationInPage/NotificationInPage';
import { auth } from '../setupFirebase/setupFirebase';
import { changeRole, handleClickBack, useStore } from '../Store';
import './Register.css';
export default function Register() {
    const [globalState, dispatch] = useStore();
    const { roleState } = globalState;
    //otp
    const [phone, setPhone] = useState(null); //+84 is country vn
    const [comfirm, setComfirm] = useState([]);
    const [otp, setOtp] = useState('');
    const [isVerify, setIsVerify] = useState(false);
    //
    const handleRegister = useCallback((isVerify, phone) => {
        if (isVerify) {
            var name = document.getElementById('name-register').value;
            var password = document.getElementById('password-register').value;
            var username = phone;
            if (name && password && username) {
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
            } else {
                AlertDontHaveInfo();
            }
        } else {
            notifyErrorIsNotVerify();
        }
    }, []);
    const handleVerifyOTP = useCallback(async (otp, comfirm) => {
        try {
            const data = await comfirm.confirm(otp); //if error => notify, else go to register
            if (data) {
                setIsVerify(true);
                notifyVerifySussess();
            }
        } catch {
            notifyErrorVerifyPhone();
        }
    }, []);
    const handleSendOTP = useCallback(async (phone) => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
            const comfirmation = await signInWithPhoneNumber(auth, `+84${phone}`, recaptcha);
            setComfirm(comfirmation);
            notifyOTPSussess();
        } catch {
            notifyErrorGetOTPPhone();
        }
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
                                <input
                                    placeholder="Số điện thoại"
                                    type="number"
                                    country={'vn'}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                ></input>
                                <Button onClick={() => handleSendOTP(phone)}>Lấy OTP</Button>
                            </div>
                            <div id="recaptcha"></div>
                            <div className="input input-phone-verify">
                                <input
                                    id="phone-verify"
                                    placeholder="OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                ></input>
                                <Button onClick={() => handleVerifyOTP(otp, comfirm)}>Verify</Button>
                            </div>
                            <div className="input input-password-register">
                                <input id="password-register" type="password" placeholder="Mật khẩu"></input>
                            </div>
                            <div className="input input-name-register">
                                <input id="name-register" placeholder="Tên người dùng"></input>
                            </div>
                            <div className="btn-register" onClick={() => handleRegister(isVerify, phone)}>
                                <button>Đăng Kí</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-1"></div>
                </div>
            </div>
            <NotificationInPage />
        </div>
    );
}
