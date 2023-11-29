import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const notifyAddToCartSussess = () => toast.success('Thêm thành công');
export const notifyUpdateSussess = () => toast.success('Cập nhật thành công');
export const notifyUpdateImgSussess = () => toast.success('Cập nhật hình đại diện thành công');
export const notifyUpdateImgFail = () => toast.error('Cập nhật hình đại diện thất bại');
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
export const notifyInfoThanks = () => toast.info('Cám ơn bạn đã đánh giá');
export const notifyErrorLeakAddress = () => toast.error('Thiếu địa chỉ giao hàng');
export const notifyErrorLeakPhone = () => toast.error('Thiếu số điện thoại');
export const notifyErrorLeakDelivery = () => toast.error('Thiếu phương thức giao hàng');
export const notifyErrorLeakPaymentMethod = () => toast.error('Thiếu phương thức thanh toán');
export const notifyErrorCantOrder = () => toast.error('Không thể đặt hàng');
export const notifySuccessOrder = () => toast.success(`Đặt hàng thành công`);
export const notifyInfoOrder = () => toast.info('Đã hết hàng');
export const notifyErrorLeakProductOrder = () => toast.error('Không có sản phẩm lựa chọn');
export const notifySuccessCanceledOrder = () => toast.success('Huỷ đơn hàng thành công');
export const notifyErrorCanceledOrder = () => toast.error('Huỷ đơn hàng thất bại');

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
