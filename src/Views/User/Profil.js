import React, { useEffect, useState } from "react";
import { NavbarSecond } from "../../Assets/Components/NavBar/NavbarSecond";
import "./profil.css";
import { connect } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Profil = (props) => {
  
  const navigate = useNavigate();

  useEffect(() => {
    if (props.userDetail.length === 0) {
      navigate(`/`)
    }
  }, []);

  return (
    <div className="profil-main">
    {console.log(props.userDetail)}
      <NavbarSecond page={"Profil Akun"} />

      <Outlet />

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetail: state.home.user_data,
  };
};

export default connect(mapStateToProps)(Profil);
