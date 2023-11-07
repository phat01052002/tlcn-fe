import axios from 'axios';
import Swal from 'sweetalert2';
import { notifyErrorPhoneIsPresent } from '../NotificationInPage/NotificationInPage';
export const AlertLogout = (logOut) => {
    Swal.fire({
        title: 'Bạn có muốn thoát?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            logOut();
        } else if (result.isDenied) {
        }
    });
};
export const AlertLoginFalse = (logOut) => {
    Swal.fire({
        title: 'Tài khoản hoặc mật khẩu không đúng',
        showDenyButton: true,
        showConfirmButton: false,
        denyButtonText: `OK`,
    });
};
export const AlertDontHaveInfo = (logOut) => {
    Swal.fire({
        title: 'Hãy nhập đủ thông tin',
        showDenyButton: true,
        showConfirmButton: false,
        denyButtonText: `OK`,
    });
};
export const AlertPleaseLogin = () => {
    Swal.fire({
        title: 'Bạn có muốn đăng nhập?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/login';
        } else if (result.isDenied) {
        }
    });
};

export const AlertChangeToPageInfoUser = () => {
    Swal.fire({
        title: 'Chuyển tới trang cá nhân để chỉnh sửa ?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/infoUser';
        } else if (result.isDenied) {
        }
    });
};

export const AlertAccountIsPresent = () => {
    Swal.fire({
        title: 'Số điện thoại đã tồn tại',
        confirmButtonText: 'Ok',
    });
};
export const AlertPhoneNotExist = () => {
    Swal.fire({
        title: 'Chưa có tài khoản đăng kí bằng SĐT này',
        confirmButtonText: 'Ok',
    });
};
export const AlertVerifyPhone = (verifyPhone) => {
    Swal.fire({
        title: 'Nhập mã được gửi về điện thoại của bạn',
        input: 'number',
        inputAttributes: {
            autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: `Để sau`,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => {},
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            verifyPhone(result.value);
        } else {
            window.location = '/register';
        }
    });
};
