import { Button } from '@mui/material';
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { AlertPhoneNotExist } from '../components/Alert/Alert';
import NotificationInPage, {
    notifyErrorGetOTPPhone,
    notifyOTPSussess,
    notifyVerifySussess,
    notifyErrorVerifyPhone,
} from '../components/NotificationInPage/NotificationInPage';
import { auth } from '../setupFirebase/setupFirebase';
import { handleClickBack, useStore } from '../Store';
import './ForgotPasswordPage.css';
export default function ForgotPasswordPage() {
    const [globalState, dispatch] = useStore();
    const { roleState } = globalState;
    //otp
    const [phone, setPhone] = useState(); //+84 is country vn
    const [comfirm, setComfirm] = useState(null);
    const [otp, setOtp] = useState('');
    const [isVerify, setIsVerify] = useState(false);
    const handleResetPassword = useCallback((isVerify, phone) => {
        if (isVerify) {
            let data = JSON.stringify({
                password: document.getElementById('password-forgotpassword').value,
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `/api/v1/auth/resetPassword/${phone}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            axios
                .request(config)
                .then((response) => {
                    sessionStorage.setItem('USER', JSON.stringify(response.data));
                    window.location = '/';
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    const handleVerifyOTP = useCallback(async (otp, comfirm) => {
        if (comfirm) {
            try {
                const data = await comfirm.confirm(otp); //if error => notify, else go to register
                if (data) {
                    setIsVerify(true);
                    notifyVerifySussess();
                    document.getElementById('btn-forgotpassword').classList.remove('hidden');
                    document.getElementById('div-password-forgotpassword').classList.remove('hidden');
                }
            } catch {
                notifyErrorVerifyPhone();
            }
        } else {
            notifyErrorVerifyPhone();
        }
    }, []);
    const handleSendOTP = useCallback(async (phone) => {
        const checkPhone = await axios.get(`guest/checkPhone/${phone}`);
        console.log(checkPhone.data);
        if (checkPhone.data === true) {
            try {
                const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
                const comfirmation = await signInWithPhoneNumber(auth, `+84${phone}`, recaptcha);
                setComfirm(comfirmation);
                notifyOTPSussess();
            } catch {
                notifyErrorGetOTPPhone();
            }
        } else {
            AlertPhoneNotExist();
        }
    }, []);
    return (
        <div className="ForgotPasswordPage">
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
                                <div className="title-register">Quên mật khẩu</div>
                                <div className="input input-phone-register">
                                    <input
                                        type="number"
                                        placeholder="Số điện thoại"
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
                                <div
                                    id="div-password-forgotpassword"
                                    className="input input-password-register hidden margin-top-4rem"
                                >
                                    <input id="password-forgotpassword" type="password" placeholder="Mật khẩu"></input>
                                </div>
                                <div
                                    id="btn-forgotpassword"
                                    className="btn-register hidden"
                                    onClick={() => handleResetPassword(isVerify, phone)}
                                >
                                    <button>Thay đổi</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-1"></div>
                    </div>
                </div>
                <NotificationInPage />
            </div>
        </div>
    );
}
