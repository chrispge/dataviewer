import React from "react";
import DemoChart from "./chart";

const powerChartParams = { x: "start_time", y: "mw_value" };
const fromDate = "2020-10-06";
const apiQueryName = "GenByFuel";

function App() {
  return (
    <div>
      <h1>French power generation</h1>
      <div class="grid-container">
        <div class="grid-item1">
          <h2>Nuclear</h2>
          <DemoChart {...getProps("nuclear")} />
        </div>
        <div class="grid-item">
          <h2>Gas</h2>
          <DemoChart {...getProps("fossil_gas")} />
        </div>
        <div class="grid-item">
          <h2>Coal</h2>
          <DemoChart {...getProps("fossil_hard_coal")} />
        </div>
        <div class="grid-item">
          <h2>Hydro Reservoir</h2>
          <DemoChart {...getProps("hydro_water_reservoir")} />
        </div>
        <div class="grid-item">
          <h2>Hydro Run-of-river</h2>
          <DemoChart {...getProps("hydro_run_of_river_and_poundage")} />;
        </div>
        <div class="grid-item">
          <h2>Hydro Pumped Storage</h2>
          <DemoChart {...getProps("hydro_pumped_storage")} />
        </div>
        <div class="grid-item">
          <h2>Wind</h2>
          <DemoChart {...getProps("wind_onshore")} />
        </div>
        <div class="grid-item">
          <h2>Solar</h2>
          <DemoChart {...getProps("solar")} />
        </div>
        <div class="grid-item">
          <h2>Oil</h2>
          <DemoChart {...getProps("fossil_oil")} />
        </div>
        <div class="grid-item">
          <h2>Biomass</h2>
          <DemoChart {...getProps("biomass")} />
        </div>
        <div class="grid-item">
          <h2>Waste</h2>
          <DemoChart {...getProps("waste")} />
        </div>
      </div>
    </div>
  );
}

function getProps(fuel) {
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
