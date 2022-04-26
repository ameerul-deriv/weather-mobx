import React from "react";
import { observable, action, decorate, runInAction } from "mobx";
import axios from "axios";

const key = "6a729b0da2454fa196c53543222004";
const todayDate = new Date(Date.now());
const today = todayDate.toLocaleDateString("en-MY", {
  weekday: "long",
});
const tempColours = {
  hot: "#ee6600",
  warm: "#ffcc33",
  room: "#ffff99",
  cold: "#0cc2f5",
  freezing: "#c2f7ff",
};
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default class WeatherStore {
  weatherData = {};
  todaysForecast = [];
  futureForecast = [];
  futureForecastRow = [];
  currDate;
  isLoading = true;

  // load default weather data on initial render
  loadDefaultWeather() {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=Malaysia&days=7&aqi=no&alerts=no`
      )
      .then((res) => {
        runInAction(() => {
          console.log(res.data);
          this.isLoading = true;
          this.weatherData = res.data;
          this.setTodaysForecast();
          this.futureForecast = res.data.forecast.forecastday;
          this.setFutureForecastRow();
        });
      })
      .then(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  // change weather based on user input
  setWeather(p) {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${p}&days=7&aqi=no&alerts=no`
      )
      .then((res) => {
        console.log(res.data);
        this.isLoading = true;
        this.weatherData = res.data;
        this.setTodaysForecast();
        this.futureForecast = res.data.forecast.forecastday;
        this.setFutureForecastRow();
      })
      .then(() => {
        this.isLoading = false;
      });
  }

  // set todays forecast
  setTodaysForecast() {
    let condition = this.weatherData.current.condition.text;
    let currTime = this.weatherData.current.last_updated_epoch;
    let hours = this.weatherData.forecast.forecastday[0].hour;
    let nextDay = this.weatherData.forecast.forecastday[1].hour;
    let hour = [];

    hours.forEach((element) => {
      if (element.time_epoch > currTime) {
        hour.push(element);
      }
    });

    nextDay.forEach((element) => {
      if (hour.length !== 24) {
        hour.push(element);
      }
    });

    this.todaysForecast = {
      currTime: currTime,
      currConditions: condition,
      today: hour,
    };
  }

  // sets row info for future forecast component
  setFutureForecastRow() {
    this.futureForecastRow = [];

    this.futureForecast.forEach((element) => {
      let day = new Date(element.date_epoch * 1000).toLocaleDateString(
        undefined,
        {
          weekday: "long",
        }
      );

      let currForecast = {
        day: day === today ? "Today" : day.substring(0, 3),
        maxtemp_c: element.day.maxtemp_c,
        maxtemp_f: element.day.maxtemp_f,
        mintemp_c: element.day.mintemp_c,
        mintemp_f: element.day.mintemp_f,
        icon: element.day.condition.icon,
        text: element.day.condition.text,
        hour: element.hour,
      };

      this.futureForecastRow.push(currForecast);
    });
  }

  setTempColour(temp) {
    if (temp < 0) {
      return { color: tempColours.freezing };
    } else if (temp >= 0 && temp <= 20) {
      return { color: tempColours.cold };
    } else if (temp > 20 && temp <= 25) {
      return { color: tempColours.room };
    } else if (temp > 25 && temp <= 30) {
      return { color: tempColours.warm };
    } else if (temp > 30) {
      return { color: tempColours.hot };
    }
  }

  getFormattedDate(epoch) {
    let date = new Date(epoch * 1000).toLocaleDateString("en-MY", options);

    this.currDate = date;

    return this.currDate;
  }
}

decorate(WeatherStore, {
  weatherData: observable,
  todaysForecast: observable,
  futureForecast: observable,
  futureForecastRow: observable,
  currDate: observable,
  isLoading: observable,
  loadDefaultWeather: action.bound,
  setWeather: action.bound,
  setTodaysForecast: action.bound,
  setFutureForecastRow: action.bound,
  setTempColour: action.bound,
  getFormattedDate: action.bound,
});

let store_context;

export const useStore = () => {
  if (!store_context) {
    const weatherStore = new WeatherStore();

    store_context = React.createContext(weatherStore);
  }

  return React.useContext(store_context);
};
