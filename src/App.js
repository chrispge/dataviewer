import React from "react";
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
  return (
    <div>
      <p>Hello World</p>
    </div>
  );
}

export default App;
