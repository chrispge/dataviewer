// https://dev.to/alexandrudanpop/correctly-handling-async-await-in-react-components-4h74
// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
// https://www.pluralsight.com/guides/hierarchy-of-components-and-how-to-get-async-data
import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";

function DemoChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedData = await getDataSimple();
      setData(fetchedData);
    })();
  }, []);

  return (
    <div>
      <h1>Line Chart</h1>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer mouseFollowToolTips />}
      >
        <VictoryAxis
          tickValues={data.map((datum) => datum.start_time)}
          tickFormat={(x) => new Date(x).toLocaleDateString()}
          style={{ tickLabels: { fontSize: 5, padding: 3 } }}
        />
        <VictoryAxis
          dependentAxis
          label="MW"
          tickValues={[850, 860, 870, 880, 890, 900]}
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
            `${new Date(datum.start_time).toLocaleDateString()}\n${new Date(
              datum.start_time
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}\n${datum.mw_value}MW`
          }
          style={{
            data: { stroke: "blue" },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
          y={"mw_value"}
          tickdata
        />
      </VictoryChart>
    </div>
  );
}

async function getDataSimple() {
  console.log("in getDataSimple");
  const url = "http://localhost:3001/GenByUnit?fuel=nuclear&unit=tricastin%201";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

// function getData() {
//   const url = "http://localhost:3001/GenByUnit?fuel=nuclear&unit=tricastin%201";
//   fetch(url)
//     .then((response) => {
//       const reader = response.body.getReader();
//       // create a new stream with all the data
//       // later if you need to you will be able to dequeue old data off this stream
//       return new ReadableStream({
//         start(controller) {
//           return pump();

//           function pump() {
//             return reader.read().then(({ done, value }) => {
//               // When no more data needs to be consumed, close the stream
//               if (done) {
//                 controller.close();
//                 return;
//               }
//               // Enqueue the next data chunk into target stream
//               controller.enqueue(value);
//               return pump();
//             });
//           }
//         },
//       });
//     })
//     .then((stream) => new Response(stream))
//     .then((response) => response.json())
//     .then((data) => renderChart(data));
// }

export default DemoChart;
