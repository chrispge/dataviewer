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

function DemoChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedData = await getData(props);
      setData(fetchedData);
    })();
  }, [props]);

  return renderChart(data);
}

function renderChart(data) {
  const y_values = data.map((datum) => datum.mw_value);
  const yMax = Math.max(...y_values);
  const yUpperLim = 100 * Math.ceil(yMax / 100);
  return (
    <div>
      <h1>Line Chart</h1>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryAxis
          tickCount={5}
          // tickValues={data.map((datum) => datum.start_time)}
          tickFormat={(x) => new Date(x).toLocaleTimeString("fr-FR")}
          style={{ tickLabels: { fontSize: 5, padding: 3 } }}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, yUpperLim]}
          label="MW"
          style={{
            tickLabels: { fontSize: 5, padding: 3 },
            axisLabel: { fontSize: 5, padding: 20 },
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
            `${new Date(datum.start_time).toLocaleDateString(
              "fr-FR"
            )}\n${new Date(datum.start_time).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}\n${datum.mw_value} MW`
          }
          style={{
            data: { stroke: "blue" },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
          x={"start_time"}
          y={"mw_value"}
          tickdata
        />
      </VictoryChart>
    </div>
  );
}

async function getData(params) {
  console.log("in getData");
  const url = await makeUrl(params);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

async function makeUrl(params) {
  const { apiQueryName, ...searchParams } = params;
  console.log(apiQueryName);
  const queryString = Object.keys(searchParams)
    .map((key) => key + "=" + searchParams[key])
    .join("&");
  const url = new URL(apiQueryName, "http://localhost:3001/GenByUnit?");
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
