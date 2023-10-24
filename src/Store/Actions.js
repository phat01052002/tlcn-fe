import { CHANGE_NUMBER_CART,INCREASE_PRICE_ALL,DECREASE_PRICE_ALL, CHANGE_ROLE, CHANGE_PRICE_ALL } from './Contants';

export const changeNumberCart = (payload) => ({
    type: CHANGE_NUMBER_CART,
    payload,
});

export const changeRole = (payload) => ({
    type: CHANGE_ROLE,
    payload,
});
export const changePriceAll= (payload) => ({
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

