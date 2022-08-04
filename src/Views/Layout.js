import React from "react";
// import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Routers } from "../Routers/Routers";

export const Layout = () => {
  return (
    <div>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </div>
  );
};
