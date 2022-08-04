import React from "react";
import { Outlet } from "react-router-dom";
import "./Auth.css";

export const Auth = () => {
  return (
    <div className="container-fluid auth-main">
      <div className="row auth-content">
        <div className="col col-lg-7 col-sm-12 col-12 auth-left-side">
          <div></div>
        </div>
        <div className="col col-lg-5 col-sm-12 col-12 d-flex justify-content-center d-flex align-items-center auth-right-side">
          <div className="auth-right-side-form">

          {/* {Outlet berisi login dan register form} */}
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};
