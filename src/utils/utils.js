const formatData = (chartData) => {
  const labels = [],
        data = [];
  chartData.forEach((el) => {
    data.push(el[1].toFixed(1));
    labels.push(el[0]);
  });
  return {labels, data}
};

export const configureChart = (chartData, labelName, unit) => {
  const {labels, data} = chartData;
  return {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: `${labelName} price`,
          data,
          backgroundColor: "rgb(174, 305, 194)",
          borderColor: "rgb(174, 305, 194)",
          pointRadius: 0,
          borderWidth: 5,
          lineTension: 1
        },
      ],
    },
    options: {
      animation: {
        duration: 1000,
      },
      maintainAspectRatio: false,
      responsive: true,
      
      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "linear",
            time: {
              unit,
              unitStepSize: 1,
              displayFormats: {
                "day": "MMM DD YYYY",
                "month": "MMM YYYY"
              }
            }
          },
        ],
        yAxes: [
          {
            ticks: {
              callback: (value,index,values) => {
                return (index !== (values.length - 1)) ? value.toLocaleString("en-US",{style:"currency", currency:"USD"}) : "";
              },
              beginAtZero : true,
            },
            afterDataLimits: (axis) => {
              axis.max += 1;            }
          },
        ]
      },
    }   
  }
};

export const getChartData = (historyTime, data) => {
    const {week, month, year, details} = data;
    switch (historyTime) {
      case "1w":
        return {historyData: formatData(week.data.prices), details: details.data[0], unit: "day"};
      case "1m":
        return {historyData: formatData(month.data.prices), details: details.data[0], unit: "day"};
      case "1y":
        return {historyData: formatData(year.data.prices), details: details.data[0], unit: "month"};
      default:
        throw Error("Miss or wrong historyTime argument in getCharData");
    }
  };

