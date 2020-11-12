import React, { useState, useEffect } from "react";
import LineChart from "./line-chart";
import {getDateOffset} from "./format-date"; 

const RTEGenByUnitChartParams = {
  x: "start_time",
  yUnits: "MW",
  xFormat: "two-line",
};

function RTEGenByUnit(props) {
  console.log("In RTE GenByUnit");
  const [units, setUnits] = useState([]);
  useEffect(() => {
    (async () => {
      const fetchedUnits = await getUnits(props.fuel);

      setUnits(fetchedUnits);
    })();
  }, [props.fuel]);

  // const units = [
  //   { generation_name: "TRICASTIN 1" },
  //   { generation_name: "TRICASTIN 2" },
  // ];
  if (units.length > 0) {
    const chartInputs = units.map((obj) => ({
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
  const response = await fetch("./units/units.json");
  const data = await response.json();
  return data[0][fuel];
}

function renderGenByUnit(inputs) {
  const { chartTitle, unit } = inputs;
  const from = getDateOffset(-3)
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
