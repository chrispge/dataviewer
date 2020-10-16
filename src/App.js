import React from "react";
import DemoChart from "./chart";
import SpreadChart from "./spread-chart";

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
  const frDeInputs = [
    ["Fr-De Oct-20", "month", "2020-10-01"],
    ["Fr-De Nov-20", "month", "2020-11-01"],
    ["Fr-De Dec-20", "month", "2020-12-01"],
  ];
  return (
    <div>
      <h1 class="main-title">French and German power prices</h1>
      <div class="grid-container">
        {frDeInputs.map((inputs) => renderFrDe(inputs))}

        {/* <div class="grid-item">
          <h2 class="chart-title">Nov-20</h2>
          <SpreadChart
            {...getEEXSpreadsProps([
              {
                searchParams: {
                  from: "2020-07-01",
                  region1: "fr",
                  region2: "de",
                  maturity_type: "month",
                  shape: "base",
                  start_date: "2020-11-01",
                },
              },
            ])}
          />
        </div>

        <div class="grid-item">
          <h2 class="chart-title">Dec-20</h2>
          <SpreadChart
            {...getEEXSpreadsProps([
              {
                searchParams: {
                  from: "2020-07-01",
                  region1: "fr",
                  region2: "de",
                  maturity_type: "month",
                  shape: "base",
                  start_date: "2020-12-01",
                },
              },
            ])}
          />
        </div>

        <div class="grid-item">
          <h2 class="chart-title">Q4-20</h2>
          <SpreadChart
            {...getEEXSpreadsProps([
              {
                searchParams: {
                  from: "2020-07-01",
                  region1: "fr",
                  region2: "de",
                  maturity_type: "quarter",
                  shape: "base",
                  start_date: "2020-10-01",
                },
              },
            ])}
          />
        </div>

        <div class="grid-item">
          <h2 class="chart-title">Q1-20</h2>
          <SpreadChart
            {...getEEXSpreadsProps([
              {
                searchParams: {
                  from: "2020-07-01",
                  region1: "fr",
                  region2: "de",
                  maturity_type: "quarter",
                  shape: "base",
                  start_date: "2021-01-01",
                },
              },
            ])}
          />
        </div>

        <div class="grid-item">
          <h2 class="chart-title">Cal-20</h2>
          <SpreadChart
            {...getEEXSpreadsProps([
              {
                searchParams: {
                  from: "2020-07-01",
                  region1: "fr",
                  region2: "de",
                  maturity_type: "year",
                  shape: "base",
                  start_date: "2021-01-01",
                },
              },
            ])}
          />
        </div> */}

        <div class="grid-item">
          <h2 class="chart-title">German Oct</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "de",
              maturity_type: "month",
              shape: "base",
              start_date: "2020-10-01",
            })}
          />
        </div>

        {/* <div class="grid-item">
          <h2 class="chart-title">French Nov</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "fr",
              maturity_type: "month",
              shape: "base",
              start_date: "2020-11-01",
            })}
          />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">German Nov</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "de",
              maturity_type: "month",
              shape: "base",
              start_date: "2020-11-01",
            })}
          />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">French Dec</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "fr",
              maturity_type: "month",
              shape: "base",
              start_date: "2020-12-01",
            })}
          />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">German Dec</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "de",
              maturity_type: "month",
              shape: "base",
              start_date: "2020-12-01",
            })}
          />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">French Q4</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "fr",
              maturity_type: "quarter",
              shape: "base",
              start_date: "2020-10-01",
            })}
          />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">German Q4</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "de",
              maturity_type: "quarter",
              shape: "base",
              start_date: "2020-10-01",
            })}
          />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">French Q1</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "fr",
              maturity_type: "quarter",
              shape: "base",
              start_date: "2021-01-01",
            })}
          />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">German Q1</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "de",
              maturity_type: "quarter",
              shape: "base",
              start_date: "2021-01-01",
            })}
          />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">French cal</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "fr",
              maturity_type: "year",
              shape: "base",
              start_date: "2021-01-01",
            })}
          />
        </div>
        <div class="grid-item">
          <h2 class="chart-title">German cal</h2>
          <DemoChart
            {...getEEXPricesProps({
              from: "2020-07-01",
              region: "de",
              maturity_type: "year",
              shape: "base",
              start_date: "2021-01-01",
            })}
          />
        </div>  */}
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
    </div>
  );
}

function getEEXSpreadsProps(searchParams) {
  console.log("in getEEXSpreadsProps");
  var chartParams = { ...eexChartParams };
  chartParams.y = [
    searchParams.region1,
    searchParams.region2,
    searchParams.region1.concat("-", searchParams.region2),
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
  chartParams.y = searchParams.region;
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
  const [chartTitle, maturityType, startDate] = [...inputs];
  return (
    <div class="grid-item">
      <h2 class="chart-title">{chartTitle}</h2>
      <SpreadChart
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
export default App;
