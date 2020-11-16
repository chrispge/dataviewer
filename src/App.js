import React, { useState } from "react";
import Spreads from "./components/spreads";
import Prices from "./components/prices";
import RTEGenByFuel from "./components/rte-gen-by-fuel";
import RTEGenByUnit from "./components/rte-gen-by-unit";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Sidebar from "./components/sidebar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CssBaseline } from "@material-ui/core";

function App() {
  const [darkState, setDarkState] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1" align="center">
              Data Viewer
            </Typography>
            <Switch checked={darkState} onChange={handleThemeChange} />
          </Grid>
          <Grid item xs={2}>
            <Sidebar></Sidebar>
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
