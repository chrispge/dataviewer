import React from "react";
import DemoChart from "./chart";

const powerChartParams = { x: "start_time", y: "mw_value" };
const fromDate = "2020-10-06";
const apiQueryName = "GenByFuel";

function App() {
  return (
    <div>
      <h1 class="main-title">French power generation</h1>
      <div class="grid-container">
        <div class="grid-item">
          <h2 class="chart-title">Tricastin 1</h2>
          <DemoChart {...getUnitProps("tricastin 1")} />
        </div>
        {/* <div class="grid-item">
          <h2 class="chart-title">Nuclear</h2>
          <DemoChart {...getProps("nuclear")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Gas</h2>
          <DemoChart {...getProps("fossil_gas")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Coal</h2>
          <DemoChart {...getProps("fossil_hard_coal")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Hydro Reservoir</h2>
          <DemoChart {...getProps("hydro_water_reservoir")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Hydro Run-of-river</h2>
          <DemoChart {...getProps("hydro_run_of_river_and_poundage")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Hydro Pumped Storage</h2>
          <DemoChart {...getProps("hydro_pumped_storage")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Wind</h2>
          <DemoChart {...getProps("wind_onshore")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Solar</h2>
          <DemoChart {...getProps("solar")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Oil</h2>
          <DemoChart {...getProps("fossil_oil")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Biomass</h2>
          <DemoChart {...getProps("biomass")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Waste</h2>
          <DemoChart {...getProps("waste")} />
        </div> */}
      </div>
    </div>
  );
}

function getUnitProps(fuel) {
  return {
    urlParams: {
      apiQueryName: "GenByUnit",
      searchParams: {
        generation_name: "tricastin 1",
        from: fromDate,
      },
    },
    chartParams: powerChartParams,
  };
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
