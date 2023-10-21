import { CHANGE_NUMBER_CART, CHANGE_ROLE } from './Contants';

const initState = {
    numberCart: 0,
    roleState: 'guest',
};
function Reducer(state, action) {
    switch (action.type) {
        case CHANGE_NUMBER_CART:
            return { ...state, numberCart: action.payload };
        case CHANGE_ROLE:
            return { ...state, roleState: action.payload };
        default:
            throw new Error('');
    }
}

export default Reducer;
export { initState };
