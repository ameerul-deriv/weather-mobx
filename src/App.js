import React, { useEffect } from "react";
import "./App.scss";
import Today from "./components/Today/Today";
import Forecast from "./components/Forecast/Forecast";
import { useStore } from "./store/WeatherStore";
import { observer } from "mobx-react";

function App() {
  const weatherStore = useStore();

  const { isLoading } = weatherStore;

  useEffect(() => {
    weatherStore.loadDefaultWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="App-loading">Loading</div>
      ) : (
        <header className="App-header">
          <Today></Today>
          <Forecast></Forecast>
        </header>
      )}
    </div>
  );
}

export default observer(App);
