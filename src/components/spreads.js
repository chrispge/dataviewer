import React from "react";
import LineChart from "./line-chart";

const eexChartParams = {
  x: "trade_date",
  yUnits: "",
  xFormat: "dd-mmm",
};

function Spreads() {
  const frDeInputs = [
    {
      chartTitle: "Fr-De Oct-20",
      maturityType: "month",
      startDate: "2020-10-01",
    },
    {
      chartTitle: "Fr-De Nov-20",
      maturityType: "month",
      startDate: "2020-11-01",
    },
    {
      chartTitle: "Fr-De Dec-20",
      maturityType: "month",
      startDate: "2020-12-01",
    },
    {
      chartTitle: "Fr-De Jan-21",
      maturityType: "month",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "Fr-De Feb-21",
      maturityType: "month",
      startDate: "2021-02-01",
    },
    {
      chartTitle: "Fr-De Mar-21",
      maturityType: "month",
      startDate: "2021-03-01",
    },
    {
      chartTitle: "Fr-De Q4-20",
      maturityType: "quarter",
      startDate: "2020-10-01",
    },
    {
      chartTitle: "Fr-De Q1-21",
      maturityType: "quarter",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "Fr-De Cal-21",
      maturityType: "year",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "Fr-De Cal-22",
      maturityType: "year",
      startDate: "2022-01-01",
    },
  ];

  return [frDeInputs[0]].map((inputs) => renderFrDe(inputs));
}

function renderFrDe(inputs) {
  const { chartTitle, maturityType, startDate } = inputs;
  return (
    <div key={chartTitle} className="grid-item">
      <h2 className="chart-title">{chartTitle}</h2>
      <LineChart
        {...getEEXSpreadsProps({
          from: "2020-07-01",
          region1: "fr",
          region2: "de",
          maturityType: maturityType,
          shape: "base",
          startDate: startDate,
        })}
      />
    </div>
  );
}

function getEEXSpreadsProps(searchParams) {
  console.log("in getEEXSpreadsProps");
  var chartParams = { ...eexChartParams };
  chartParams.yConfigs = [
    { name: searchParams.region1, lineColor: "blue", units: "" },
    { name: searchParams.region2, lineColor: "red", units: "" },
    {
      name: searchParams.region1.concat("-", searchParams.region2),
      lineColor: "green",
      units: "",
    },
  ];
  console.log(chartParams);
  return {
    urlParams: {
      apiQueryName: "EEXSpreads",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default Spreads;
