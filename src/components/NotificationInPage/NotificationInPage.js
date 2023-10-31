import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const notifyAddToCartSussess = () => toast.success('Thêm thành công');
export const notifyUpdateSussess = () => toast.success('Cập nhật thành công');
export const notifyWarningChooseProduct = () => toast.warning('Vui lòng chọn sản phẩm');
export const notifyWarningPleaseLogin = () => toast.warning('Vui lòng đăng nhập');
export const notifyErrorPhoneIsPresent = () => toast.error('Số điện thoại đã tồn tại');
export const notifyErrorVerifyPhone = () => toast.error('Không thể xác thực số điện thoại này');
export const notifyErrorRegister = () => toast.error('Đăng kí không thành công');
export const notifyWarningUpdateInfoUser = () => toast.error('Chưa nhận được thông tin cập nhật');




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
