import React from "react";
import LineChart from "./line-chart";
import Content from "./content";
import regions from "../static/entsoe-gen-regions";
import useStyles from "./use-styles";

const eexChartParams = {
  x: "trade_date",
  yUnits: "",
  xFormat: "dd-mmm",
};

function Prices() {
  return <Content title="Prices" display={renderCharts()} />;
}

function renderCharts() {
  const pricesInputs = [
    {
      chartTitle: "De Nov-20",
      region: "de",
      maturityType: "month",
      shape: "base",
      startDate: "2020-11-01",
    },
    {
      chartTitle: "De Dec-20",
      region: "de",
      maturityType: "month",
      shape: "base",
      startDate: "2020-12-01",
    },
    {
      chartTitle: "De Jan-21",
      region: "de",
      maturityType: "month",
      shape: "base",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "De Q1-21",
      region: "de",
      maturityType: "quarter",
      shape: "base",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "De Cal-21",
      region: "de",
      maturityType: "year",
      shape: "base",
      startDate: "2021-01-01",
    },
  ];

  return pricesInputs.map((inputs) => renderPrices(inputs));
}

function renderPrices(inputs) {
  const { chartTitle, region, maturityType, startDate, shape } = inputs;
  return (
    <div key={chartTitle}>
      <LineChart
        {...getEEXPricesProps(
          {
            region: region,
            maturity_type: maturityType,
            start_date: startDate,
            shape: shape,
            from: "2020-07-01",
          },
          chartTitle
        )}
      />
    </div>
  );
}

function getEEXPricesProps(searchParams, chartTitle) {
  console.log("in getEEXPricesProps");
  var chartParams = { ...eexChartParams };
  chartParams.yConfigs = [
    { name: searchParams.region, lineColor: "blue", units: "" },
  ];
  chartParams.chartTitle = chartTitle;
  console.log(chartParams);
  return {
    urlParams: {
      apiQueryName: "EEXPrices",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default Prices;
