import React from "react";
import "./error-popup.scss";
import { useStore } from "../../store/WeatherStore";
import { observer } from "mobx-react";
import { MdOutlineError, MdClose } from "react-icons/md";

const ErrorPopup = () => {
  const weatherStore = useStore();

  const { isError } = weatherStore;

  return (
    <div className={`error ${isError.error ? "show" : "hidden"}`}>
      <div className="error__icon">
        <div className="error-outer-circle"></div>
        <MdOutlineError className="error-icon" />
      </div>
      <div className="error__msg">
        <h4 className="error-title">{isError.name}</h4>
        <h4 className="error-msg">{isError.msg}</h4>
      </div>
      <MdClose
        className="error__close"
        onClick={() => weatherStore.closeError()}
      />
    </div>
  );
};

export default observer(ErrorPopup);
