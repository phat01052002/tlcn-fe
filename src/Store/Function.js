//function to set number product in cart
export const getNumber = () => {
    var number = 0;
    for (let i = 0; i < localStorage.length; i++) {
        number += parseInt(JSON.parse(localStorage.getItem(localStorage.key(i))).count);
    }
    return number;
};

//fuction change product check is false in cart
export const changeCheckToFalse = () => {
    for (var i = 0; i < localStorage.length; i++) {
        localStorage.setItem(
            localStorage.key(i),
            JSON.stringify({
                count: JSON.parse(localStorage.getItem(localStorage.key(i))).count,
                check: false,
            }),
        );
    }
};

//function format price
export const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
});

export const getToCheckOut = () => {
    //var to get products in cart are checked
    var productInCartCheck = [];
    for (var i = 0; i < localStorage.length; i++) {
        if (JSON.parse(localStorage.getItem(localStorage.key(i))).check == true) {
            //if product is checked,we add them to 'checkout'
            productInCartCheck = [
                {
                    productId: JSON.parse(localStorage.key(i)),
                    count: JSON.parse(localStorage.getItem(localStorage.key(i))).count,
                },
                ...productInCartCheck,
            ];
        }
    }
    return productInCartCheck;
};

export const removeAllSession = () => {
    sessionStorage.removeItem('USER');
    sessionStorage.removeItem('checkout');
    sessionStorage.removeItem('totalPrice');
};

export const handleClickBack = () => {
    window.location = '/';
};
