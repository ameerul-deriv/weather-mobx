import React from "react";
import "./forecast.scss";
import { useStore } from "../../store/WeatherStore";
import { observer } from "mobx-react";

const Forecast = () => {
  const weatherStore = useStore();

  const { futureForecastRow } = weatherStore;

  return (
    <div className="forecast">
      <h3>3 Day Forecast</h3>
      <hr />
      {futureForecastRow.map((forecast, i) => {
        return (
          <div key={i} className="forecast__container">
            <div className="forecast__row">
              <h4>{forecast.day}</h4>
              <h4>{forecast.mintemp_c}</h4>
              <h4>{forecast.maxtemp_c}</h4>
            </div>
            {i !== futureForecastRow.length - 1 && <hr />}
          </div>
        );
      })}
    </div>
  );
};

export default observer(Forecast);
