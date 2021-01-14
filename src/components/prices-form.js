import React, {useState, useEffect} from "react"; 
import useStyles from "./use-styles";
import FormControl from "@material-ui/core/FormControl";
import regions from "../static/prices-regions";
import maturityTypes from "../static/maturity-types";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid"; 
import DropDown from "./drop-down.js"

const PricesForm = ({region, maturityType, contractStartDate, startDate, endDate, handleRefresh}) => { 
  const classes = useStyles()
  // state variables
  const [stageRegion, setStageRegion] = useState(region)
  const [stageMaturityType, setStageMaturityType] = useState(maturityType)
  const [stageContractStartDate, setStageContractStartDate] = useState(contractStartDate)
  const [stageStartDate, setStageStartDate] = useState(startDate)
  const [stageEndDate, setStageEndDate] = useState(endDate)
  // event handlers
  const handleChangeRegion = (event) => {
    setStageRegion(event.target.value);
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
  const handleRefreshChart = (event) => { 
    handleRefresh(stageRegion, stageMaturityType, stageContractStartDate, stageStartDate, stageEndDate)
  }
  
  const [contractStartDates, setContractStartDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      (async () => {
        setIsLoading(true);
        const searchParams = {
          "region": stageRegion, 
          "maturityType": stageMaturityType, 
          "from": stageStartDate, 
          "to": stageEndDate, 
        }
        const fetchedData = await getContractStartDates(searchParams);
        const asStrings = fetchedData.map((item) => item.start_date.slice(0, 10))
        setContractStartDates(asStrings);
        setIsLoading(false);
      })();
    },
    // decalare dependent parameters
    // useEffect will only run when these change
    [stageRegion, stageMaturityType , stageStartDate, stageEndDate]
  );

  return (
    <div>
    <DropDown
      values={regions}
      name="region" 
      visibleLabel="Region"
      initialValue={stageRegion} 
      changeHandler={handleChangeRegion} 
      styleClasses={classes} 
    ></DropDown>
    <DropDown
      values={maturityTypes}
      name="maturity-type" 
      visibleLabel="Maturity Type"
      initialValue={stageMaturityType} 
      changeHandler={handleChangeMaturityType} 
      styleClasses={classes} 
    ></DropDown>
    <FormControl className={classes.formControl}>
      <InputLabel id="contract-start-date">Contract Start</InputLabel>
      <Select
        labelId="contract-start-date-label"
        id="contract-start-date"
        value={stageContractStartDate}
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

    <Grid container>
    <Button variant="contained" className={classes.refreshButton}
    onClick={handleRefreshChart}>refresh</Button>
    </Grid>
    </div>
  )
}

async function getContractStartDates(searchParams) {
  const apiQueryName="EEXOutrightContractStartDates"
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

export default PricesForm

