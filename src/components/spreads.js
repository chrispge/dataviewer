import React, {useState, useEffect} from "react";
import LineChart from "./line-chart";
import ContentSingle from "./content-single-chart.js";
import regions from "../static/prices-regions";
import maturityTypes from "../static/maturity-types";
import useStyles from "./use-styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DatePicker from "@material-ui/pickers"; 
// import DateFnsUtils from "@date-io/date-fns"

const eexChartParams = {
  x: "trade_date",
  yUnits: "",
  xFormat: "dd-mmm",
};

function Spreads() {
  const today = new Date()
  const start = new Date()
  start.setDate(today.getDate()-60)

  const [regionFrom, setRegionFrom] = useState("de");
  const [regionTo, setRegionTo] = useState("fr"); 
  const [maturityType, setMaturityType] = useState("month")
  const [contractStartDate, setContractStartDate] = useState("2021-01-01")
  const [startDate, setStartDate] = useState(DateToString(start))
  const [endDate, setEndDate] = useState(DateToString(today))

  const [stageRegionFrom, setStageRegionFrom] = useState(regionFrom)
  const [stageRegionTo, setStageRegionTo] = useState(regionTo)
  const [stageMaturityType, setStageMaturityType] = useState(maturityType)
  const [stageContractStartDate, setStageContractStartDate] = useState(contractStartDate)
  const [stageStartDate, setStageStartDate] = useState(startDate)
  const [stageEndDate, setStageEndDate] = useState(endDate)

  const handleChangeRegionFrom = (event) => {
    setStageRegionFrom(event.target.value);
  };
  const handleChangeRegionTo = (event) => {
    setStageRegionTo(event.target.value);
  };
  const handleChangeMaturityType = (event) => {
    setStageMaturityType(event.target.value);
  };
  const handleChangeContractStartDate = (event) => {
    setStageContractStartDate(event.target.value);
  };
  const handleChangeStartDate = (event) => {
    setStageStartDate(event.target.value);
  };
  const handleChangeEndDate = (event) => {
    setStageEndDate(event.target.value);
  };
  const handleRefresh = (event) => { 

    setRegionTo(stageRegionTo)
    setRegionFrom(stageRegionFrom)
    setMaturityType(stageMaturityType)
    setContractStartDate(stageContractStartDate)
    setStageStartDate(stageStartDate)
    setStageEndDate(stageEndDate)

  }; 
  const classes = useStyles();

  const [contractStartDates, setContractStartDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      (async () => {
        setIsLoading(true);
        const searchParams = {
          "region1": stageRegionTo, 
          "region2": stageRegionFrom, 
          "maturityType": stageMaturityType, 
          "from": stageStartDate, 
        }
        const fetchedData = await getContractStartDates(searchParams);
        const asStrings = fetchedData.map((item) => item.start_date.slice(0, 10))
        setContractStartDates(asStrings);
        setIsLoading(false);
      })();
    },
    // decalare dependent parameters
    // useEffect will only run when these change
    [stageRegionTo, stageRegionFrom, stageMaturityType, stageStartDate]
  );



  return (
    <ContentSingle
      title="Location Spreads"
      form={spreadsForm(
        classes, 
        stageRegionTo, 
        stageRegionFrom, 
        stageMaturityType, 
        stageContractStartDate, 
        stageStartDate, 
        stageEndDate,  
        handleChangeRegionTo, 
        handleChangeRegionFrom, 
        handleChangeMaturityType,
        handleChangeContractStartDate,
        handleChangeStartDate, 
        handleChangeEndDate, 
        handleRefresh, 
        contractStartDates, 
      )}
      display={renderCharts(regionTo, regionFrom, maturityType, contractStartDate, startDate, endDate)}
    />
  );
}

function DateToString(date) { 
  var dd = String(date.getDate()).padStart(2, '0'); 
  var mm = String(date.getMonth() + 1).padStart(2, '0'); 
  var yyyy = date.getFullYear()
  return yyyy + "-" + mm + "-" + dd
}

async function getContractStartDates(searchParams) {
  const apiQueryName="EEXContractStartDates"
  const url = makeUrl(apiQueryName, searchParams)
  const response = await fetch(url)
  const data = await response.json();
  return data;
}

function makeUrl(apiQueryName,searchParams) {
  const queryString = Object.keys(searchParams)
    .map((key) => key + "=" + searchParams[key])
    .join("&");
  const url = new URL(
    apiQueryName,
    "https://sleepy-refuge-42158.herokuapp.com/"
    // "http://localhost:3001/"
  );
  url.search = queryString;
  return url;
}

function spreadsForm(
  classes, 
  regionTo, 
  regionFrom, 
  maturityType,
  contractStartDate,
  startDate, 
  endDate, 
  handleChangeRegionTo, 
  handleChangeRegionFrom, 
  handleChangeMaturityType,
  handleChangeContractStartDate,
  handleChangeStartDate, 
  handleChangeEndDate, 
  handleRefresh, 
  contractStartDates,) {
  return (
    <div>
    <FormControl className={classes.formControl}>
      <InputLabel id="region-to-label">To Region</InputLabel>
      <Select
        labelId="region-to-label"
        id="region-to"
        value={regionTo}
        onChange={handleChangeRegionTo}
      >
        {Object.keys(regions).map((label) => (
          <MenuItem value={label} key={label}>
            {regions[label].toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel id="region-from-label">From Region</InputLabel>
      <Select
        labelId="region-from-label"
        id="region-from"
        value={regionFrom}
        onChange={handleChangeRegionFrom}
      >
        {Object.keys(regions).map((label) => (
          <MenuItem value={label} key={label}>
            {regions[label].toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel id="maturity-type">Maturity Type</InputLabel>
      <Select
        labelId="maturity-type-label"
        id="maturity-type"
        value={maturityType}
        onChange={handleChangeMaturityType}
      >
        {Object.keys(maturityTypes).map((label) => (
          <MenuItem value={label} key={label}>
            {maturityTypes[label]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel id="contract-start-date">Contract Start</InputLabel>
      <Select
        labelId="contract-start-date-label"
        id="contract-start-date"
        value={contractStartDate}
        onChange={handleChangeContractStartDate}
      >
        {Object.values(contractStartDates).map((label) => (
          <MenuItem value={label} key={label}>
          {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <TextField
        labelId="start-date"
        label="From"
        id="start-date"
        type="date"
        defaultValue={startDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChangeStartDate}
      >
      </TextField>
    </FormControl>
    <FormControl className={classes.formControl}>
      <TextField
        labelId="end-date"
        label="To"
        id="end-date"
        type="date"
        defaultValue={endDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChangeEndDate}
      >
      </TextField>
    </FormControl>
    <Button variant="contained" 
    onClick={handleRefresh}>Refresh</Button>
    </div>
  );
}


function renderCharts(regionTo, regionFrom, maturityType, contractStartDate, startDate, endDate) {
  const inputs = {
      maturityType: maturityType,
      startDate: contractStartDate,
      regionTo: regionTo, 
      regionFrom: regionFrom, 
      from: startDate, 
      to: endDate, 
    }
  ;

  return renderChart(inputs);
}
function renderChart(inputs) {
  const { maturityType, startDate, regionTo, regionFrom, from, to  } = inputs;
  return (
    <div key="SpreadsChart">
      <LineChart
        {...getEEXSpreadsProps(
          {
            region1: regionTo, 
            region2: regionFrom, 
            maturity_type: maturityType,
            start_date: startDate,
            shape: "base",
            from: from, 
            to: to, 
          },
        )}
      />
    </div>
  );
}

function getEEXSpreadsProps(searchParams, chartTitle) {
  var chartParams = { ...eexChartParams };
  chartParams.yConfigs = [
    { name: searchParams.region1, lineColor: "blue", units: "" },
    { name: searchParams.region2, lineColor: "red", units: "" },
    {
      name: searchParams.region1.concat("-", searchParams.region2),
      lineColor: "green",
      units: "",
    },
  ];
  chartParams.chartTitle = chartTitle;
  return {
    urlParams: {
      apiQueryName: "EEXSpreads",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

export default Spreads;
