import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const notifyAddToCartSussess = () => toast.success('Thêm thành công');
export const notifyWarningChooseProduct = () => toast.warning('Vui lòng chọn sản phẩm');
export default function NotificationInPage() {
    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLose={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </div>
    );
}
