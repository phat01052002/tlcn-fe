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
