import React, { useState, useEffect } from "react";
import LineChart from "./line-chart";
import { getDateOffset } from "./format-date";
import Content from "./content";
import fuels from "../static/rte-gen-by-unit-fuels";
import useStyles from "./use-styles.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem } from "@material-ui/core";

const RTEGenByUnitChartParams = {
  x: "start_time",
  yUnits: "MW",
  xFormat: "two-line",
};

function RTEGenByUnit() {
  const [fuel, setFuel] = useState("nuclear"); 
  const [units, setUnits] = useState({});

  useEffect(() => {
    (async () => {
      const fetchedUnits = await getUnits();
      setUnits(fetchedUnits);
    })();
  }, []);

  console.log(units);
  const classes = useStyles()
  const handleChange = (event) => {
    setFuel(event.target.value);
  };
  if (units[fuel]) {
    const chartInputs = units[fuel].map((obj) => ({
      chartTitle: obj.generation_name,
      unit: obj.generation_name,
    }));
    return (
      <Content
        title="RTE Generation by Unit"
        form={rteGenByUnitForm(classes, fuel, handleChange)}
        display={renderCharts(chartInputs)}
      />
    );
  } else {
    console.log("no units found for " + fuel)
    console.log(units)
    return null;
  }
}


function rteGenByUnitForm(classes, fuel, handleChange) {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="fuel-label">Fuel</InputLabel>
      <Select
        labelId="fuel-label"
        id="fuel-select"
        value={fuel}
        onChange={handleChange}
      >
        {fuels.map((label) => (
          <MenuItem value={label} key={label}>
            {label.toUpperCase().replace(/_/g, " ")}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
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

function renderCharts(chartInputs) {
  return chartInputs.map((inputs) => renderGenByUnit(inputs));
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
