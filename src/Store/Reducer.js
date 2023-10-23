import { CHANGE_GMAIL, CHANGE_GMAIL_ACCESSTOKEN, CHANGE_NUMBER_CART, CHANGE_ROLE } from './Contants';

const initState = {
    numberCart: 0,
    roleState: 'guest',
    gmailAccesstoken:'',
    gmail:'',
    gmailId:''
};
function Reducer(state, action) {
    switch (action.type) {
        case CHANGE_NUMBER_CART:
            return { ...state, numberCart: action.payload };
        case CHANGE_ROLE:
            return { ...state, roleState: action.payload };
        case CHANGE_GMAIL_ACCESSTOKEN:
            return { ...state, gmailAccesstoken: action.payload };
        case CHANGE_GMAIL:
            return { ...state, gmail: action.payload };
        default:
            throw new Error('');
    }
}

export default Reducer;
export { initState };
