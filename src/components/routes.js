import React from "react";
import { Route } from "react-router-dom";
import Spreads from "./spreads";
import Prices from "./prices";
import Spot from "./spot";
import RTEGenByFuel from "./rte-gen-by-fuel";
import RTEGenByUnit from "./rte-gen-by-unit";
import EntsoeGenByFuel from "./entsoe-gen-by-fuel";
import Grid from "@material-ui/core/Grid";

function RTEGenByUnitRoute(props) {
  const { fuel } = props;
  const fuelForDB = fuel.split("-").join("_");
  const path = "/rte-gen-by-unit/" + fuel;
  return (
    <Route
      exact
      path={path}
      render={(props) => <RTEGenByUnit {...props} fuel={fuelForDB} />}
    />
  );
}
export default function Routes() {
  return (
    <div className="box ">
      <Route exact path="/" component={Prices} />
      // <Route exact path="/spot" component={Spot} />
      <Route exact path="/prices" component={Prices} />
      <Route exact path="/spreads" component={Spreads} />
      <Route exact path="/rte-gen-by-fuel" component={RTEGenByFuel} />
      <RTEGenByUnitRoute fuel="nuclear" />
      <RTEGenByUnitRoute fuel="fossil-gas" />
      <RTEGenByUnitRoute fuel="fossil-hard-coal" />
      <RTEGenByUnitRoute fuel="hydro-water-reservoir" />
      <RTEGenByUnitRoute fuel="hydro-run-of-river-and-poundage" />
      <RTEGenByUnitRoute fuel="hydro-pumped-storage" />
      <RTEGenByUnitRoute fuel="fossil-oil" />
      <Route exact path="/entsoe-gen-by-fuel" component={EntsoeGenByFuel} />
    </div>
  );
}
