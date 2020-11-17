import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./components/sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import Header from "./components/header";
import Routes from "./components/routes";

function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      }),
    []
  );
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <Routes />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Router>
  );
}

export default App;
