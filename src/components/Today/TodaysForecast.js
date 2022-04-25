import React from "react";
import "./today.scss";
import { useStore } from "../../store/WeatherStore";
import { observer } from "mobx-react";

const TodaysForecast = () => {
  const weatherStore = useStore();
  const { todaysForecast } = weatherStore;
  return (
    <div className="todays-forecast">
      <h3>{todaysForecast.currConditions}</h3>
      <hr className="todays-forecast__line" />
      <div className="todays-forecast__row">
        {todaysForecast.today?.hour?.map((forecast, i) => {
          let currDate = new Date(forecast.time_epoch * 1000);

          return (
            <div className="todays-forecast__box" key={i}>
              <h4>{currDate.getHours()}</h4>
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
