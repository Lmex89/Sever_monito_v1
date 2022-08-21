import './App.css';

import axios from "axios";
import React from "react";

const baseURL = "http://192.168.1.200:8000/api/v1/temp_list/?view=code&code=core_0";


function getingTempdata(data) {
  let result = []
  for (let key in data){
    result.push(data[key].temp.value)
  }
  return result;
}

export default function App() {
  const [dataRequest, setDatarequest] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDatarequest(response.data);
    });
  }, []);

  if (!dataRequest) return null;

  return (
    <div>
      <h2> Current Cpu temp:  {dataRequest.at(-1).temp.value} °C</h2>
      <h2> Current Mem Ram Used : {dataRequest.at(-1).ram.value_used} MB </h2>
      <h2> Current Mem Ram Available : {dataRequest.at(-1).ram.value_available} MB </h2>
      <h2> Current Mem Ram Total : {dataRequest.at(-1).ram.value_total} MB </h2>
    </div>
  );
}

