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
        </div>
    );
}
