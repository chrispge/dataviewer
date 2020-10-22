import React from "react";
import LineChart from "./line-chart";

const RTEGenByFuelChartParams = {
  x: "start_time",
  yUnits: "MW",
  xFormat: "two-line",
};

function RTEGenByFuel() {
  const chartInputs = [
    { chartTitle: "Nuclear", fuel: "nuclear" },
    { chartTitle: "Gas", fuel: "fossil_gas" },
    { chartTitle: "Coal", fuel: "fossil_hard_coal" },
    { chartTitle: "Hydro Reservoir", fuel: "hydro_water_reservoir" },
    {
      chartTitle: "Hydro Run-of-river",
      fuel: "hydro_run_of_river_and_poundage",
    },
    { chartTitle: "Hydro Pumped Storage", fuel: "hydro_pumped_storage" },
    { chartTitle: "Wind", fuel: "wind_onshore" },
    { chartTitle: "Solar", fuel: "solar" },
    { chartTitle: "Oil", fuel: "fossil_oil" },
    { chartTitle: "Biomass", fuel: "biomass" },
    { chartTitle: "Waste", fuel: "waste" },
  ];

  return chartInputs.map((inputs) => renderGenByFuel(inputs));
}

function renderGenByFuel(inputs) {
  const { chartTitle, fuel } = inputs;
  return (
    <div key={chartTitle}>
      <LineChart
        {...getGenByFuelProps(
          {
            from: "2020-10-01",
            fuel: fuel,
          },
          chartTitle
        )}
      />
    </div>
  );
}

function getGenByFuelProps(searchParams, chartTitle) {
  var chartParams = { ...RTEGenByFuelChartParams };
  chartParams.yConfigs = [{ name: "mw_value", lineColor: "blue", units: "MW" }];
  chartParams.chartTitle = chartTitle;
  return {
    urlParams: {
      apiQueryName: "GenByFuel",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default RTEGenByFuel;
