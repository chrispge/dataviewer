import React, { useState, useEffect } from "react";
import LineChart from "./line-chart";

const RTEGenByUnitChartParams = {
  x: "start_time",
  yUnits: "MW",
  xFormat: "two-line",
};

function RTEGenByUnit(props) {
  console.log("In RTE GenByUnit");
  // const [units, setUnits] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     const fetchedUnits = await getUnits(props.fuel);

  //     setUnits(fetchedUnits);
  //   })();
  // }, [props.fuel]);

  const units = [
    { generation_name: "TRICASTIN 1" },
    { generation_name: "TRICASTIN 2" },
  ];
  console.log(units);
  const chartInputs = units.map((obj) => ({
    chartTitle: obj.generation_name,
    unit: obj.generation_name,
  }));

  return chartInputs.map((inputs) => renderGenByUnit(inputs));
}

async function getUnits(fuel) {
  console.log("In getUnits");
  const apiQueryName = "RTEUnits";
  const url = new URL(apiQueryName, "http://localhost:3001/");
  url.search = "fuel=" + fuel;
  const response = await fetch(url);
  const data = await response.json();
  console.log(url);
  return data;
}

function renderGenByUnit(inputs) {
  const { chartTitle, unit } = inputs;
  return (
    <div key={chartTitle} className="grid-item">
      <h2 className="chart-title">{chartTitle}</h2>
      <LineChart
        {...getGenByUnitProps({
          from: "2020-10-01",
          generation_name: unit,
        })}
      />
    </div>
  );
}

function getGenByUnitProps(searchParams) {
  var chartParams = { ...RTEGenByUnitChartParams };
  chartParams.yConfigs = [{ name: "mw_value", lineColor: "blue" }];
  return {
    urlParams: {
      apiQueryName: "GenByUnit",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default RTEGenByUnit;
