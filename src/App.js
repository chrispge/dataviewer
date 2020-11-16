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
            <Route
              exact
              path="/rte-gen-by-unit/nuclear"
              render={(props) => <RTEGenByFuel {...props} fuel={"nuclear"} />}
            />
            <Route
              exact
              path="/rte-gen-by-unit/gas"
              render={(props) => (
                <RTEGenByFuel {...props} fuel={"fossil_gas"} />
              )}
            />
            <Route
              exact
              path="/rte-gen-by-unit/coal"
              render={(props) => (
                <RTEGenByFuel {...props} fuel={"fossil_hard_coal"} />
              )}
            />
            <Route
              exact
              path="/rte-gen-by-unit/hydro-res"
              render={(props) => (
                <RTEGenByFuel {...props} fuel={"hydro_water_reservoir"} />
              )}
            />
            <Route
              exact
              path="/rte-gen-by-unit/hydro-ror"
              render={(props) => (
                <RTEGenByFuel
                  {...props}
                  fuel={"hydro_run_of_river_and_poundage"}
                />
              )}
            />
            <Route
              exact
              path="/rte-gen-by-unit/hydro-ps"
              render={(props) => (
                <RTEGenByFuel {...props} fuel={"hydro_pumped_storage"} />
              )}
            />
            <Route
              exact
              path="/rte-gen-by-unit/oil"
              render={(props) => (
                <RTEGenByFuel {...props} fuel={"fossil_oil"} />
              )}
            />
          </div>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
