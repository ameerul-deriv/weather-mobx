import React from "react";
import "./today.scss";
import { useStore } from "../../store/WeatherStore";
import { observer } from "mobx-react";

const TodaysForecast = () => {
  const weatherStore = useStore();
  const { todaysForecast } = weatherStore;
  return (
    <div className="todays-forecast">
      <h3>Today</h3>
      <hr className="todays-forecast__line" />
      <div className="todays-forecast__row">
        {todaysForecast.today?.map((forecast, i) => {
          let currTime = forecast.time;

          return (
            <div
              className={`todays-forecast__box ${i === 0 && "curr-time"}`}
              key={i}
            >
              <h4 className="todays-forecast__time">
                {currTime.substring(currTime.length - 5)}
              </h4>
              <img src={forecast.condition?.icon} alt="weather" />
              <h4>{Math.round(forecast.temp_c)}°C</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(TodaysForecast);
