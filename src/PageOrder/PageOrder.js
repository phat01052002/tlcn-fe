import React, { useCallback, useState } from 'react';
import Header from '../components/Header/Header';
import './PageOrder.css';
export default function PageOrder() {
    const [focusOrder, setFocusOrder] = useState(1);
    //tất cả sản phẩm
    const handleClickFocus1 = useCallback(() => {
        setFocusOrder(1);
    }, []);
    //Đang xử lý
    const handleClickFocus2 = useCallback(() => {
        setFocusOrder(2);
    }, []);
    //Đang vận chuyển
    const handleClickFocus3 = useCallback(() => {
        setFocusOrder(3);
    }, []);
    //Đã giao
    const handleClickFocus4 = useCallback(() => {
        setFocusOrder(4);
    }, []);
    //Đã huỷ
    const handleClickFocus5 = useCallback(() => {
        setFocusOrder(5);
    }, []);
    return (
        <div className="page-order">
            <Header />
            <div className="title-page-order">Đơn hàng của tôi</div>
            <div className="page-order-content row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className=" header-page-content">
                        <div
                            className={`header-page-content-nav ${focusOrder == 1 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus1}
                        >
                            Tất cả đơn
                        </div>
                        <div
                            className={`header-page-content-nav ${focusOrder == 2 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus2}
                        >
                            Đang xử lý
                        </div>
                        <div
                            className={`header-page-content-nav ${focusOrder == 3 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus3}
                        >
                            Đang vận chuyển
                        </div>
                        <div
                            className={`header-page-content-nav ${focusOrder == 4 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus4}
                        >
                            Đã giao
                        </div>
                        <div
                            className={`header-page-content-nav ${focusOrder == 5 ? 'focus-order' : ''}`}
                            onClick={handleClickFocus5}
                        >
                            Đã huỷ
                        </div>
                    </div>
                    <div className="list-product-order"></div>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
}
