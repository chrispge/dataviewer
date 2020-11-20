import React, { useState } from "react";
import LineChart from "./line-chart";
import Content from "./content";
import regions from "../static/prices-regions";
import useStyles from "./use-styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";

const eexChartParams = {
  x: "trade_date",
  yUnits: "",
  xFormat: "dd-mmm",
};

function Prices() {
  const [region, setRegion] = useState("de");

  const handleChange = (event) => {
    setRegion(event.target.value);
  };
  const classes = useStyles();
  return (
    <Content
      title="Prices"
      form={pricesForm(classes, region, handleChange)}
      display={renderCharts(region)}
    />
  );
}

function pricesForm(classes, region, handleChange) {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="region-label">Region</InputLabel>
      <Select
        labelId="region-label"
        id="region-select"
        value={region}
        onChange={handleChange}
      >
        {regions.map((label) => (
          <MenuItem value={label} key={label}>
            {label.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function renderCharts(region) {
  const pricesInputs = [
    {
      chartTitle: "Nov-20",
      region: region,
      maturityType: "month",
      shape: "base",
      startDate: "2020-11-01",
    },
    {
      chartTitle: "Dec-20",
      region: region,
      maturityType: "month",
      shape: "base",
      startDate: "2020-12-01",
    },
    {
      chartTitle: "Jan-21",
      region: region,
      maturityType: "month",
      shape: "base",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "Q1-21",
      region: region,
      maturityType: "quarter",
      shape: "base",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "Cal-21",
      region: region,
      maturityType: "year",
      shape: "base",
      startDate: "2021-01-01",
    },
  ];

  return pricesInputs.map((inputs) => renderPrices(inputs));
}

function renderPrices(inputs) {
  const { chartTitle, region, maturityType, startDate, shape } = inputs;
  return (
    <div key={chartTitle}>
      <LineChart
        {...getEEXPricesProps(
          {
            region: region,
            maturity_type: maturityType,
            start_date: startDate,
            shape: shape,
            from: "2020-07-01",
          },
          chartTitle
        )}
      />
    </div>
  );
}

function getEEXPricesProps(searchParams, chartTitle) {
  console.log("in getEEXPricesProps");
  var chartParams = { ...eexChartParams };
  chartParams.yConfigs = [
    { name: searchParams.region, lineColor: "blue", units: "" },
  ];
  chartParams.chartTitle = chartTitle;
  console.log(chartParams);
  return {
    urlParams: {
      apiQueryName: "EEXPrices",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default Prices;
