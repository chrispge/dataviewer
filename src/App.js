import React, { useState } from "react";
import Spreads from "./components/spreads";
import Prices from "./components/prices";
import RTEGenByFuel from "./components/rte-gen-by-fuel";
import RTEGenByUnit from "./components/rte-gen-by-unit";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./components/sidebar";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [activeCpt, setActiveCpt] = useState("Prices");
  return (
    <Router>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            Data Viewer
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Sidebar setComponent={setActiveCpt}></Sidebar>
        </Grid>
        <Grid item xs={10}>
          <div className="box main-content ">
            <Route exact path="/" component={Prices} />
            <Route exact path="/prices" component={Prices} />
            <Route exact path="/spreads" component={Spreads} />
            <Route exact path="/rte-gen-by-fuel" component={RTEGenByFuel} />
            {/* <Route exact path="/gen-by-unit" component={RTEGenByUnit} /> */}
            {/* {activeCpt === "RTEGenByUnitNuclear" && (
              <RTEGenByUnit fuel="nuclear"></RTEGenByUnit>
            )}
            {activeCpt === "RTEGenByUnitGas" && (
              <RTEGenByUnit fuel="fossil_gas"></RTEGenByUnit>
            )}
            {activeCpt === "RTEGenByUnitCoal" && (
              <RTEGenByUnit fuel="fossil_hard_coal"></RTEGenByUnit>
            )}
            {activeCpt === "RTEGenByUnitHydroRes" && (
              <RTEGenByUnit fuel="hydro_water_reservoir"></RTEGenByUnit>
            )}
            {activeCpt === "RTEGenByUnitHydroROR" && (
              <RTEGenByUnit fuel="hydro_run_of_river_and_poundage"></RTEGenByUnit>
            )}
            {activeCpt === "RTEGenByUnitHydroPS" && (
              <RTEGenByUnit fuel="hydro_pumped_storage"></RTEGenByUnit>
            )}
            {activeCpt === "RTEGenByUnitOil" && (
              <RTEGenByUnit fuel="fossil_oil"></RTEGenByUnit>
            )} */}
          </div>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
