import React from "react";
import LineChart from "./line-chart";

const RTEGenByUnitChartParams = {
  x: "start_time",
  yUnits: "MW",
  xFormat: "two-line",
};

function RTEGenByUnit(props) {
  console.log("In RTE GenByUnit");
  const { fuel } = props;
  const chartInputs = [{ chartTitle: "Nogent 1", unit: "nogent 1" }];

  return chartInputs.map((inputs) => renderGenByUnit(fuel, inputs));
}

function renderGenByUnit(fuel, inputs) {
  const { chartTitle, unit } = inputs;
  return (
    <div key={chartTitle}>
      <LineChart
        {...getGenByUnitProps(
          {
            fuel: fuel,
            generation_name: unit,
            from: "2020-10-01",
          },
          chartTitle,
          fuel
        )}
      />
    </div>
  );
}

function getGenByUnitProps(searchParams, chartTitle, fuel) {
  var chartParams = { ...RTEGenByUnitChartParams };
  chartParams.yConfigs = [{ name: "mw_value", lineColor: "blue", units: "MW" }];
  chartParams.chartTitle = chartTitle;
  return {
    urlParams: {
      apiQueryName: "GenByUnit",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default RTEGenByUnit;
