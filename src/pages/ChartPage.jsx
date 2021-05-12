import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import HistoryChart from "../components/HistoryChart";
import { fetchChartData } from "../redux/actions";

const ChartPage = ({ loading, error, chartData, fetchChartData }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchChartData(id);
  }, [fetchChartData, id]);

  console.log("render chart page");
  if (loading || !chartData) {
    return <div className="app-status">Loading....</div>;
  }
  if (error) {
    return <div className="app-status">Error {error.message}</div>;
  }

  if (chartData) {
    return (
      <div className="chart-page">
        <Link to="/">&#8678; back to list</Link>
        <HistoryChart chartData={chartData} />
      </div>
    );
  }
};

const mapStateToProps = ({ chartData, loading, error }) => ({
  chartData,
  loading,
  error,
});

export default connect(mapStateToProps, { fetchChartData })(ChartPage);
