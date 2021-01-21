// https://dev.to/alexandrudanpop/correctly-handling-async-await-in-react-components-4h74
// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
// https://www.pluralsight.com/guides/hierarchy-of-components-and-how-to-get-async-data
import React, { useState, useEffect } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLegend,
} from "victory";
import getXFormatter from "./xformatters";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./use-styles";

const chartTheme = { ...VictoryTheme.material };
chartTheme.axis.style.tickLabels.fill = "white";

function LineChart(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  console.log("in linechart")
  console.log(props)

  useEffect(
    () => {
      (async () => {
        setIsLoading(true);
        const fetchedData = await getData(props.urlParams);
        if (fetchedData.name !== "error") { 
          setData(fetchedData);
        }
        setIsLoading(false);
      })();
    },
    // decalare dependent parameters
    // useEffect will only run when these change
    [props.urlParams]
  );

  if (data.length > 0) {
    return renderChart(data, props.chartParams, classes);
  } else if (isLoading) {
    return null;
  } else {
    return null;
  }
}

function legendParams(yConfig) { 
  return {name: yConfig.name, symbol: {fill: yConfig.lineColor}} 
} 

function renderChart(data, chartParams, classes) {
  const { x: xName, yConfigs, xFormat, chartTitle, legend, height, width, padding} = chartParams;
  const yUpperLim = getYUpperLim(data, yConfigs);
  const yLowerLim = getYLowerLim(data, yConfigs);
  const xFormatter = getXFormatter(xFormat);
  const xConfig = { name: xName, formatter: xFormatter };

  return (
    <div key={chartTitle} className={classes.root}>
      {/* <Grid item xs={12} sm={6} md={4} lg={3} min-height={240}> */}
      <Grid item xs={12} >
        <Typography variant="h6" align="center">
          {chartTitle}
        </Typography>
        <VictoryChart
          // theme={VictoryTheme.material}
          theme={chartTheme}
          containerComponent={<VictoryVoronoiContainer />}
          padding={padding ? padding : { top: 10, bottom: 60, left: 60, right: 40 }}
          height={height}
          width={width}
        >
    { legend ? legend : null }
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
            style={{
              tickLabels: { fontSize: 10, padding: 3 },
              axisLabel: { fontSize: 10, padding: 45 },
            }}
            label={yConfigs.units}
            // why is this not working?
          />
          {yConfigs.map((yConfig) => addLine(data, xConfig, yConfig))}
        </VictoryChart>
      </Grid>
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
  const orderMag = Math.ceil(Math.log10(Math.abs(yMin))) - 1;
  const multiplier = Math.max(Math.pow(10, orderMag), 1);
  const yLowerLim =
    multiplier * Math.sign(yMin) * Math.ceil(Math.abs(yMin) / multiplier);
  return yLowerLim;
}

function getYMax(data, yName) {
  const yValues = data.map((datum) => datum[yName]);
  const yMax = Math.max(...yValues);
  return yMax;
}

function getYMin(data, yName) {
  const yValues = data.map((datum) => datum[yName]);
  const yMin = Math.min(...yValues);
  return yMin;
}

async function getData(urlParams) {
  const url = makeUrl(urlParams);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function makeUrl(params) {
  const { apiQueryName, searchParams } = params;
  const queryString = Object.keys(searchParams)
    .map((key) => key + "=" + searchParams[key])
    .join("&");
  const url = new URL(
    apiQueryName,
    process.env.REACT_APP_DB_URL,
  );
  url.search = queryString;
  return url;
}

function makeFileUrl(params) {
  const { apiQueryName, searchParams } = params;
  var noFrom = { ...searchParams };
  delete noFrom.from;
  var queryString = Object.values(noFrom).join("-");
  queryString = queryString.replace(new RegExp(" ", "g"), "");
  // data folder must be in 'public'
  const url = "./data/" + apiQueryName + "/" + queryString + ".json";
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

function addLine(data, xConfig, yConfig) {
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
        `${yName.toUpperCase()}\n${xFormatter(datum[xName])}\n${datum[yName]} ${yUnits}`
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
