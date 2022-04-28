import React from "react";
import "./forecast-info.scss";
import { useStore } from "../../../store/WeatherStore";
import {
  BsFillCloudRainHeavyFill,
  BsCloudSnowFill,
  BsWind,
} from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";

const ForecastInfo = (props) => {
  const { forecast, show } = props;
  const weatherStore = useStore();

  return (
    <div className={`forecast-info  ${show ? "show" : "hidden"}`}>
      <div className="info-container">
        {forecast.map((hour, h) => {
          let time = hour.time;
          let day = weatherStore.getFormattedDate(hour.time_epoch);

          return (
            <div key={h} className="info-row">
              <div className="time-container">
                <h4 className="time">{time.substring(time.length - 5)}</h4>
                <h4 className="day">{day.slice(0, -5)}</h4>
              </div>
              <div className="icon-pred">
                <img className="icon" src={hour.condition.icon} alt="" />
                <h4 className="pred">{hour.condition.text}</h4>
              </div>
              <div className="hour-pred">
                <div className="chance-rain">
                  <BsFillCloudRainHeavyFill></BsFillCloudRainHeavyFill>
                  <h4 className="chance-rain-text">{hour.chance_of_rain}%</h4>
                </div>
                <div className="chance-snow">
                  <BsCloudSnowFill></BsCloudSnowFill>
                  <h4 className="chance-snow-text">{hour.chance_of_snow}%</h4>
                </div>
                <div className="wind-speed">
                  <BsWind></BsWind>
                  <h4 className="wind-speed-text">{hour.wind_kph}kph</h4>
                </div>
                <div className="humidity">
                  <WiHumidity></WiHumidity>
                  <h4 className="humidity-text">{hour.humidity}%</h4>
                </div>
              </div>
              <h4 className="temp">{Math.round(hour.temp_c)}°C</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastInfo;
