import React, { useState } from "react";
import Spreads from "./components/spreads";
import Prices from "./components/prices";
import RTEGenByFuel from "./components/rte-gen-by-fuel";
import RTEGenByUnit from "./components/rte-gen-by-unit";

function App() {
  const [activeCpt, setActiveCpt] = useState("RTEGenByUnit");
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
            onClick={() => setActiveCpt("RTEGenByFuel")}
          >
            French Generation By Fuel
          </button>
          <button
            class="sidebar-btn"
            onClick={() => setActiveCpt("RTEGenByUnit")}
          >
            French Generation By Unit
          </button>
        </div>
        <div class="box main-content chart-container">
          {activeCpt === "Prices" && Prices()}
          {activeCpt === "Spreads" && Spreads()}
          {activeCpt === "RTEGenByFuel" && RTEGenByFuel()}
          {activeCpt === "RTEGenByUnit" && RTEGenByUnit({ fuel: "nuclear" })}
        </div>
        <div class="box sidebar2">
          Sidebar2: I haven't decided what to put here yet
        </div>
        <div class="box footer">© Chris Page {new Date().getFullYear()}</div>
      </div>
    </div>
  );
}

export default App;
