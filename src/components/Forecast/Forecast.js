import React, { useState } from "react";
import "./forecast.scss";
import { useStore } from "../../store/WeatherStore";
import { observer } from "mobx-react";
import ForecastInfo from "./ForecastInfo/ForecastInfo";
import { BsFillCaretDownFill } from "react-icons/bs";

const Forecast = () => {
  const weatherStore = useStore();

  const [key, setKey] = useState(null);

  const { futureForecastRow } = weatherStore;

  return (
    <div className="forecast">
      <div className="forecast__title">
        <h3>3 Day Forecast</h3>
        <div className="forecast-scroll">
          <h4>Click A Row</h4>
          <BsFillCaretDownFill className="forecast-scroll-icon" />
        </div>
      </div>
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
            {i === key && <ForecastInfo forecast={forecast.hour} show={true} />}
          </div>
        );
      })}
    </div>
  );
};

export default observer(Forecast);
