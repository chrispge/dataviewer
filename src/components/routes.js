import React from "react";
import { Route } from "react-router-dom";
import Spreads from "./spreads";
import Prices from "./prices";
// import Spot from "./spot";
import RTEGenByFuel from "./rte-gen-by-fuel";
import RTEGenByUnit from "./rte-gen-by-unit";
import EntsoeGenByFuel from "./entsoe-gen-by-fuel";
import EntsoeMonthlyGen from "./entsoe-monthly-gen.js";

export default function Routes() {
  return (
    <div className="box ">
      <Route exact path="/" component={Prices} />
      <Route exact path="/prices" component={Prices} />
      <Route exact path="/spreads" component={Spreads} />
      <Route exact path="/rte-gen-by-fuel" component={RTEGenByFuel} />
      <Route exact path="/rte-gen-by-unit" component={RTEGenByUnit} />
      <Route exact path="/entsoe-gen-by-fuel" component={EntsoeGenByFuel} />
      <Route exact path="/entsoe-monthly-gen" component={EntsoeMonthlyGen} />
 </div>
  );
}
