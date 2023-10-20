import { CHANGE_NUMBER_CART, CHANGE_ROLE } from './Contants';

export const changeNumberCart = (payload) => ({
    type: CHANGE_NUMBER_CART,
    payload,
});

export const changeRole = (payload) => ({
    type: CHANGE_ROLE,
    payload,
});
