import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const notifyAddToCartSussess = () => toast.success('Thêm thành công');
export const notifyUpdateSussess = () => toast.success('Cập nhật thành công');
export const notifyOTPSussess = () => toast.success('Đã gửi OTP');
export const notifyVerifySussess = () => toast.success('Verify thành công');
export const notifyWarningChooseProduct = () => toast.warning('Vui lòng chọn sản phẩm');
export const notifyWarningPleaseLogin = () => toast.warning('Vui lòng đăng nhập');
export const notifyErrorPhoneIsPresent = () => toast.error('Số điện thoại đã tồn tại');
export const notifyErrorGetOTPPhone = () => toast.error('Không thể xác thực số điện thoại này');
export const notifyErrorVerifyPhone = () => toast.error('OTP không chính xác');
export const notifyErrorIsNotVerify = () => toast.error('Chưa xác thực số điện thoại này');
export const notifyErrorRegister = () => toast.error('Đăng kí không thành công');
export const notifyWarningUpdateInfoUser = () => toast.error('Chưa nhận được thông tin cập nhật');
export const notifyErrorPassword = () => toast.error('Mật khẩu không đúng');





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
