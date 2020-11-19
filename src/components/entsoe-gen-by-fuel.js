import React from "react";
import LineChart from "./line-chart";
import { getDateOffset } from "./format-date";

const EntsoeGenByFuelChartParams = {
  x: "start_time",
  yUnits: "MW",
  xFormat: "two-line",
};

function EntsoeGenByFuel() {
  const chartInputs = [
    { chartTitle: "Nuclear", fuel: "nuclear" },
    { chartTitle: "Gas", fuel: "fossil gas" },
    { chartTitle: "Coal", fuel: "fossil hard coal" },
    { chartTitle: "Lignite", fuel: "fossil brown coal/lignite" },
    { chartTitle: "Gas from coal", fuel: "fossil coal-derived gas" },
    { chartTitle: "Hydro Reservoir", fuel: "hydro water reservoir" },
    {
      chartTitle: "Hydro Run-of-river",
      fuel: "hydro run of river and poundage",
    },
    { chartTitle: "Hydro Pumped Storage", fuel: "hydro pumped storage" },
    { chartTitle: "Geothermal", fuel: "geothermal" },
    { chartTitle: "Wind onshore", fuel: "wind onshore" },
    { chartTitle: "Wind offshore", fuel: "wind offshore" },
    { chartTitle: "Solar", fuel: "solar" },
    { chartTitle: "Other Renewable", fuel: "other renewable" },

    { chartTitle: "Oil", fuel: "fossil oil" },
    { chartTitle: "Shale Oil", fuel: "fossil oil shale" },
    { chartTitle: "Biomass", fuel: "biomass" },
    { chartTitle: "Waste", fuel: "waste" },
    { chartTitle: "Peat", fuel: "peat" },
    { chartTitle: "Marine", fuel: "marine" },
    { chartTitle: "Other", fuel: "other" },
  ];

  return chartInputs.map((inputs) => renderEntsoeGenByFuel(inputs));
}

function renderEntsoeGenByFuel(inputs) {
  const { chartTitle, fuel } = inputs;
  const from = getDateOffset(-3);
  return (
    <div key={chartTitle}>
      <LineChart
        {...getEntsoeGenByFuelProps(
          {
            from: from,
            fuel: fuel,
            region_display: "FR",
          },
          chartTitle
        )}
      />
    </div>
  );
}

function getEntsoeGenByFuelProps(searchParams, chartTitle) {
  var chartParams = { ...EntsoeGenByFuelChartParams };
  chartParams.yConfigs = [{ name: "mw_value", lineColor: "blue", units: "MW" }];
  chartParams.chartTitle = chartTitle;
  return {
    urlParams: {
      apiQueryName: "EntsoeGenByType",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default EntsoeGenByFuel;
