import React from "react";
import { Link } from "react-router-dom";

const Coin = ({ coin, deleteCoin }) => {
  const handleClick = (e) => {
    e.preventDefault();
    deleteCoin(coin.id);
  };

  console.log("render coin");
  return (
    <Link to={`/coins/${coin.id}`}>
      <li className="coin-item">
        <img className="coin-image" src={coin.image} alt="" />
        <div className="coin-name">{coin.name}</div>
        <span className="a">
          <sup>$</sup>
          {coin.current_price}
        </span>

        <span
          className={
            coin.price_change_percentage_24h < 0
              ? "text-danger"
              : "text-success"
          }
        >
          {coin.price_change_percentage_24h < 0 ? (
            <i className="fas fa-sort-down"></i>
          ) : (
            <i className="fas fa-sort-up"></i>
          )}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>
        <i
          onClick={handleClick}
          className="delete-icon far fa-times-circle"
        ></i>
      </li>
    </Link>
  );
};

export default Coin;
