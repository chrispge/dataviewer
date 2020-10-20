import React, { useState } from "react";
import Collapsible from "react-collapsible";
import Spreads from "./components/spreads";
import Prices from "./components/prices";
import RTEGenByFuel from "./components/rte-gen-by-fuel";
import RTEGenByUnit from "./components/rte-gen-by-unit";
import SidebarButton from "./components/sidebar-button";

function App() {
  const [activeCpt, setActiveCpt] = useState("RTEGenByFuel");
  console.log(activeCpt);
  return (
    <div>
      <div className="wrapper">
        <div className="header">Data viewer thing</div>
        <div className="body"></div>
        <div className="box sidebar">
          <SidebarButton
            title="Prices"
            cptSetter={() => setActiveCpt("Prices")}
          />
          <SidebarButton
            title="Spreads"
            cptSetter={() => setActiveCpt("Spreads")}
          />
          <SidebarButton
            title="French Generation by Fuel"
            cptSetter={() => setActiveCpt("RTEGenByFuel")}
          />
          <Collapsible trigger="RTE Gen By Unit">
            <SidebarButton
              title="French Gen by Unit: Nuclear"
              cptSetter={() => setActiveCpt("RTEGenByUnitNuclear")}
            />
            <SidebarButton
              title="French Gen by Unit: Gas"
              cptSetter={() => setActiveCpt("RTEGenByUnitGas")}
            />
            <SidebarButton
              title="French Gen by Unit: Coal"
              cptSetter={() => setActiveCpt("RTEGenByUnitCoal")}
            />
            <SidebarButton
              title="French Gen by Unit: Hydro Reservoir"
              cptSetter={() => setActiveCpt("RTEGenByUnitHydroRes")}
            />
            <SidebarButton
              title="French Gen by Unit: Hydro Run-of-River"
              cptSetter={() => setActiveCpt("RTEGenByUnitHydroROR")}
            />
            <SidebarButton
              title="French Gen by Unit: Hydro Pumped Storage"
              cptSetter={() => setActiveCpt("RTEGenByUnitHydroPS")}
            />
            <SidebarButton
              title="French Gen by Unit: Oil"
              cptSetter={() => setActiveCpt("RTEGenByUnitOil")}
            />
          </Collapsible>
        </div>
        <div className="box main-content chart-container">
          {activeCpt === "Prices" && <Prices></Prices>}
          {activeCpt === "Spreads" && <Spreads></Spreads>}
          {activeCpt === "RTEGenByFuel" && <RTEGenByFuel></RTEGenByFuel>}
          {activeCpt === "RTEGenByUnitNuclear" && (
            <RTEGenByUnit fuel="nuclear"></RTEGenByUnit>
          )}
          {activeCpt === "RTEGenByUnitGas" && (
            <RTEGenByUnit fuel="fossil_gas"></RTEGenByUnit>
          )}
          {activeCpt === "RTEGenByUnitCoal" && (
            <RTEGenByUnit fuel="fossil_hard_coal"></RTEGenByUnit>
          )}
          {activeCpt === "RTEGenByUnitHydroRes" && (
            <RTEGenByUnit fuel="hydro_water_reservoir"></RTEGenByUnit>
          )}
          {activeCpt === "RTEGenByUnitHydroROR" && (
            <RTEGenByUnit fuel="hydro_run_of_river_and_poundage"></RTEGenByUnit>
          )}
          {activeCpt === "RTEGenByUnitHydroPS" && (
            <RTEGenByUnit fuel="hydro_pumped_storage"></RTEGenByUnit>
          )}
          {activeCpt === "RTEGenByUnitOil" && (
            <RTEGenByUnit fuel="fossil_oil"></RTEGenByUnit>
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
