import React, {useState} from "react";
import LineChart from "./line-chart";
import ContentSingle from "./content-single-chart.js";

import PricesForm from "./prices-form.js"


function Prices() {
  const today = new Date()
  const start = new Date()
  start.setDate(today.getDate()-60)
  const [region, setRegion] = useState("de"); 
  const [maturityType, setMaturityType] = useState("month")
  const [contractStartDate, setContractStartDate] = useState("2021-01-01")
  const [startDate, setStartDate] = useState(DateToString(start))
  const [endDate, setEndDate] = useState(DateToString(today))

  const handleRefresh = (stageRegion, stageMaturityType, stageContractStartDate, stageStartDate, stageEndDate) => { 
    setRegion(stageRegion)
    setMaturityType(stageMaturityType)
    setContractStartDate(stageContractStartDate)
    setStartDate(stageStartDate)
    setEndDate(stageEndDate)
  }; 

  return (
    <ContentSingle
      title="Prices"
      form=<PricesForm {...{region, maturityType, contractStartDate, startDate, endDate, handleRefresh}}/>
      display={renderChart({region, maturityType, contractStartDate, startDate, endDate})}
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
  const {region, maturityType, contractStartDate, startDate, endDate } = inputs;
  return (
    <div key="PricesChart">
      <LineChart {
        ...{
          urlParams: {
            apiQueryName: "EEXPrices",
            searchParams: { 
              region: region, 
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
            showLegend: false,
            yConfigs: [
              { name: region, lineColor: "blue", units: "" },
            ]
          }, 
        }}
      />
    </div>
  );
}

export default Prices;
