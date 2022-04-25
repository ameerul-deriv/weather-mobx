import React from "react";
import { observable, action, decorate, runInAction } from "mobx";
import axios from "axios";

const key = "6a729b0da2454fa196c53543222004";
const todayDate = new Date(Date.now());
const today = todayDate.toLocaleDateString("en-MY", {
  weekday: "long",
});

export default class WeatherStore {
  weatherData = {};
  todaysForecast = [];
  futureForecast = [];
  futureForecastRow = [];
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
          this.todaysForecast = {
            currConditions: res.data.current.condition.text,
            today: res.data.forecast.forecastday[0],
          };
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
        this.isLoading = true;
        this.weatherData = res.data;
        this.todaysForecast = {
          currConditions: res.data.current.condition.text,
          today: res.data.forecast.forecastday[0],
        };
        this.futureForecast = res.data.forecast.forecastday;
        this.setFutureForecastRow();
      })
      .then(() => {
        this.isLoading = false;
      });
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
        day: day === today ? "Today" : day,
        maxtemp_c: element.day.maxtemp_c,
        maxtemp_f: element.day.maxtemp_f,
        mintemp_c: element.day.mintemp_c,
        mintemp_f: element.day.mintemp_f,
      };

      this.futureForecastRow.push(currForecast);
    });
  }
}

decorate(WeatherStore, {
  weatherData: observable,
  todaysForecast: observable,
  futureForecast: observable,
  futureForecastRow: observable,
  isLoading: observable,
  loadDefaultWeather: action.bound,
  setWeather: action.bound,
  setFutureForecastRow: action.bound,
});

let store_context;

export const useStore = () => {
  if (!store_context) {
    const weatherStore = new WeatherStore();

    store_context = React.createContext(weatherStore);
  }

  return React.useContext(store_context);
};
