export const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem("watchList", JSON.stringify(getState().watchListCoins));
        return result;
    }
};