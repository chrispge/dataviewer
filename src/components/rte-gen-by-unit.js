import React, { useState, useEffect } from "react";
import LineChart from "./line-chart";
import { getDateOffset } from "./format-date";

const RTEGenByUnitChartParams = {
  x: "start_time",
  yUnits: "MW",
  xFormat: "two-line",
};

function RTEGenByUnit(props) {
  console.log("In RTE GenByUnit");
  const { fuel } = props;
  console.log("fuel=" + fuel);
  const [units, setUnits] = useState({});
  console.log("units: ");
  console.log(units);

  useEffect(() => {
    (async () => {
      const fetchedUnits = await getUnits();
      setUnits(fetchedUnits);
    })();
  }, []);

  console.log(units);
  if (units[fuel]) {
    const chartInputs = units[fuel].map((obj) => ({
      chartTitle: obj.generation_name,
      unit: obj.generation_name,
    }));
    return chartInputs.map((inputs) => renderGenByUnit(inputs));
  } else {
    return null;
  }
}

async function getUnitsFromDB(fuel) {
  const apiQueryName = "RTEUnits";
  const url = new URL(
    apiQueryName,
    "https://sleepy-refuge-42158.herokuapp.com/"
  );
  url.search = "fuel=" + fuel;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getUnits(fuel) {
  const response = await fetch("/rte-gen-by-unit/units.json");
  const data = await response.json();
  return data[0];
}

function renderGenByUnit(inputs) {
  const { chartTitle, unit } = inputs;
  const from = getDateOffset(-3);
  return (
    <div key={chartTitle}>
      <LineChart
        {...getGenByUnitProps(
          {
            generation_name: unit,
            from: from,
          },
          chartTitle
        )}
      />
    </div>
  );
}

function getGenByUnitProps(searchParams, chartTitle) {
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
