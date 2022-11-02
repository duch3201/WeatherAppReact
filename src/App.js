import { data } from 'autoprefixer';
import React from 'react';
import './App.css';

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes()
let city = localStorage.getItem('city')
let lang = localStorage.getItem('lang')


class Welcome extends React.Component {
  render() {
    return <h1 class="text-2xl pt-4 pb-5 self-center">{time} · {this.props.name}</h1>;
  }
}

class requesttoapi extends React.Component {
  render() {
    return (
      <h1>requesttoapi</h1>
    )
  }
}

class Forecast extends React.Component {
  

  async componentDidMount() {
    let sdata = "";
    let city = localStorage.getItem('city');
    let lang = localStorage.getItem('lang');
    let test = "http://localhost:5000/get-weather/"+city+"/"+lang
    // GET request using fetch with async/await
    fetch("https://my-json-server.typicode.com/duch3201/samplejsapi/responce")
    .then(response => response.json())
    .then(data => sdata = data);

    console.log(sdata.ftemp);

  };

  render() {
    return (
      <><h1 id="temp" class="text-9xl">temp</h1>
      <h1 id="fl" class="text-xl pt-5 pb-2">feels like</h1>
      <h1 id="ws" class="text-xl pb-2">wind speed</h1>
      <h1 id="s" class="text-xl">status</h1>
      </>
    );

  }
}

//var data = getWeather();
//console.log(data)

const element = <Welcome name={city} />;
const weather = <Forecast name={"data"} />;
const test = <requesttoapi/>

function App() {
  return (
    <div className="App">
      <div id="bg" class="w-screen h-screen">
        <div id="seminavbar">
          <navbar/>
          <button class="float-right mr-5 mt-3 rounded-lg bg-emerald-800 pt-1 w-16 pb-1" onClick={localStorage.setItem("city", "warsaw")}>settings</button>
          <button class="float-left ml-5 mt-3 rounded-lg bg-emerald-800 pt-1 w-16 pb-1">refresh</button>
        </div>
          <h5 class="">{element}</h5>
          <h1 class="text-9xl ">{weather}</h1>
      </div>

    </div>
  );
}

export default App;