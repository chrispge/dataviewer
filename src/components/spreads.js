import React, {useState} from "react";
import LineChart from "./line-chart";
import ContentSingle from "./content-single-chart.js";
import {VictoryLegend} from "victory";

import SpreadsForm from "./spreads-form.js"


function Spreads() {
  const today = new Date()
  const start = new Date()
  start.setDate(today.getDate()-60)
  const [region1, setRegion1] = useState("fr"); 
  const [region2, setRegion2] = useState("de");
  const [maturityType, setMaturityType] = useState("month")
  const [contractStartDate, setContractStartDate] = useState("2021-01-01")
  const [startDate, setStartDate] = useState(DateToString(start))
  const [endDate, setEndDate] = useState(DateToString(today))

  const handleRefresh = (stageRegion1, stageRegion2, stageMaturityType, stageContractStartDate, stageStartDate, stageEndDate) => { 
    setRegion1(stageRegion1)
    setRegion2(stageRegion2)
    setMaturityType(stageMaturityType)
    setContractStartDate(stageContractStartDate)
    setStartDate(stageStartDate)
    setEndDate(stageEndDate)
  }; 

  return (
    <ContentSingle
      title="Location Spreads"
      form=<SpreadsForm {...{region1, region2, maturityType, contractStartDate, startDate, endDate, handleRefresh}}/>
      display={renderChart({region1, region2, maturityType, contractStartDate, startDate, endDate})}
    />
  );
}

function DateToString(date) { 
  var dd = String(date.getDate()).padStart(2, '0'); 
  var mm = String(date.getMonth() + 1).padStart(2, '0'); 
  var yyyy = date.getFullYear()
  return yyyy + "-" + mm + "-" + dd
}


function renderChart(inputs) {
  const {region1, region2, maturityType, contractStartDate, startDate, endDate } = inputs;
  const chartHeight=320
  const paddingForXAxis=20
  const paddingForLegend=50
  const bottomPadding = paddingForXAxis + paddingForLegend
  const yConfigs = [
    { name: region1, lineColor: "blue", units: "" },
    { name: region2, lineColor: "red", units: "" },
    {
      name: region1.concat("-", region2),
      lineColor: "green",
      units: "",
    },
  ]
  return (
    <div key="SpreadsChart">
      <LineChart {
        ...{
          urlParams: {
            apiQueryName: "EEXSpreads",
            searchParams: { 
              region1: region1, 
              region2: region2, 
              maturity_type: maturityType,
              start_date: contractStartDate,
              shape: "base",
              from: startDate, 
              to: endDate, 
            }
          },
          chartParams: { 
            x: "trade_date",
            yUnits: "",
            xFormat: "dd-mmm",
            height: chartHeight, 
            padding: { top: 10, bottom: bottomPadding, left: 60, right: 40}, 
            legend: <VictoryLegend 
              x={100}
              y={chartHeight-paddingForLegend}
              data={yConfigs.map((yConfig) => legendParams(yConfig))}
              gutter={{left: 10, right: 10}}
              rowGutter={{ top: 0, bottom: 0}} 
              orientation="horizontal"
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

export default Spreads;
