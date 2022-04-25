import React, { useState } from "react";
import "./today.scss";
import { useStore } from "../../store/WeatherStore";
import { observer } from "mobx-react";
import TodaysForecast from "./TodaysForecast";

const Today = () => {
  const weatherStore = useStore();

  const { weatherData, isLoading } = weatherStore;

  const [place, setPlace] = useState("");

  const changePlace = () => {
    weatherStore.setWeather(place);
  };

  return (
    <div className="today">
      <div className="today__search">
        <input
          type="text"
          placeholder="Enter City/Country..."
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={changePlace} disabled={place === ""}>
          Search
        </button>
      </div>
      {isLoading === false && (
        <div className="today__weather">
          <h1 className="today__city">{weatherData?.location?.name}</h1>
          <h1 className="today__temp">{weatherData?.current?.temp_c}°C</h1>
          <h4 className="today__country-region">
            {weatherData?.location?.country}{" "}
            {weatherData?.location?.region !== "" &&
              `| ${weatherData?.location?.region}`}
          </h4>
        </div>
      )}
      <TodaysForecast />
    </div>
  );
};

export default observer(Today);
