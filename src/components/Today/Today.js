import React, { useState } from "react";
import "./today.scss";
import { useStore } from "../../store/WeatherStore";
import { observer } from "mobx-react";
import { HiOutlineLocationMarker, HiOutlineSearchCircle } from "react-icons/hi";

const Today = () => {
  const weatherStore = useStore();

  const { weatherData, isLoading, searchedPlaces } = weatherStore;

  const [place, setPlace] = useState("");
  const [search, setSearch] = useState(false);

  const handleEnter = (key) => {
    if (key === "Enter") {
      if (place !== "") {
        weatherStore.setWeather(place);
      }
    }
  };

  const handleSearch = () => {
    setSearch((prevSearch) => !prevSearch);
  };

  const handleInput = (place) => {
    setPlace(place);
    if (place !== "") {
      weatherStore.searchPlace(place);
    }
  };

  const handleSearchClick = (place) => {
    weatherStore.setWeather(place);
    weatherStore.setSearchedPlaces();
    handleSearch();
    setPlace("");
  };

  return (
    <div className="today">
      <div className="today__main">
        <div className="search-container">
          <div className={`search ${search ? "show" : "hidden"}`}>
            <div className="search-input">
              <input
                type="text"
                placeholder="Enter City/Country..."
                onChange={(e) => handleInput(e.target.value)}
                onKeyPress={(e) => handleEnter(e.key)}
                value={place}
              />
              {searchedPlaces.length !== 0 && (
                <div className="searched-places-container">
                  {searchedPlaces.map((search) => {
                    return (
                      <div
                        key={search.id}
                        className="searched-places"
                        onClick={() => handleSearchClick(search.name)}
                      >
                        <h4>{search.name}</h4>
                        <h5>{search.country}</h5>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <HiOutlineSearchCircle
            className={`searchIcon ${search && "active"}`}
            onClick={handleSearch}
          />
        </div>
        {isLoading === false && (
          <div className="today__weather">
            <div className="city">
              <HiOutlineLocationMarker className="icon" />
              <h1 className="name">{weatherData?.location?.name}</h1>
            </div>
            <h1
              className="temp"
              style={weatherStore.setTempColour(weatherData?.current?.temp_c)}
            >
              {weatherData?.current?.temp_c}°C
            </h1>
            <h4 className="condition">
              {weatherData?.current?.condition.text}
            </h4>
            <h4 className="date">
              {weatherStore.getFormattedDate(
                weatherData?.current?.last_updated_epoch
              )}
            </h4>
          </div>
        )}
        <div className="location">
          <h4>{weatherData?.location?.region}</h4>
          <h4>{weatherData?.location?.country}</h4>
        </div>
      </div>
    </div>
  );
};

export default observer(Today);
