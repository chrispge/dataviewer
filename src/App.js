import React from "react";
import DemoChart from "./chart";
import { VictoryChart, VictoryBar, VictoryTooltip } from "victory";
const request = require("request");

function App() {
  const url = "http://localhost:3001/GenByUnit?fuel=nuclear&unit=tricastin%201";
  request.get(url, function (err, response, body) {
    if (err) {
      console.log(err);
    } else {
      console.log(body);
    }
  });
  return <DemoChart />;
}

export default App;
