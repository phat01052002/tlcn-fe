import { Button } from '@mui/material';
import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import './NotFound.css';
export default function NotFound() {
    const handleClickHomePage = () => {
        window.location = '/';
    };
    return (
        <div className="row">
            <Header />
            <div className="col-3"></div>
            <div className="col-6 notfound">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        color="red"
                        fill="currentColor"
                        class="bi bi-ban-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM2.71 12.584c.218.252.454.488.706.707l9.875-9.875a7.034 7.034 0 0 0-.707-.707l-9.875 9.875Z" />
                    </svg>
                </div>
                <div className="noidungkhongcosan">Nội dung không có sẵn</div>
                <Button onClick={handleClickHomePage}>Trang chủ</Button>
            </div>
            <div className="col-3"></div>
            <Footer></Footer>
        </div>
    );
}
