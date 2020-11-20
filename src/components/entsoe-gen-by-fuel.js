import React, { useState } from "react";
import LineChart from "./line-chart";
import { getDateOffset } from "./format-date";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/Styles";
import { MenuItem } from "@material-ui/core";
import Content from "./content";
import regions from "../static/entsoe-gen-regions";

const EntsoeGenByFuelChartParams = {
  x: "start_time",
  yUnits: "MW",
  xFormat: "two-line",
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EntsoeGenByFuel() {
  const [region, setRegion] = useState("DE");

  const handleChange = (event) => {
    setRegion(event.target.value);
  };

  const classes = useStyles();
  return (
    <Content
      title="Entsoe Generation By Fuel"
      form={entsoeForm(classes, region, handleChange)}
      display={renderCharts(region)}
    />
  );
}

function entsoeForm(classes, region, handleChange) {
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
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function renderCharts(region) {
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

  return chartInputs.map((inputs) => renderEntsoeGenByFuel(region, inputs));
}

function renderEntsoeGenByFuel(region, inputs) {
  const { chartTitle, fuel } = inputs;
  const from = getDateOffset(-3);
  return (
    <div key={chartTitle}>
      <LineChart
        {...getEntsoeGenByFuelProps(
          {
            from: from,
            fuel: fuel,
            region_display: region,
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
