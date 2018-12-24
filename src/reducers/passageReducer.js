import initialState from './initialState';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'PUTINID':
            return {...state, productIdToView : action.productId };
        case 'UPDATEHISTORY':
            return {...state, searchHistory: [...state.searchHistory, action.searchId]};
        case 'CLEARHISTORY':
            return {...state, searchHistory: []};
        case 'SETFACTORYINFO':
            return {...state, accountInformation: action.factoryinfo};
        default:
            return state;
    }
}
