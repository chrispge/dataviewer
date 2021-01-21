import React, {useState} from "react";
import LineChart from "./line-chart";
import ContentSingle from "./content-single-chart";
import EntsoeMonthlyGenForm from "./entsoe-monthly-gen-form"
import { VictoryLegend } from "victory"


function EntsoeMonthlyGen() {
  const [region, setRegion] = useState("10Y1001A1001A83F"); 
  const [fuel, setFuel] = useState("B14"); 
  const handleRefresh = (stageRegion, stageFuel) => { 
    console.log("refreshing chart")
    setRegion(stageRegion)
    setFuel(stageFuel)
  }; 
  return (
    <ContentSingle
      title="Entsoe Monthly Generation by Fuel"
      form=<EntsoeMonthlyGenForm {...{region, fuel, handleRefresh}}/>
      display={renderChart({region, fuel})}
    />
  );
}

function renderChart(inputs) {
  const {region, fuel} = inputs;
  
  console.log("rendering chart")
  const yConfigs = [
    { name: "2015", lineColor: "violet", units: "MW" },
    { name: "2016", lineColor: "indigo", units: "MW" },
    { name: "2017", lineColor: "blue", units: "MW" },
    { name: "2018", lineColor: "green", units: "MW" },
    { name: "2019", lineColor: "yellow", units: "MW" },
    { name: "2020", lineColor: "orange", units: "MW" },
    { name: "2021", lineColor: "red", units: "MW" },
  ]
  const chartHeight=320
  const paddingForXAxis=20
  const paddingForLegend=50
  const bottomPadding = paddingForXAxis + paddingForLegend
  return (
    <div key="EntoseMonthlyGenChart">
      <LineChart {
        ...{
          urlParams: {
            apiQueryName: "PivotEntsoeGenByType",
            searchParams: { 
              region: 'fr', 
              fuel: 'nuclear',
            }
          },
          chartParams: { 
            x: "month",
            yUnits: "",
            xFormat: "mmm",
            height: chartHeight,
            padding: { top: 10, bottom: bottomPadding, left: 60, right: 40 }, 
            legend: <VictoryLegend 
              x={50}
              y={chartHeight-paddingForLegend}
              data={yConfigs.map((yConfig) => legendParams(yConfig))}
              gutter={{left: 10, right: 10}}
              rowGutter={{ top: 0, bottom: 0}} 
              orientation="horizontal"
              itemsPerRow={4}
            />, 
            yConfigs: yConfigs
          }, 
        }}
      />
    </div>
  );
}

function legendParams(yConfig) { 
  return {name: yConfig.name, symbol: {fill: yConfig.lineColor}} 
} 

export default EntsoeMonthlyGen;
