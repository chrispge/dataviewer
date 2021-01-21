import React, {useState, useEffect} from "react"; 
import useStyles from "./use-styles";
import FormControl from "@material-ui/core/FormControl";
import fuelsByRegion from "../static/entsoe-fuels-by-region.js"
import maturityTypes from "../static/maturity-types";
import InputLabel from "@material-ui/core/InputLabel";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid"; 
import DropDown from "./drop-down.js"

const fuels = [
 'B01', 
 'B02', 
 'B03', 
 'B04', 
 'B05', 
 'B06', 
 'B07', 
 'B08', 
 'B09', 
 'B10', 
 'B11', 
 'B12', 
 'B13', 
 'B14', 
]

const regions = [
  '10Y1001A1001A83F', 
  '10YFR-RTE------C', 
]

const EntsoeMonthlyGenForm = ({region, fuel, handleRefresh}) => { 
  const classes = useStyles()
  // const regions = Object.keys(fuelsByRegion)
  // state variables
  const [stageRegion, setStageRegion] = useState('10Y1001A1001A83F')
  const [stageFuel, setStageFuel] = useState('B14')

  // event handlers
  const handleChangeRegion = (event) => {
    setStageRegion(event.target.value);
  };
  const handleChangeFuel = (event) => {
    setStageFuel(event.target.value);
  };
  const handleRefreshChart = (event) => { 
    handleRefresh(stageRegion, stageFuel)
  }

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
      values={fuels}
      name="fuel" 
      visibleLabel="Fuel"
      initialValue={stageFuel} 
      changeHandler={handleChangeFuel} 
      styleClasses={classes} 
    ></DropDown>
    <Grid container>
    <Button variant="contained" className={classes.refreshButton}
      onClick={handleRefreshChart}>refresh</Button>
    </Grid>
    </div>
  )
}

function makeUrl(apiQueryName,searchParams) {
  const queryString = Object.keys(searchParams)
    .map((key) => key + "=" + searchParams[key])
    .join("&");
  const url = new URL(
    apiQueryName,
    process.env.REACT_APP_DB_URL,
  );
  url.search = queryString;
  return url;
}
export default EntsoeMonthlyGenForm

