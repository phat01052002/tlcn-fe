import {
    CHANGE_NUMBER_CART,
    INCREASE_PRICE_ALL,
    DECREASE_PRICE_ALL,
    CHANGE_ROLE,
    CHANGE_PRICE_ALL,
    CHANGE_LIST_COUNT_PRODUCT_CHECKOUT,
    CHANGE_LIST_PRODUCT_CHECKOUT,
    CHANGE_TOTAL_PRICE,
    CHANGE_USER,
    CHANGE_NUMBER_FAVORITE,
    CHANGE_NUMBER_NOTIFY,
    CHANGE_LIST_FAVORITE,
    CHANGE_LIST_NOTIFY,
    CHANGE_PRODUCT_UNLIKE,
    CHANGE_MESSAGES,
    CHANGE_NUMBER_MESSAGES,
    CHANGE_NUMBER_MESSAGES_To_0,
    CHANGE_CLIENTSTOMP,
    CHANGE_LIST_USERID_CHAT,
    CHANGE_USERFOCUS,
    DECREASE_NUMBER_NOTIFY,
} from './Contants';

export const changeNumberCart = (payload) => ({
    type: CHANGE_NUMBER_CART,
    payload,
});

export const changeRole = (payload) => ({
    type: CHANGE_ROLE,
    payload,
});
export const changePriceAll = (payload) => ({
    type: CHANGE_PRICE_ALL,
    payload,
});

export const increasePriceAll = (payload) => ({
    type: INCREASE_PRICE_ALL,
    payload,
});
export const decreasePriceAll = (payload) => ({
    type: DECREASE_PRICE_ALL,
    payload,
});

export const changeListCountProductCheckOut = (payload) => ({
    type: CHANGE_LIST_COUNT_PRODUCT_CHECKOUT,
    payload,
});
export const changeListProductCheckOut = (payload) => ({
    type: CHANGE_LIST_PRODUCT_CHECKOUT,
    payload,
});

export const changeTotalPrice = (payload) => ({
    type: CHANGE_TOTAL_PRICE,
    payload,
});

export const changeUser = (payload) => ({
    type: CHANGE_USER,
    payload,
});

export const changeNumberFavorite = (payload) => ({
    type: CHANGE_NUMBER_FAVORITE,
    payload,
});

export const changeNumberNotify = (payload) => ({
    type: CHANGE_NUMBER_NOTIFY,
    payload,
});

export const changeListFavorite = (payload) => ({
    type: CHANGE_LIST_FAVORITE,
    payload,
});

export const changeListNotify = (payload) => ({
    type: CHANGE_LIST_NOTIFY,
    payload,
});

export const changeProductUnlike = (payload) => ({
    type: CHANGE_PRODUCT_UNLIKE,
    payload,
});

export const changeMessages = (payload) => ({
    type: CHANGE_MESSAGES,
    payload,
});

export const changeNumberMessages = (payload) => ({
    type: CHANGE_NUMBER_MESSAGES,
    payload,
});

export const changeNumberMessagesTo0 = (payload) => ({
    type: CHANGE_NUMBER_MESSAGES_To_0,
    payload,
});

export const changeClientStomp = (payload) => ({
    type: CHANGE_CLIENTSTOMP,
    payload,
});

export const changeListUserIdChat = (payload) => ({
    type: CHANGE_LIST_USERID_CHAT,
    payload,
});

export const changeUserFocus = (payload) => ({
    type: CHANGE_USERFOCUS,
    payload,
});

export const decreaseNumerNotify = (payload) => ({
    type: DECREASE_NUMBER_NOTIFY,
    payload,
});
