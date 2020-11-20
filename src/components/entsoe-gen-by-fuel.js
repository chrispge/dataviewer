import React, { useState, useEffect } from "react";
import LineChart from "./line-chart";
import { getDateOffset } from "./format-date";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/Styles";
import { MenuItem } from "@material-ui/core";

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
  const regions = [
    "BE",
    "CH",
    "DE",
    "DK",
    "ES",
    "FI",
    "FR",
    "GB",
    "IT",
    "NL",
    "NO",
    "SE",
  ].sort();
  const [region, setRegion] = useState("DE");
  const classes = useStyles();

  const handleChange = (event) => {
    setRegion(event.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Entsoe Gen By Fuel</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="region-label">Region</InputLabel>
          <Select
            lableId="region-label"
            id="region-select"
            value={region}
            onChange={handleChange}
          >
            {regions.map((label) => (
              <MenuItem value={label}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider></Divider>
      </Grid>
      {renderCharts(region)}
    </Grid>
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
