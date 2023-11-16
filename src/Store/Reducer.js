import ListProductCheckOut from '../PageCheckOut/ListProductCheckOut';
import {
    CHANGE_CLIENTSTOMP,
    CHANGE_LIST_COUNT_PRODUCT_CHECKOUT,
    CHANGE_LIST_FAVORITE,
    CHANGE_LIST_NOTIFY,
    CHANGE_LIST_PRODUCT_CHECKOUT,
    CHANGE_LIST_USERID_CHAT,
    CHANGE_MESSAGES,
    CHANGE_NUMBER_CART,
    CHANGE_NUMBER_FAVORITE,
    CHANGE_NUMBER_MESSAGES,
    CHANGE_NUMBER_MESSAGES_To_0,
    CHANGE_NUMBER_NOTIFY,
    CHANGE_PRICE_ALL,
    CHANGE_PRODUCT_UNLIKE,
    CHANGE_ROLE,
    CHANGE_TOTAL_PRICE,
    CHANGE_USER,
    CHANGE_USERFOCUS,
    DECREASE_NUMBER_NOTIFY,
    DECREASE_PRICE_ALL,
    INCREASE_PRICE_ALL,
} from './Contants';

const initState = {
    numberCart: 0,
    numberFavorite: null,
    numberNotify: null,
    listFavorite: [],
    listNotify: [],
    roleState: 'guest',
    priceAll: 0,
    listCountProductCheckOut: [],
    listProductCheckOut: [],
    totalPrice: 0,
    user: [],
    productUnlike: [],
    messages: [],
    numberMessages: 0,
    clientStomp: null,
    listUserIdChat: [],
    userFocus: sessionStorage.getItem('userFocus'),
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
        case CHANGE_NUMBER_FAVORITE:
            return { ...state, numberFavorite: action.payload };
        case CHANGE_NUMBER_NOTIFY:
            return { ...state, numberNotify: action.payload };
        case CHANGE_LIST_FAVORITE:
            return { ...state, listFavorite: action.payload };
        case CHANGE_LIST_NOTIFY:
            return { ...state, listNotify: action.payload };
        case CHANGE_PRODUCT_UNLIKE:
            return { ...state, productUnlike: action.payload };
        case CHANGE_MESSAGES:
            return { ...state, messages: [...state.messages, action.payload] };
        case CHANGE_NUMBER_MESSAGES:
            return { ...state, numberMessages: state.numberMessages + action.payload };
        case CHANGE_NUMBER_MESSAGES_To_0:
            return { ...state, numberMessages: 0 };
        case CHANGE_CLIENTSTOMP:
            return { ...state, clientStomp: action.payload };
        case CHANGE_LIST_USERID_CHAT:
            if (state.listUserIdChat.includes(action.payload)) {
                return { ...state };
            }
            return { ...state, listUserIdChat: [...state.listUserIdChat, action.payload] };
        case CHANGE_USERFOCUS:
            return { ...state, userFocus: action.payload };
        case DECREASE_NUMBER_NOTIFY:
            if (state.numberNotify > 0) {
                return { ...state, numberNotify: state.numberNotify - 1 };
            } else {
                return { ...state };
            }
        default:
            throw new Error('');
    }
}

export default Reducer;
export { initState };
