import { async } from '@firebase/util';
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useCallback, useEffect, useState } from 'react';
import { AlertLoginFalse } from '../components/Alert/Alert';
import Header from '../components/Header/Header';
import {
    notifyErrorGetOTPPhone,
    notifyErrorIsNotVerify,
    notifyErrorPassword,
    notifyErrorPhoneIsPresent,
    notifyOTPSussess,
    notifyUpdateSussess,
    notifyVerifySussess,
    notifyWarningUpdateInfoUser,
} from '../components/NotificationInPage/NotificationInPage';
import { auth } from '../setupFirebase/setupFirebase';
import { addLoad, changeUser, removeLoad, useStore } from '../Store';
import './PageInfoUser.css';
export default function PageInfoUser() {
    const [globalState, dispatch] = useStore();
    const { roleState, user } = globalState;
    const [isChange, setIsChange] = useState(false);
    //update phone and password variable
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordOld, setPasswordOld] = useState('');
    const [comfirm, setComfirm] = useState(null);
    const [otp, setOtp] = useState(null);
    const getPhoneUser = (user) => {
        if (user.phone) {
            return user.phone;
        } else {
            return <label>Chưa có</label>;
        }
    };
    const handleChangeUserName = useCallback((e) => {
        let newUserCurrent = user;
        newUserCurrent.name = e.target.value;
        dispatch(changeUser(newUserCurrent));
        setIsChange(true);
    }, []);
    const handleChangeUserAddress = useCallback((e) => {
        let newUserCurrent = user;
        newUserCurrent.address = e.target.value;
        dispatch(changeUser(newUserCurrent));
        setIsChange(true);
    }, []);
    const handleSave = useCallback((user, isChange) => {
        if (isChange) {
            let accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            let data = {
                name: user.name,
                address: user.address,
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
                    setIsChange(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            notifyWarningUpdateInfoUser();
        }
    }, []);
    ////////////
    const handleSubmitChangePassword = useCallback((pasword, username) => {
        let data = JSON.stringify({
            password: pasword,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `/api/v1/auth/resetPassword/${username}`,
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
        document.getElementById('change-password-new').classList.add('hidden');
        document.getElementById('change-password').classList.add('hidden');
    }, []);
    const handleSubmitChangePasswordOld = useCallback(async (passwordOld, username) => {
        let data = JSON.stringify({
            username: username,
            password: passwordOld,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/v1/auth/check',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };
        const response = await axios.request(config);
        if (response.data) {
            document.getElementById('change-password-new').classList.remove('hidden');
        } else {
            notifyErrorPassword();
        }
    }, []);
    ////////////////////
    const handleSubmitUpdatePhone = useCallback(async (phone) => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
            const comfirmation = await signInWithPhoneNumber(auth, `+84${phone}`, recaptcha);
            setComfirm(comfirmation);
            notifyOTPSussess();
            document.getElementById('verify-phone').classList.remove('hidden');
        } catch {
            notifyErrorGetOTPPhone();
        }
        document.getElementById('recaptcha').classList.add('hidden');
    }, []);
    ///////
    const handleSubmitVerifyPhone = useCallback(async (otp, comfirm, phone, user) => {
        addLoad();
        try {
            const data = await comfirm.confirm(otp);
            if (data) {
                notifyVerifySussess();
                if (user.length != 0) {
                    const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: `/user/addPhone/${phone}`,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    };
                    await axios
                        .request(config)
                        .then((res) => {
                            if (res.status == 200) {
                                notifyUpdateSussess();
                                var newUser = user;
                                newUser.phone = phone;
                                dispatch(changeUser(newUser));
                            } else {
                                notifyErrorPhoneIsPresent();
                            }
                        })
                        .catch((e) => notifyErrorPhoneIsPresent());
                }
            }
        } catch {
            notifyErrorIsNotVerify();
        }
        document.getElementById('verify-phone').classList.add('hidden');
        document.getElementById('update-phone').classList.add('hidden');
        removeLoad();
    }, []);
    const handleUpdatePhone = useCallback(() => {
        document.getElementById('update-phone').classList.remove('hidden');
    }, []);
    const handleChangePassword = useCallback(() => {
        document.getElementById('change-password').classList.remove('hidden');
    }, []);
    useEffect(() => {
        if (sessionStorage.getItem('USER') == null) {
            window.location = '/login';
        }
    }, []);
    return (
        <div>
            <Header />
            <div id="info-user" className="row">
                <label>Thông tin cá nhân</label>
                <div className="basic-info col-lg-6 col-12">
                    <span>
                        <label>Ảnh đại diện:</label>
                        <div class="avatar-view">
                            <img src={user.image} alt="avatar" class="default" />
                            <div class="edit">
                                <img
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/edit.png"
                                    class="edit_img"
                                    alt=""
                                />
                            </div>
                        </div>
                    </span>
                    <span>
                        <label>Họ và tên:</label>
                        <input value={user.name} onChange={handleChangeUserName}></input>
                    </span>
                    <span>
                        <label>Địa chỉ</label>
                        <input value={user.address} onChange={handleChangeUserAddress}></input>
                    </span>
                    <div className="btn-save">
                        <button onClick={() => handleSave(user, isChange)}>Lưu thay đổi</button>
                    </div>
                </div>
                <div className="authen-info col-lg-6 col-12">
                    <div className="phone-info-user">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-telephone"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                            &nbsp; Số điện thoại:
                        </div>
                        <div>{getPhoneUser(user)}</div>
                        <span id="update-phone" className="hidden">
                            <input
                                value={phone}
                                placeholder="Nhập số điện thoại"
                                type="number"
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            ></input>
                            &nbsp; &nbsp;
                            <svg
                                onClick={() => handleSubmitUpdatePhone(phone)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-check-lg"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                        </span>
                        <div id="recaptcha"></div>
                        <span id="verify-phone" className="hidden">
                            <input
                                value={otp}
                                placeholder="Nhập OTP"
                                type="number"
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                }}
                            ></input>
                            &nbsp; &nbsp;
                            <svg
                                onClick={() => handleSubmitVerifyPhone(otp, comfirm, phone, user)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-check-lg"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                        </span>
                        <button onClick={handleUpdatePhone}>Cập nhật</button>
                    </div>
                    <div className="password-info-user">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-key"
                                viewBox="0 0 16 16"
                            >
                                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                            &nbsp; Mật khẩu
                        </div>
                        <span id="change-password" className="hidden">
                            <input
                                value={passwordOld}
                                placeholder="Nhập mật khẩu cũ"
                                type="password"
                                onChange={(e) => {
                                    setPasswordOld(e.target.value);
                                }}
                            ></input>
                            &nbsp; &nbsp;
                            <svg
                                onClick={() => handleSubmitChangePasswordOld(passwordOld, user.username)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-check-lg"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                        </span>
                        <span id="change-password-new" className="hidden">
                            <input
                                value={password}
                                placeholder="Nhập mật khẩu mới"
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            ></input>
                            &nbsp; &nbsp;
                            <svg
                                onClick={() => handleSubmitChangePassword(password, user.username)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-check-lg"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                        </span>

                        <button onClick={handleChangePassword}>Thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
