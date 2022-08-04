import React, { useState } from "react";
import { ReactComponent as IconAdd } from "../../../Img/add-fill.svg";
import "./ButtonSell.css";

export const ButtonSell = ({ fungsi }) => {
  return (
    <div className="button-sell-main">
      <div
        className="button-sell-content d-flex align-items-center"
        onClick={fungsi}
      >
        <p className="flex-grow-1 button-sell-text">Jual</p>
        <IconAdd />
      </div>

    </div>
  );
};
