import React, { useEffect } from 'react'
import "./EditProduk.css"
import { NavbarSecond } from "../../../Assets/Components/NavBar/NavbarSecond";
import { Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const EditIndex = (props) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (props.userDetail.length === 0) {
      navigate(`/`)
    }
  }, []);

  return (
    <>
      <NavbarSecond page={"Edit Produk"}/>
      <Outlet/>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetail: state.home.user_data,
  };
};

export default connect(mapStateToProps)(EditIndex);
