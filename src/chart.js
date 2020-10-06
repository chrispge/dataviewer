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
    x: "2020-10-03T20:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 889,
    label: "test",
  },
  {
    x: "2020-10-03T17:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 895,
    label: "test",
  },
  {
    x: "2020-10-03T16:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 894,
    label: "test",
  },
  {
    x: "2020-10-03T15:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 894,
    label: "test",
  },
  {
    x: "2020-10-03T18:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 890,
    label: "test",
  },
  {
    x: "2020-10-03T14:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 894,
    label: "test",
  },
  {
    x: "2020-10-03T12:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 894,
    label: "test",
  },
  {
    x: "2020-10-03T19:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 889,
    label: "test",
  },
  {
    x: "2020-10-03T11:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 894,
    label: "test",
  },
  {
    x: "2020-10-03T10:00:00.000Z",
    generation_name: "TRICASTIN 1",
    fuel: "NUCLEAR",
    y: 894,
    label: "test",
  },
];

const xaxis = data.map((datum) => datum.x);
const ttLabels = data.map((datum) => datum.y);

const DemoChart = () => (
  <div>
    <h1>Line Chart</h1>
    <VictoryChart
      theme={() => VictoryTheme.material}
      // containerComponent={<VictoryVoronoiContainer labels={ttLabels} />}
    >
      <VictoryAxis
        tickValues={xaxis}
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
      <VictoryBar
        labelComponent={<VictoryTooltip />}
        style={{
          data: { stroke: "blue" },
          parent: { border: "1px solid #ccc" },
        }}
        data={data}
        tickdata
      />
    </VictoryChart>
  </div>
);

export default DemoChart;
