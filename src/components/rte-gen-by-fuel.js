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

// function getGenByUnitProps() {
//   return {
//     urlParams: {
//       apiQueryName: "GenByUnit",
//       searchParams: {
//         generation_name: "tricastin 1",
//         from: "2020-10-06",
//       },
//     },
//     chartParams: powerChartParams,
//   };
// }

function renderGenByFuel(inputs) {
  const { chartTitle, fuel } = inputs;
  return (
    <div key={chartTitle} className="grid-item">
      <h2 className="chart-title">{chartTitle}</h2>
      <LineChart
        {...getGenByFuelProps({
          from: "2020-10-01",
          fuel: fuel,
        })}
      />
    </div>
  );
}

function getGenByFuelProps(searchParams) {
  var chartParams = { ...RTEGenByFuelChartParams };
  chartParams.yConfigs = [{ name: "mw_value", lineColor: "blue" }];
  return {
    urlParams: {
      apiQueryName: "GenByFuel",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default RTEGenByFuel;
