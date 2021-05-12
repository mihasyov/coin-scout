import {
    DATA_LOADING,
    ADD_COIN_SUCCESS,
    DATA_FETCH_ERROR,
    DELETE_COIN,
    ADD_TO_WATCH_LIST,
    CHART_DATA_SUCCESS
} from "./types";

export const rootReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_WATCH_LIST:
            if( state.watchListCoins.includes(action.payload)) return state;
            return {
                ...state,
                watchListCoins: [ ...state.watchListCoins, action.payload]
            };
        case DELETE_COIN:
            return {
                ...state,
                watchListCoins: [ ...state.watchListCoins.filter(coin => coin !== action.payload) ]
            };
        case DATA_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_COIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                coinsData: [ ...action.payload ]
            };
        case CHART_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                chartData: { ...action.payload }
            };
        case DATA_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}