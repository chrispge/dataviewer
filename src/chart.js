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

function DemoChart(props) {
  const { urlParams, chartParams } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedData = await getData(urlParams);
      setData(fetchedData);
    })();
  }, [urlParams]);
  return renderChart(data, chartParams);
}

function renderChart(data, chartParams) {
  console.log("In renderChart");
  console.log(data);
  console.log(chartParams);
  const { x: xName, y: yName, yUnits } = chartParams;
  console.log(yName);
  const yUpperLim = getYUpperLim(data, yName);
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
          y={chartParams.y}
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
  const { apiQueryName, searchParams } = params;
  console.log(apiQueryName);
  const queryString = Object.keys(searchParams)
    .map((key) => key + "=" + searchParams[key])
    .join("&");
  const url = new URL(apiQueryName, "http://localhost:3001/");
  url.search = queryString;
  return url;
}

function streamData() {
  const url = "http://localhost:3001/GenByUnit?fuel=nuclear&unit=tricastin%201";
  fetch(url)
    .then((response) => {
      const reader = response.body.getReader();
      // create a new stream with all the data
      // later if you need to you will be able to dequeue old data off this stream
      return new ReadableStream({
        start(controller) {
          return pump();

          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    .then((stream) => new Response(stream))
    .then((response) => response.json())
    .then((data) => renderChart(data));
}

export default DemoChart;
