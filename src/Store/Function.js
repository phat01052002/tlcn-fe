import axios from 'axios';
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_GRANT_TYPE,
    GOOGLE_REDIRECT_URI,
} from '../Contants/ContantsGmail';
//function to set number product in cart
export const getNumber = () => {
    var number = 0;
    for (let i = 0; i < localStorage.length; i++) {
        number += parseInt(localStorage.getItem(localStorage.key(i)));
    }
    return number;
};


