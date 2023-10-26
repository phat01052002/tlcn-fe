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

export const AlertAddPhone = () => {
    Swal.fire({
        title: 'Thêm số điện thoại cho lần đầu đăng nhập',
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
            const accessToken = JSON.parse(sessionStorage.getItem('USER')).token;
            var config = {
                method: 'post',
                url: `/user/addPhone/${result.value}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            axios
                .request(config)
                .then((response) => {
                    if (response.status == 204) {
                        notifyErrorPhoneIsPresent();
                        AlertAddPhone();
                    } else {
                        window.location = '/';
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            window.location = '/';
        }
    });
};
export const AlertAccountIsPresent = () => {
    Swal.fire({
        title: 'Số điện thoại đã tồn tại',
        confirmButtonText: 'Ok',
    });
};
