// https://dev.to/alexandrudanpop/correctly-handling-async-await-in-react-components-4h74
// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
// https://www.pluralsight.com/guides/hierarchy-of-components-and-how-to-get-async-data
import React, { useState, useEffect } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";
import getXFormatter from "./xformatters";

function SpreadChart(props) {
  const [data, setData] = useState([]);
  console.log("In SpreadChart");
  console.log(props);

  useEffect(() => {
    (async () => {
      const fetchedData = await getData(props.urlParams);
      setData(fetchedData);
    })();
  }, [props.urlParams]);

  return renderChart(data, props);
}

function renderChart(data, props) {
  const { urlParams, chartParams } = props;
  console.log("In renderChart");
  console.log(data);
  const { x: xName, yConfigs } = chartParams;
  const yUpperLim = getYUpperLim(data, yConfigs);
  const xFormatter = getXFormatter(chartParams.xFormat);
  const xConfig = { name: xName, formatter: xFormatter };
  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryAxis
          tickCount={5}
          // tickValues={data.map((datum) => datum[xName])}
          // tickFormat={(x) => new Date(x).toLocaleTimeString("fr-FR")}
          tickFormat={xFormatter}
          style={{ tickLabels: { fontSize: 10, padding: 3 } }}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, yUpperLim]}
          // label="MW"
          style={{
            tickLabels: { fontSize: 10, padding: 3 },
            axisLabel: { fontSize: 10, padding: 20 },
          }}
        />
        {yConfigs.map((yConfig) => addLine(data, xConfig, yConfig))}
      </VictoryChart>
    </div>
  );
}

function getYUpperLim(data, yConfigs) {
  console.log("In getYUpperLim");
  const yMaxValues = yConfigs.map((yConfig) => getYMax(data, yConfig.name));
  const yMax = Math.max(...yMaxValues);
  const orderMag = Math.ceil(Math.log10(yMax)) - 1;
  console.log(orderMag);
  const multiplier = Math.pow(10, orderMag);
  console.log(multiplier);
  const yUpperLim = multiplier * Math.ceil(yMax / multiplier);
  return yUpperLim;
}

function getYMax(data, yName) {
  console.log("In getYMax");
  console.log(yName);
  const yValues = data.map((datum) => datum[yName]);
  console.log(yValues);
  const yMax = Math.max(...yValues);
  return yMax;
}

async function getData(urlParams) {
  console.log("in getData");
  const url = makeUrl(urlParams);
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

function makeUrl(params) {
  console.log("In makeUrl:");
  const { apiQueryName, searchParams } = params;
  console.log(apiQueryName);
  console.log(searchParams);
  const queryString = Object.keys(searchParams)
    .map((key) => key + "=" + searchParams[key])
    .join("&");
  const url = new URL(apiQueryName, "http://localhost:3001/");
  url.search = queryString;
  return url;
}

function addLine(data, xConfig, yConfig) {
  const { name: yName, lineColor, units: yUnits } = yConfig;
  const { name: xName, formatter: xFormatter } = xConfig;
  console.log("In addLine");
  return (
    <VictoryLine
      labelComponent={
        <VictoryTooltip
          cornerRadius={5}
          flyoutStyle={{ fill: "white" }}
          pointerLength={20}
          style={{
            // fill: "white",
            fontSize: 10,
            textAnchor: "middle",
            padding: 3,
          }}
        />
      }
      labels={({ datum }) =>
        `${xFormatter(datum[xName])}\n${datum[yName]} ${yUnits}`
      }
      style={{
        data: { stroke: lineColor },
        parent: { border: "1px solid #ccc" },
      }}
      data={data}
      x={xName}
      y={yName}
      tickdata
    />
  );
}
export default SpreadChart;
