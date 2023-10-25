import Swal from 'sweetalert2';
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
            window.location='/login'
        } else if (result.isDenied) {
        }
    });
};

export const AlertAccountIsPresent = () => {
    Swal.fire({
        title: 'Số điện thoại đã tồn tại',
        confirmButtonText: 'Ok',
    })
};
