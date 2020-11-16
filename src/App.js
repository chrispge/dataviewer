import React, { useState } from "react";
import Collapsible from "react-collapsible";
import Spreads from "./components/spreads";
import Prices from "./components/prices";
import RTEGenByFuel from "./components/rte-gen-by-fuel";
import RTEGenByUnit from "./components/rte-gen-by-unit";
import SidebarButton from "./components/sidebar-button";
import "fontsource-roboto";

function App() {
  const [activeCpt, setActiveCpt] = useState("Prices");
  return (
    <div>
      <div className="wrapper">
        <div className="header">Data viewer</div>
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
            title="RTE Generation by Fuel"
            cptSetter={() => setActiveCpt("RTEGenByFuel")}
          />
          <Collapsible trigger="RTE Generation by Unit" transitionTime={50}>
            <SidebarButton
              title="Nuclear"
              cptSetter={() => setActiveCpt("RTEGenByUnitNuclear")}
            />
            <SidebarButton
              title="Gas"
              cptSetter={() => setActiveCpt("RTEGenByUnitGas")}
            />
            <SidebarButton
              title="Coal"
              cptSetter={() => setActiveCpt("RTEGenByUnitCoal")}
            />
            <SidebarButton
              title="Hydro Reservoir"
              cptSetter={() => setActiveCpt("RTEGenByUnitHydroRes")}
            />
            <SidebarButton
              title="Hydro Run-of-River"
              cptSetter={() => setActiveCpt("RTEGenByUnitHydroROR")}
            />
            <SidebarButton
              title="Hydro Pumped Storage"
              cptSetter={() => setActiveCpt("RTEGenByUnitHydroPS")}
            />
            <SidebarButton
              title="Oil"
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
      </div>
    </div>
  );
}

export default App;
