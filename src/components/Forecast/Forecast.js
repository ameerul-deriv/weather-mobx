import React, { useState } from "react";
import "./forecast.scss";
import { useStore } from "../../store/WeatherStore";
import { observer } from "mobx-react";

const Forecast = () => {
  const weatherStore = useStore();

  const [key, setKey] = useState(null);

  const { futureForecastRow } = weatherStore;

  return (
    <div className="forecast">
      <h3>3 Day Forecast</h3>
      <hr />
      {futureForecastRow.map((forecast, i) => {
        return (
          <div
            key={i}
            className={`forecast__container ${key === i && "active"}`}
            onClick={() => (key === i ? setKey(null) : setKey(i))}
          >
            <div className="forecast__row">
              <h4 className="day">{forecast.day}</h4>
              <div className="forecast-img">
                <img src={forecast.icon} alt="" />
                <h4>{forecast.text}</h4>
              </div>
              <div className="low-high">
                <h4 style={weatherStore.setTempColour(forecast.mintemp_c)}>
                  L: {Math.round(forecast.mintemp_c)}°C
                </h4>
                <h4 style={weatherStore.setTempColour(forecast.maxtemp_c)}>
                  H: {Math.round(forecast.maxtemp_c)}°C
                </h4>
              </div>
            </div>
            {i === key && (
              <div className="info">
                {forecast.hour.map((hour, h) => {
                  let time = hour.time;
                  let day = weatherStore.getFormattedDate(hour.time_epoch);

                  return (
                    <div key={h} className="info-row">
                      <div className="time-container">
                        <h4 className="time">
                          {time.substring(time.length - 5)}
                        </h4>
                        <h4 className="day">{day.slice(0, -5)}</h4>
                      </div>
                      <img className="icon" src={hour.condition.icon} alt="" />
                      <h4 className="temp">{hour.temp_c}</h4>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default observer(Forecast);
