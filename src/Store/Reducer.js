import { CHANGE_NUMBER_CART } from './Contants';

const initState = {
    numberCart: 0,
};
function Reducer(state, action) {
    switch (action.type) {
        case CHANGE_NUMBER_CART:
            return {numberCart:action.payload}; 
        default:
            throw new Error('Không cập nhật được giỏ hàng');
    }
}

export { initState };
export default Reducer;
