import React from "react";
import DemoChart from "./chart";

function App() {
  const powerChartParams = { x: "start_time", y: "mw_value" };
  const nuclearProps = {
    urlParams: { apiQueryName: "GenByFuel", searchParams: { fuel: "nuclear" } },
    chartParams: powerChartParams,
  };
  return (
    <div>
      <h1>French power generation</h1>
      <h2>Nuclear</h2>
      <DemoChart {...nuclearProps} />;
      {/* <DemoChart apiQueryName="GenByFuel" fuel="fossil_gas" />;
      <DemoChart apiQueryName="GenByFuel" fuel="fossil_hard_coal" />;
      <DemoChart apiQueryName="GenByFuel" fuel="hydro_water_reservoir" />;
      <DemoChart
        apiQueryName="GenByFuel"
        fuel="hydro_run_of_river_and_poundage"
      />
      ;
      <DemoChart apiQueryName="GenByFuel" fuel="hydro_pumped_storage" />;
      <DemoChart apiQueryName="GenByFuel" fuel="wind_onshore" />;
      <DemoChart apiQueryName="GenByFuel" fuel="solar" />;
      <DemoChart apiQueryName="GenByFuel" fuel="fossil_oil" />;
      <DemoChart apiQueryName="GenByFuel" fuel="biomass" />;
      <DemoChart apiQueryName="GenByFuel" fuel="waste" />; */}
    </div>
  );
}

export default App;
