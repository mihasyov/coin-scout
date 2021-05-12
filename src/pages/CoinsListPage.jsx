import React from "react";
import AddCoin from "../components/AddCoin";
import CoinsList from "../components/CoinsList";

const CoinsListPage = () => {
  console.log("render list page");
  return (
    <div className="list-page">
      <div className="app-header">
        Coin <span>SCOUT</span>
      </div>
      <AddCoin />
      <CoinsList />
    </div>
  );
};

export default CoinsListPage;
