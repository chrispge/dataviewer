import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import getTheme from "./components/theme";
import ResponsiveDrawer from "./components/responsive-drawer";
require("dotenv").config()

function App() {
  return (
    <Router>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        <ResponsiveDrawer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
