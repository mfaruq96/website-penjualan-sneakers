import React from "react";
import "./navsecond.css";
import { ReactComponent as IconMenu } from "../../Img/arrow-left-line.svg";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

export const NavbarSecond = ({ page }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 426px)" });
  return (
    <div className="container-fluid nav-second">
      <div className="nav-content d-flex justify-content-between align-items-center">
        <div>
          {isMobile ? (
            <IconMenu onClick={()=>{navigate(-1)}}/>
          ) : (
            <span className="nav-content-logo" onClick={()=>{navigate(`/`)}}>Sneakers.</span>
          )}
        </div>
        <div>
          <span className="page-name-second">{page}</span>
        </div>
      </div>
    </div>
  );
};
