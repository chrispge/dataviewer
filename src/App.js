import React from "react";
import DemoChart from "./chart";

function App() {
  return (
    <div>
      <h1>French power generation</h1>
      <h2>Nuclear</h2>
      <DemoChart {...getProps("nuclear")} />;<h2>Gas</h2>
      <DemoChart {...getProps("fossil_gas")} />;<h2>Coal</h2>
      <DemoChart {...getProps("fossil_hard_coal")} />;<h2>Hydro Reservoir</h2>
      <DemoChart {...getProps("hydro_water_reservoir")} />;
      <h2>Hydro Run-of-river</h2>
      <DemoChart {...getProps("hydro_run_of_river_and_poundage")} />;
      <h2>Hydro Pumped Storage</h2>
      <DemoChart {...getProps("hydro_pumped_storage")} />;<h2>Wind</h2>
      <DemoChart {...getProps("wind_onshore")} />;<h2>Solar</h2>
      <DemoChart {...getProps("solar")} />;<h2>Oil</h2>
      <DemoChart {...getProps("fossil_oil")} />;<h2>Biomass</h2>
      <DemoChart {...getProps("biomass")} />;<h2>Waste</h2>
      <DemoChart {...getProps("waste")} />;
    </div>
  );
}

function getProps(fuel) {
  const powerChartParams = { x: "start_time", y: "mw_value" };
  const fromDate = "2020-10-06";
  const apiQueryName = "GenByFuel";

  return {
    urlParams: {
      apiQueryName: apiQueryName,
      searchParams: {
        fuel: fuel,
        from: fromDate,
      },
    },
    chartParams: powerChartParams,
  };
}
export default App;
