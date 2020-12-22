import React, { useState } from "react";
import LineChart from "./line-chart";
import Content from "./content";
import spotRegions from "../static/spot-regions";
import useStyles from "./use-styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";

const spotChartParams = {
  x: "start_time",
  yUnits: "",
  xFormat: "dd-mmm",
};

function Prices() {
  console.log("in Prices")
  const [region, setRegion] = useState("de_lu");

  const handleChange = (event) => {
    setRegion(event.target.value);
  };
  const classes = useStyles();
  console.log("region: " + region)
  return (
    <Content
      title="Spot"
      form={spotForm(classes, region, handleChange)}
      display={renderCharts(region)}
    />
  );
}

function spotForm(classes, region, handleChange) {
  console.log("in spotForm")
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="region-label">Region</InputLabel>
      <Select
        labelId="region-label"
        id="region-select"
        value={region}
        onChange={handleChange}
      >
        {spotRegions.map((label) => (
          <MenuItem value={label} key={label}>
            {label.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function renderCharts(region) {
  console.log("in renderCharts")
  const pricesInputs =   {
      chartTitle: "Test Chart",
      region: region,
      from: "2020-12-20", 
    };

  return renderPrices(pricesInputs);
}

function renderPrices(inputs) {
  console.log("in renderPrices")
  const { chartTitle, region, from, to} = inputs;
  return (
    <div key={chartTitle}>
      <LineChart
        {...getSpotPricesProps(
          {
            region: region,
            from: from, 
            to: to, 
          },
          chartTitle
        )}
      />
    </div>
  );
}

function getSpotPricesProps(searchParams, chartTitle) {
  console.log("in getSpotPricesProps");
  var chartParams = { ...spotChartParams };
  chartParams.yConfigs = [
    { name: searchParams.region, lineColor: "blue", units: "" },
  ];
  chartParams.chartTitle = chartTitle;
  console.log(chartParams);
  return {
    urlParams: {
      apiQueryName: "EntsoeDA",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default Prices;
