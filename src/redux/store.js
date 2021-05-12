import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from './rootReducer';
import {localStorageMiddleware} from './middleware';

const getInitialState = () => {
    const watchListCoins = JSON.parse(localStorage.getItem("watchList")) || ["bitcoin"];
    return {
        loading: false,
        error: null,
        chartData: null,
        coinsData: [],
        watchListCoins
    }
}

const configureStore = () => {
    return createStore(rootReducer, getInitialState(), applyMiddleware(thunk, localStorageMiddleware));
}

export default configureStore();