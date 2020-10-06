import React from "react";
import * as V from "victory";
import {
  VictoryLine,
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";

const data = [
  {
    start_time: "2020-10-03T20:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 889,
  },
  {
    start_time: "2020-10-03T17:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 895,
  },
  {
    start_time: "2020-10-03T16:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 894,
  },
  {
    start_time: "2020-10-03T15:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 894,
  },
  {
    start_time: "2020-10-03T18:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 890,
  },
  {
    start_time: "2020-10-03T14:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 894,
  },
  {
    start_time: "2020-10-03T12:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 894,
  },
  {
    start_time: "2020-10-03T19:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 889,
  },
  {
    start_time: "2020-10-03T11:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 894,
  },
  {
    start_time: "2020-10-03T10:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    mw_value: 894,
  },
];

const xTickValues = data.map((datum) => datum.start_time);
const ttLabels = data.map((datum) => datum.y);

const DemoChart = () => (
  <div>
    <h1>Line Chart</h1>
    <VictoryChart
      theme={() => VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer mouseFollowToolTips labels={ttLabels} />
      }
    >
      <VictoryAxis
        tickValues={xTickValues}
        tickFormat={(x) => new Date(x).toLocaleDateString()}
        style={{ tickLabels: { fontSize: 5, padding: 3 } }}
      />
      <VictoryAxis
        dependentAxis
        label="MW"
        tickValues={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
        style={{
          tickLabels: { fontSize: 5, padding: 3 },
          axisLabel: { fontSize: 5, padding: 13 },
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

export default DemoChart;
