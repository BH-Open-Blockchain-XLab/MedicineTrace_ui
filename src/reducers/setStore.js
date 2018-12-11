import {createStore} from 'redux';
import rootReducer from './rootReducer';

export default function setStore() {
    return createStore(rootReducer);
}