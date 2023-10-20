import { CHANGE_NUMBER_CART, CHANGE_ROLE } from './Contants';

const initState = {
    numberCart: 0,
};
function Reducer(state, action) {
    switch (action.type) {
        case CHANGE_NUMBER_CART:
            return { numberCart: action.payload };
        default:
            throw new Error('');
    }
}

export default Reducer;
export { initState };
