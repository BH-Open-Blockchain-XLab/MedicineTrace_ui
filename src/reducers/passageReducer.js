import initialState from './initialState';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'PUTINID':
            return { productIdToView : action.productId };
        case 'CLEARID':
            return { productIdToView : ""};
        default:
            return state;
    }
}
