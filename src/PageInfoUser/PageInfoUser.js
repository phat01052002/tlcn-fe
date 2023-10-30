import axios from 'axios';
import { Alert } from 'bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { changeUser, useStore } from '../Store';
import './PageInfoUser.css';
export default function PageInfoUser() {
    const [globalState, dispatch] = useStore();
    const { user } = globalState;
    const [isChange, setIsChange] = useState(false);
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
    const handleSave = useCallback((user) => {
        console.log(user);
        const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
        let data = JSON.stringify(user);
        let config = {
            method: 'put',
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
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
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
                            <img
                                src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png"
                                alt="avatar"
                                class="default"
                            />
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
                        <button onClick={() => handleSave(user)}>Lưu thay đổi</button>
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
                        <button>Cập nhật</button>
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
                        <button>Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
