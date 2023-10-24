import {
    CHANGE_GMAIL,
    CHANGE_GMAIL_ACCESSTOKEN,
    CHANGE_NUMBER_CART,
    CHANGE_PRICE_ALL,
    CHANGE_ROLE,
    DECREASE_PRICE_ALL,
    INCREASE_PRICE_ALL,
} from './Contants';

const initState = {
    numberCart: 0,
    roleState: 'guest',
    priceAll: 0,
};
function Reducer(state, action) {
    switch (action.type) {
        case CHANGE_NUMBER_CART:
            return { ...state, numberCart: action.payload };
        case CHANGE_ROLE:
            return { ...state, roleState: action.payload };
        case CHANGE_PRICE_ALL:
            return { ...state, priceAll: action.payload };
        case DECREASE_PRICE_ALL:
            return { ...state, priceAll: state.priceAll - action.payload };
        case INCREASE_PRICE_ALL:
            return { ...state, priceAll: state.priceAll + action.payload };
        default:
            throw new Error('');
    }
}

export default Reducer;
export { initState };
