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