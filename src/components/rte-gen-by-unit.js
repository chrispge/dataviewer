import React, { useState, useEffect } from "react";
import LineChart from "./line-chart";

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
  console.log(units);
  if (units.length > 0) {
    const chartInputs = units.map((obj) => ({
      chartTitle: obj.generation_name,
      unit: obj.generation_name,
    }));
    return chartInputs.map((inputs) => renderGenByUnit(inputs));
  } else {
    return <div>Loading...</div>;
  }
}

function renderGenByUnit(inputs) {
  const { chartTitle, unit } = inputs;
  return (
    <div key={chartTitle}>
      <LineChart
        {...getGenByUnitProps(
          {
            generation_name: unit,
            from: "2020-10-01",
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
