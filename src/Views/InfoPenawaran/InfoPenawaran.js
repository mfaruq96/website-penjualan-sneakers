import React, { useEffect } from "react";
import { NavbarSecond } from "../../Assets/Components/NavBar/NavbarSecond";
import { connect } from "react-redux";
import { OfferComponents } from "../../Assets/Components/Offer/OfferComponents";
import "./InfoPenawaran.css";
import { useNavigate } from "react-router-dom";

const InfoPenawaran = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.dataTransaksi.length === 0) {
      navigate(`/`);
    }
  }, []);

  const showOffers = (data) => {
    data = props.dataTransaksi;

    return data
      .map((value, index) => {
        return (
          <OfferComponents
            dataTransaction={value}
            dataUser={props.userDetail}
            key={index}
          />
        );
      })
      .reverse();
  };

  return (
    <div className="info-penawaran-main">
      <NavbarSecond page={"Penawaran"} />
      <div className="container-sm d-flex justify-content-center">
        <div className="info-penawaran-content ">
          {showOffers(props.dataTransaksi)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataTransaksi: state.home.data_transaksi,
    userDetail: state.home.user_data,
  };
};

export default connect(mapStateToProps)(InfoPenawaran);
