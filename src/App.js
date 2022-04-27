import React, { useEffect } from "react";
import "./App.scss";
import Today from "./components/Today/Today";
import Forecast from "./components/Forecast/Forecast";
import TodaysForecast from "./components/TodaysForecast/TodaysForecast";
import { useStore } from "./store/WeatherStore";
import { observer } from "mobx-react";
import ErrorPopup from "./components/ErrorPopup/ErrorPopup";

function App() {
  const weatherStore = useStore();

  const { isLoading } = weatherStore;

  useEffect(() => {
    weatherStore.loadDefaultWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <ErrorPopup />
      {isLoading ? (
        <div className="App-loading">Loading</div>
      ) : (
        <header className="App-header">
          <Today></Today>
          <div className="app-forecast">
            <TodaysForecast />
            <Forecast></Forecast>
          </div>
        </header>
      )}
    </div>
  );
}

export default observer(App);
