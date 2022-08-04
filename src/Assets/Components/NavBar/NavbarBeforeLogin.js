import React from "react";
import "../NavBar/NavbarBeforeLogin.css";
import { useNavigate } from "react-router-dom";

export const NavbarBeforeLogin = () => {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/auth/login");
  }

  return (
    <div className="navbar1">
      <div className="container-sm">
        <div className="d-flex justify-content-between">
          <p className="text-home" onClick={()=>{navigate(`/`)}}>Sneakers</p>
          <button
            className="button-navbarBefore"
            variant="outline-primary"
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
