import initialState from './initialState';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'PUTINID':
            return { productIdToView : action.productId };
        case 'UPDATEHISTORY':
            return { searchHistory : state.searchHistory.push(action.searchId)};
        case 'CLEARHISTORY':
            return { searchHistory: []};
        default:
            return state;
    }
}
