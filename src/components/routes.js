import React from "react";
import { Route } from "react-router-dom";
import Spreads from "./spreads";
import Prices from "./prices";
import RTEGenByFuel from "./rte-gen-by-fuel";
import RTEGenByUnit from "./rte-gen-by-unit";

export default function Routes() {
  return (
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
        render={(props) => <RTEGenByFuel {...props} fuel={"fossil_gas"} />}
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
          <RTEGenByFuel {...props} fuel={"hydro_run_of_river_and_poundage"} />
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
        render={(props) => <RTEGenByFuel {...props} fuel={"fossil_oil"} />}
      />
    </div>
  );
}
