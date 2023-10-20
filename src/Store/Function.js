//function to set number product in cart
export const getNumber = () => {
    var number = 0;
    for (let i = 0; i < localStorage.length; i++) {
        number += parseInt(localStorage.getItem(localStorage.key(i)));
    }
    return number;
};
