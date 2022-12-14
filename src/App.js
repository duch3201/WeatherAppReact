import React from 'react';
import './App.css';

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes()
let city = localStorage.getItem('city')

class Topbar extends React.Component {
  render() {
    return <h1 class="text-2xl pt-4 pb-5 self-center">{time} · {this.props.name}</h1>;
  }
}

class Forecast extends React.Component {
  state = {
    isLoaded: false,
    weather: {
      temp: '',
      fl: '',
      ws: '',
      s: ''
    }
  }

  componentWillUnmount() {
    this.setState({ isLoaded: false });
  }

  async componentDidMount() {
    let city = localStorage.getItem('city');
    let lang = localStorage.getItem('lang');

    if (city == "") {
      let city = "warsaw"
    }

    let apiurl = "https://api.openweathermap.org/data/2.5/weather?q="+"bydgoszcz"+"&appid="+"e23ccc0152024d943c58994cda4d2e27"+"&lang=en&units=metric ";

    let response = await fetch(apiurl);
    let data = await response.json();

    this.setState({
      isLoaded: true,
      weather: {
        temp: data.main.temp,
        fl: data.main.feels_like,
        ws: data.wind.speed,
        s: data.weather[0].description
      }
    });
  }

  render() {
    const { isLoaded, weather } = this.state;

    if (!isLoaded) {
      return <h1 class="text-3xl pt-5">Loading...</h1>
    } else {
      return (
        <div>
          <h1 id="temp" class="text-9xl">{weather.temp}</h1>
          <h1 id="fl" class="text-xl pt-5 pb-2">{weather.fl}</h1>
          <h1 id="ws" class="text-xl pb-2">{weather.ws}</h1>
          <h1 id="s" class="text-xl">{weather.s}</h1>
        </div>
      )
    }
  }
}

const element = <Topbar name={city} />;
const weather = <Forecast name={"data"} />;

function App() {
  return (
    <div className="App">
      <div id="bg" class="w-screen h-screen">
        <div id="seminavbar">
          <button class="float-right mr-5 mt-3 rounded-lg bg-emerald-800 pt-1 w-16 pb-1" onClick={localStorage.setItem("city", "bydgoszcz")}>settings</button>
          <button class="float-left ml-5 mt-3 rounded-lg bg-emerald-800 pt-1 w-16 pb-1" onClick={() => this.forceUpdate(this)}>refresh</button>
        </div>
          <h5 class="">{element}</h5>
          <h1 class="text-9xl ">{weather}</h1>
      </div>
    </div>
  );
}

export default App;

