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
      <div className="wrapper">
        <div className="header">Data viewer thing</div>
        <div className="body"></div>
        <div className="box sidebar">
          <button
            className="sidebar-btn"
            onClick={() => setActiveCpt("Prices")}
          >
            Prices
          </button>
          <button
            className="sidebar-btn"
            onClick={() => setActiveCpt("Spreads")}
          >
            Spreads
          </button>
          <button
            className="sidebar-btn"
            onClick={() => setActiveCpt("RTEGenByFuel")}
          >
            French Generation By Fuel
          </button>
          <button
            className="sidebar-btn"
            onClick={() => setActiveCpt("RTEGenByUnit")}
          >
            French Generation By Unit
          </button>
        </div>
        <div className="box main-content chart-container">
          {activeCpt === "Prices" && <Prices></Prices>}
          {activeCpt === "Spreads" && <Spreads></Spreads>}
          {activeCpt === "RTEGenByFuel" && <RTEGenByFuel></RTEGenByFuel>}
          {activeCpt === "RTEGenByUnit" && (
            <RTEGenByUnit fuel="nuclear"></RTEGenByUnit>
          )}
        </div>
        <div className="box sidebar2">
          Sidebar2: I haven't decided what to put here yet
        </div>
        <div className="box footer">
          © Chris Page {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

export default App;
