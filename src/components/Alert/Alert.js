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
            window.location = '/login';
        } else if (result.isDenied) {
        }
    });
};

export const AlertAddPhone = () => {
    Swal.fire({
        title: 'Submit your Github username',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .catch((error) => {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                });
        },
        allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url,
            });
        }
    });
};
