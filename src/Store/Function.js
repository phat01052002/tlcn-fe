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

//GET GMAIL
export const getGmailAccesstoken = (gmailCode) => {
    if (gmailCode != '') {
        try {
            let data = JSON.stringify({
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                code: gmailCode,
                grant_type: GOOGLE_GRANT_TYPE,
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://accounts.google.com/o/oauth2/token',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            axios
                .request(config)
                .then((res) => ( console.log( res.data.access_token)))
                .catch((err) => console.log(err));
        } catch (e) {
            alert('Không thể đăng nhập bằng email này');
        }
    }
};
export const getGmail = (gmailAccesstoken) => {
    if (gmailAccesstoken != '') {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${gmailAccesstoken}`,
            headers: {},
        };
        axios
            .request(config)
            .then((res) => console.log(res.data.email))
            .catch((err) => console.log(err));
    }
};
