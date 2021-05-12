import React, { useRef, useEffect, useState } from "react";
import { getChartData, configureChart } from "../utils/utils";
import Chartjs from "chart.js";
const HistoryChart = ({ chartData }) => {
  const chartRef = useRef();
  const [historyTime, setHistoryTime] = useState("1w");
  const [activeBtn, setActiveBtn] = useState("1w");

  const { historyData, details, unit } = getChartData(historyTime, chartData);
  useEffect(() => {
    const chartInstance = new Chartjs(
      chartRef.current,
      configureChart(historyData, details.name, unit)
    );
    return () => {
      chartInstance.destroy();
    };
  }, [historyData, details, unit]);

  const handleClick = (e) => {
    setHistoryTime(e.target.value);
    setActiveBtn(e.target.value);
  };

  return (
    <>
      <div>
        <canvas ref={chartRef} id="myChart" width={800} height={400}></canvas>
      </div>

      <div className="chart-buttons">
        <button
          onClick={handleClick}
          className={activeBtn === "1w" ? "btn-history active" : "btn-history"}
          value="1w"
        >
          1w
        </button>
        <button
          onClick={handleClick}
          className={activeBtn === "1m" ? "btn-history active" : "btn-history"}
          value="1m"
        >
          1m
        </button>
        <button
          onClick={handleClick}
          className={activeBtn === "1y" ? "btn-history active" : "btn-history"}
          value="1y"
        >
          1y
        </button>
      </div>
    </>
  );
};

export default HistoryChart;
