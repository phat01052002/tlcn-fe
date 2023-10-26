import ListProductCheckOut from '../PageCheckOut/ListProductCheckOut';
import {
    CHANGE_LIST_COUNT_PRODUCT_CHECKOUT,
    CHANGE_LIST_PRODUCT_CHECKOUT,
    CHANGE_NUMBER_CART,
    CHANGE_PRICE_ALL,
    CHANGE_ROLE,
    CHANGE_TOTAL_PRICE,
    CHANGE_USER,
    DECREASE_PRICE_ALL,
    INCREASE_PRICE_ALL,
} from './Contants';

const initState = {
    numberCart: 0,
    roleState: 'guest',
    priceAll: 0,
    listCountProductCheckOut: [],
    listProductCheckOut: [],
    totalPrice: 0,
    user: [],
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
        case CHANGE_LIST_COUNT_PRODUCT_CHECKOUT:
            return { ...state, listCountProductCheckOut: action.payload };
        case CHANGE_LIST_PRODUCT_CHECKOUT:
            return { ...state, listProductCheckOut: action.payload };
        case CHANGE_TOTAL_PRICE:
            return { ...state, totalPrice: action.payload };
        case CHANGE_USER:
            return { ...state, user: action.payload };
        default:
            throw new Error('');
    }
}

export default Reducer;
export { initState };
