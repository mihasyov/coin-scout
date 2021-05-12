import React, { useState } from "react";
import { connect } from "react-redux";
import { addToWatchList } from "../redux/actions";

const availableCoins = [
  "bitcoin",
  "bitcoin-cash",
  "binancecoin",
  "cardano",
  "eos",
  "ethereum",
  "ethereum-classic",
  "iota",
  "litecoin",
  "nem",
  "okb",
  "ripple",
  "tether",
  "tezos",
  "usd-coin",
];

const AddCoin = ({ dispatch }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (coin) => {
    dispatch(addToWatchList(coin));
    setIsActive(false);
  };

  console.log("render add button");
  return (
    <>
      <div className="dropdown">
        <button
          onClick={() => setIsActive(!isActive)}
          className={isActive ? "btn active" : "btn"}
          type="button"
        >
          Add Coin
        </button>
        <div
          className={
            isActive ? "dropdown-menu list show" : "dropdown-menu list"
          }
        >
          {availableCoins.map((el, i) => (
            <div
              key={i}
              onClick={() => handleClick(el)}
              className="dropdown-item"
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className="line"></div>
    </>
  );
};

export default connect()(AddCoin);
