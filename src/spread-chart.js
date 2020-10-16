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
  console.log("In MultiLineChart");
  console.log("urlParams.length");
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
  const { x: xName, y: yName, yUnits } = chartParams;
  const yUpperLim = getYUpperLim(data, urlParams.searchParams.region1);
  const xFormatter = getXFormatter(chartParams.xFormat);
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
            `${new Date(datum[xName]).toLocaleDateString(
              "default"
            )}\n${new Date(datum[xName]).toLocaleTimeString("default", {
              hour: "2-digit",
              minute: "2-digit",
            })}\n${datum[yName]} ${yUnits}`
          }
          style={{
            data: { stroke: "blue" },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
          x={chartParams.x}
          y={urlParams.searchParams.region1}
          tickdata
        />
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
            `${new Date(datum[xName]).toLocaleDateString(
              "default"
            )}\n${new Date(datum[xName]).toLocaleTimeString("default", {
              hour: "2-digit",
              minute: "2-digit",
            })}\n${datum[yName]} ${yUnits}`
          }
          style={{
            data: { stroke: "red" },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
          x={chartParams.x}
          y={urlParams.searchParams.region2}
          tickdata
        />
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
            `${new Date(datum[xName]).toLocaleDateString(
              "default"
            )}\n${new Date(datum[xName]).toLocaleTimeString("default", {
              hour: "2-digit",
              minute: "2-digit",
            })}\n${datum[yName]} ${yUnits}`
          }
          style={{
            data: { stroke: "green" },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
          x={chartParams.x}
          y={urlParams.searchParams.region1.concat(
            "-",
            urlParams.searchParams.region2
          )}
          tickdata
        />
      </VictoryChart>
    </div>
  );
}

function getYUpperLim(data, yName) {
  console.log("In getYUpperLim");
  console.log(yName);
  const yValues = data.map((datum) => datum[yName]);
  console.log(yValues);
  const yMax = Math.max(...yValues);
  const orderMag = Math.ceil(Math.log10(yMax)) - 1;
  console.log(orderMag);
  const multiplier = Math.pow(10, orderMag);
  console.log(multiplier);
  const yUpperLim = multiplier * Math.ceil(yMax / multiplier);
  return yUpperLim;
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

// function innerJoin(data1, data2, onKey, suffix) {
//   // returns a combined array
//   // as the inner join of the two arrays on onKey
//   // with suffix appended to each key name to make it clear
//   // which comes from where
//   const joined = { ...data1 };
//   console.log("Type of joined: ");
//   console.log(typeof joined);
//   console.log(typeof data1);
//   console.log(data1);
//   joined.forEach((obj) => {
//     const obj2 = data2[obj[onKey]];
//     if (obj2) {
//       Object.keys(obj2).forEach((key) => {
//         obj[key + suffix] = obj2[key];
//       });
//     }
//   });
//   return joined;
// }

function getObjWithParam(array, key, value) {}
export default SpreadChart;
