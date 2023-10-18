import React, { useState, useEffect } from 'react';
import './DesignPage.css';
import Header from '../components/Header/Header';
import axios from 'axios';
export default function DesignPage() {
    const [role, setRole] = useState('');
    //check authenticate
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
            setRole('user');
        } catch {
            setRole('guest');
        }
    };
    useEffect(() => {
        checkUser();
    }, []);
    return (
        <div>
            <Header role={role} />
            <div className="design-page">
                <div className="design-page-img">
                    <div className="design-text">
                        <h1>THIẾT KẾ NỘI THẤT</h1>
                        <br />
                        <h6>
                            Hẹn gặp ngay đội ngũ chuyên nghiệp và giàu kinh nghiệm để được tư vấn những giải pháp hoàn
                            thiện nội thất cho ngôi nhà của bạn.
                        </h6>
                        <br />
                        <h3>Liên hệ ngay : 0865762255</h3>
                    </div>
                </div>
                <div className="row get-info-design">
                    <div className="col-6 info-img"></div>
                    <div className="col-6">
                        <h3>Đăng ký tư vấn tại nhà</h3>
                        <h6>
                            Hẹn gặp ngay tư vấn thiết kế nội thất tại nhà bằng cách để lại thông tin tại form dưới đây
                        </h6>
                        <div className="info-form">
                            <div className="name">
                                <h5>Tên của bạn</h5>
                                <input className="form-control"></input>
                            </div>
                            <div className="phone">
                                <h5>Điện thoại của bạn</h5>
                                <input className="form-control"></input>
                            </div>
                            <div className="mail">
                                <h5>Email của bạn</h5>
                                <input className="form-control"></input>
                            </div>
                            <div className="address">
                                <h5>Địa chỉ</h5>
                                <input className="form-control"></input>
                            </div>
                            <div className="request">
                                <h5>Yêu cầu của bạn</h5>
                                <input className="form-control"></input>
                            </div>
                            <br />
                            <button className="btn btn-primary">Gửi yêu cầu</button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn-mess">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-messenger icon-chat"
                    viewBox="0 0 16 16"
                >
                    <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
                </svg>
            </button>
        </div>
    );
}
