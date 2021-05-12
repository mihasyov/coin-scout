import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Coin from "./Coin";
import { fetchCoins, deleteCoin } from "../redux/actions";

const CoinsList = ({
  fetchCoins,
  deleteCoin,
  watchListCoins,
  coinsData,
  loading,
  error,
}) => {
  const [listEmpty, setListEmpty] = useState(false);
  useEffect(() => {
    const isEmpty = watchListCoins.length === 0;
    setListEmpty(isEmpty);
    if (isEmpty === false) {
      fetchCoins(watchListCoins);
    }
  }, [fetchCoins, watchListCoins]);

  console.log("render list");
  if (loading) return <div className="app-status">Loading...</div>;
  if (error) return <div className="app-status">ERROR</div>;
  if (listEmpty) return <div className="app-status">NO coins to watch</div>;
  return (
    <ul className="coins-list list">
      {coinsData.map((coin, i) => {
        return <Coin key={i} coin={coin} deleteCoin={deleteCoin} />;
      })}
    </ul>
  );
};

const mapStateToProps = ({ watchListCoins, coinsData, loading, error }) => ({
  watchListCoins,
  coinsData,
  loading,
  error,
});

export default connect(mapStateToProps, { fetchCoins, deleteCoin })(CoinsList);
