import React, { useState } from "react";
import LineChart from "./line-chart";

const powerChartParams = {
  x: "start_time",
  y: "mw_value",
  yUnits: "MW",
  xFormat: "two-line",
};
const eexChartParams = {
  x: "trade_date",
  yUnits: "",
  xFormat: "dd-mmm",
};

function App() {
  const frDeInputs = [
    {
      chartTitle: "Fr-De Oct-20",
      maturityType: "month",
      startDate: "2020-10-01",
    },
    {
      chartTitle: "Fr-De Nov-20",
      maturityType: "month",
      startDate: "2020-11-01",
    },
    {
      chartTitle: "Fr-De Dec-20",
      maturityType: "month",
      startDate: "2020-12-01",
    },
    {
      chartTitle: "Fr-De Jan-21",
      maturityType: "month",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "Fr-De Feb-21",
      maturityType: "month",
      startDate: "2021-02-01",
    },
    {
      chartTitle: "Fr-De Mar-21",
      maturityType: "month",
      startDate: "2021-03-01",
    },
    {
      chartTitle: "Fr-De Q4-20",
      maturityType: "quarter",
      startDate: "2020-10-01",
    },
    {
      chartTitle: "Fr-De Q1-21",
      maturityType: "quarter",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "Fr-De Cal-21",
      maturityType: "year",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "Fr-De Cal-22",
      maturityType: "year",
      startDate: "2022-01-01",
    },
  ];
  const pricesInputs = [
    {
      chartTitle: "De Nov-20",
      region: "de",
      maturityType: "month",
      shape: "base",
      startDate: "2020-11-01",
    },
    {
      chartTitle: "De Dec-20",
      region: "de",
      maturityType: "month",
      shape: "base",
      startDate: "2020-12-01",
    },
    {
      chartTitle: "De Jan-21",
      region: "de",
      maturityType: "month",
      shape: "base",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "De Q1-21",
      region: "de",
      maturityType: "quarter",
      shape: "base",
      startDate: "2021-01-01",
    },
    {
      chartTitle: "De Cal-21",
      region: "de",
      maturityType: "year",
      shape: "base",
      startDate: "2021-01-01",
    },
  ];
  const [activeCpt, setActiveCpt] = useState("Prices");
  console.log(activeCpt);
  return (
    <div>
      <div class="wrapper">
        <div class="header">Data viewer thing</div>
        <div class="body"></div>
        <div class="box sidebar">
          <button class="sidebar-btn" onClick={() => setActiveCpt("Prices")}>
            Prices
          </button>
          <button class="sidebar-btn" onClick={() => setActiveCpt("Spreads")}>
            Spreads
          </button>
          <button
            class="sidebar-btn"
            onClick={() => setActiveCpt("Generation")}
          >
            Generation
          </button>
        </div>
        <div class="box main-content chart-container">
          {activeCpt === "Prices" &&
            pricesInputs.map((inputs) => renderPrices(inputs))}
          {activeCpt === "Spreads" &&
            frDeInputs.map((inputs) => renderFrDe(inputs))}

          {/* <div class="grid-item">
            <h2 class="chart-title">Tricastin 1</h2>
            <DemoChart {...getGenByUnitProps("tricastin 1")} />
          </div> */}
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
        <div class="box sidebar2">
          Sidebar2: I haven't decided what to put here yet
        </div>
        <div class="box footer">© Chris Page {new Date().getFullYear()}</div>
      </div>
    </div>
  );
}

function getEEXSpreadsProps(searchParams) {
  console.log("in getEEXSpreadsProps");
  var chartParams = { ...eexChartParams };
  chartParams.yConfigs = [
    { name: searchParams.region1, lineColor: "blue", units: "" },
    { name: searchParams.region2, lineColor: "red", units: "" },
    {
      name: searchParams.region1.concat("-", searchParams.region2),
      lineColor: "green",
      units: "",
    },
  ];
  console.log(chartParams);
  return {
    urlParams: {
      apiQueryName: "EEXSpreads",
      searchParams: searchParams,
    },
    chartParams: chartParams,
  };
}

function getEEXPricesProps(searchParams) {
  console.log("in getEEXPricesProps");
  var chartParams = { ...eexChartParams };
  chartParams.yConfigs = [
    { name: searchParams.region, lineColor: "blue", units: "" },
  ];
  console.log(chartParams);
  return {
    urlParams: {
      apiQueryName: "EEXPrices",
      searchParams: searchParams,
    },
    chartParams: chartParams,
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

function renderFrDe(inputs) {
  const { chartTitle, maturityType, startDate } = inputs;
  return (
    <div class="grid-item">
      <h2 class="chart-title">{chartTitle}</h2>
      <LineChart
        {...getEEXSpreadsProps({
          from: "2020-07-01",
          region1: "fr",
          region2: "de",
          maturityType: maturityType,
          shape: "base",
          startDate: startDate,
        })}
      />
    </div>
  );
}

function renderPrices(inputs) {
  const { chartTitle, region, maturityType, startDate, shape } = inputs;
  return (
    <div class="grid-item">
      <h2 class="chart-title">{chartTitle}</h2>
      <LineChart
        {...getEEXPricesProps({
          from: "2020-07-01",
          region: region,
          maturity_type: maturityType,
          shape: shape,
          start_date: startDate,
        })}
      />
    </div>
  );
}

function renderGeneration(inputs) {
  const { chartTitle, region, maturityType, startDate, shape } = inputs;
  return (
    <div class="grid-item">
      <h2 class="chart-title">{chartTitle}</h2>
      <LineChart
        {...getEEXPricesProps({
          from: "2020-07-01",
          region: region,
          maturity_type: maturityType,
          shape: shape,
          start_date: startDate,
        })}
      />
    </div>
  );
}

// {/* <div class="grid-item">
//   <h2 class="chart-title">Tricastin 1</h2>
//   <DemoChart {...getGenByUnitProps("tricastin 1")} />
// </div> */}
export default App;
