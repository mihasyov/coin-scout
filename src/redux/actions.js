import {
    DATA_LOADING,
    ADD_COIN_SUCCESS,
    DATA_FETCH_ERROR,
    DELETE_COIN,
    ADD_TO_WATCH_LIST,
    CHART_DATA_SUCCESS
} from "./types";
import coinGeckoApi from "../api/coinGeckoApi";


export const addToWatchList = (coin) => ({
    type: ADD_TO_WATCH_LIST,
    payload: coin
});

export const deleteCoin = (coin) => ({
    type: DELETE_COIN,
    payload: coin
});

export const fetchCoins = coins => dispatch => {
    dispatch( dataLoading());
    coinGeckoApi.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
          ids: coins.join(",")
        },
      })
      .then(resp => {
          dispatch(addCoinSuccess(resp.data))
      })
      .catch(err => dispatch(dataFetchError(err)))
};

export const fetchChartData = id => dispatch => {
    dispatch( dataLoading());
    Promise.all([
        coinGeckoApi.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGeckoApi.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "30",
          },
        }),
        coinGeckoApi.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        coinGeckoApi.get("/coins/markets/", {
          params: {
            vs_currency: "usd",
            ids: id,
          },
        }),
      ])
        .then(resp => {
          const [week, month, year, details] = resp;
          dispatch(chartDataSuccess({week, month, year, details}));
        })
        .catch(err => dispatch(dataFetchError(err)))
};

const dataLoading = () => ({
    type: DATA_LOADING
});

const addCoinSuccess = (data) => ({
    type: ADD_COIN_SUCCESS,
    payload: [
        ...data
    ]
});

const chartDataSuccess = (chartData) => ({
    type: CHART_DATA_SUCCESS,
    payload: {
        ...chartData
    }
});

const dataFetchError = (error) => ({
    type: DATA_FETCH_ERROR,
    payload: error
});
