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

function LineChart(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("In LineChart");
  console.log(props);

  useEffect(
    () => {
      (async () => {
        setIsLoading(true);
        const fetchedData = await getData(props.urlParams);
        setData(fetchedData);
        setIsLoading(false);
      })();
    },
    // decalare dependent parameters
    // useEffect will only run when these change
    [props.urlParams]
  );

  if (data.length > 0) {
    return renderChart(data, props.chartParams);
  } else if (isLoading) {
    // experiment to see if adding a Loading place holder produces less jumpiness
    // (it doesn't)
    // return <div>Loading...</div>;
    return null;
  } else {
    return null;
  }
}

function renderChart(data, chartParams) {
  console.log("In renderChart");
  console.log(data);
  const { x: xName, yConfigs, xFormat, chartTitle } = chartParams;
  const yUpperLim = getYUpperLim(data, yConfigs);
  console.log("yUpperLim");
  console.log(yUpperLim);
  const yLowerLim = getYLowerLim(data, yConfigs);
  console.log("yLowerLim");
  console.log(yLowerLim);
  const xFormatter = getXFormatter(xFormat);
  const xConfig = { name: xName, formatter: xFormatter };
  return (
    <div key={chartTitle} className="grid-item">
      <h2 className="chart-title">{chartTitle}</h2>
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
          // NB using domain here gives a warning - but it works
          // I have tried e.g. maxDomain but those don't set axis max at right point
          domain={[yLowerLim, yUpperLim]}
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
  const yMaxValues = yConfigs.map((yConfig) => getYMax(data, yConfig.name));
  const yMax = Math.max(Math.max(...yMaxValues), 10);
  const orderMag = Math.ceil(Math.log10(yMax)) - 1;
  const multiplier = Math.pow(10, orderMag);
  const yUpperLim = multiplier * Math.ceil(yMax / multiplier);
  return yUpperLim;
}

function getYLowerLim(data, yConfigs) {
  const yMinValues = yConfigs.map((yConfig) => getYMin(data, yConfig.name));
  const yMin = Math.min(Math.min(...yMinValues), 0);
  console.log(yMin);
  const orderMag = Math.ceil(Math.log10(Math.abs(yMin))) - 1;
  console.log(orderMag);
  const multiplier = Math.max(Math.pow(10, orderMag), 1);
  const yLowerLim =
    multiplier * Math.sign(yMin) * Math.ceil(Math.abs(yMin) / multiplier);
  return yLowerLim;
}

function getYMax(data, yName) {
  console.log("In getYMax");
  console.log(yName);
  const yValues = data.map((datum) => datum[yName]);
  console.log(yValues);
  const yMax = Math.max(...yValues);
  console.log(yMax);
  return yMax;
}

function getYMin(data, yName) {
  console.log("In getYMin");
  console.log(yName);
  const yValues = data.map((datum) => datum[yName]);
  console.log(yValues);
  const yMin = Math.min(...yValues);
  console.log(yMin);
  return yMin;
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
  console.log("In addLine");
  console.log(yConfig);
  const { name: yName, lineColor, units: yUnits } = yConfig;
  const { name: xName, formatter: xFormatter } = xConfig;
  return (
    <VictoryLine
      key={yName}
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
export default LineChart;
