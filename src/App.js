import React from "react";
import DemoChart from "./chart";

const powerChartParams = {
  x: "start_time",
  y: "mw_value",
  yUnits: "MW",
  xFormat: "two-line",
};
const eexChartParams = {
  x: "trade_date",
  y: "settlement_price",
  yUnits: "",
  xFormat: "dd-mmm",
};

function App() {
  return (
    <div>
      <h1 class="main-title">French power generation</h1>
      <div class="grid-container">
        <div class="grid-item">
          <h2 class="chart-title">French cal</h2>
          <DemoChart {...getEEXPricesProps()} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Tricastin 1</h2>
          <DemoChart {...getGenByUnitProps("tricastin 1")} />
        </div>
        {/* <div class="grid-item">
          <h2 class="chart-title">Nuclear</h2>
          <DemoChart {...getGenByFuelProps("nuclear")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Gas</h2>
          <DemoChart {...getGenByFuelProps("fossil_gas")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Coal</h2>
          <DemoChart {...getGenByFuelProps("fossil_hard_coal")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Hydro Reservoir</h2>
          <DemoChart {...getGenByFuelProps("hydro_water_reservoir")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Hydro Run-of-river</h2>
          <DemoChart {...getGenByFuelProps("hydro_run_of_river_and_poundage")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Hydro Pumped Storage</h2>
          <DemoChart {...getGenByFuelProps("hydro_pumped_storage")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Wind</h2>
          <DemoChart {...getGenByFuelProps("wind_onshore")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Solar</h2>
          <DemoChart {...getGenByFuelProps("solar")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Oil</h2>
          <DemoChart {...getGenByFuelProps("fossil_oil")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Biomass</h2>
          <DemoChart {...getGenByFuelProps("biomass")} />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">Waste</h2>
          <DemoChart {...getGenByFuelProps("waste")} />
        </div> */}
      </div>
    </div>
  );
}

function getEEXPricesProps() {
  return {
    urlParams: {
      apiQueryName: "EEXPrices",
      searchParams: {
        from: "2020-10-01",
        region: "fr",
        maturity_type: "year",
        shape: "base",
        start_date: "2021-01-01",
      },
    },
    chartParams: eexChartParams,
  };
}

function getGenByUnitProps() {
  return {
    urlParams: {
      apiQueryName: "GenByUnit",
      searchParams: {
        generation_name: "tricastin 1",
        from: "2020-10-06",
      },
    },
    chartParams: powerChartParams,
  };
}

function getGenByFuelProps(fuel) {
  return {
    urlParams: {
      apiQueryName: "GenByFuel",
      searchParams: {
        fuel: fuel,
        from: "2020-10-06",
      },
    },
    chartParams: powerChartParams,
  };
}
export default App;
