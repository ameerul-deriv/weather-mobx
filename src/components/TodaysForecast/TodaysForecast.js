import React from "react";
import "./todaysForecast.scss";
import { useStore } from "../../store/WeatherStore";
import { observer } from "mobx-react";
import { BsFillCaretDownFill } from "react-icons/bs";

const TodaysForecast = () => {
  const weatherStore = useStore();
  const { todaysForecast } = weatherStore;
  return (
    <div className="todays-forecast">
      <div className="todays-forecast__title">
        <h3>Next 24 Hours</h3>
        <div className="todays-forecast-scroll">
          <h4>Scroll Left & Right</h4>
          <BsFillCaretDownFill className="scroll-icon" />
        </div>
      </div>
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
