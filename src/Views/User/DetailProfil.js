import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./profil.css";
import avatar from "../../Assets/Img/avatar-account.png";

const DetailProfil = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container-sm profil-content">
        <div className="row">
          <div className="col col-lg-4 col-sm-12 col-12 d-flex flex-column align-items-center justify-content-center profil-left">
            <img
              src={props.userDetail.img === null ? (avatar):(`data:image/jpeg;base64,${props.userDetail.img}`)}
              alt="avatar-account"
              className="avatar"
            />
          </div>
          <div className="col col-lg-8 col-sm-12 col-12 profil-right">
            <div className="mb-3">
              <label className="form-label">Nama</label>
              <p>{props.userDetail.username}</p>
            </div>

            <div className="mb-3">
              <label className="form-label">Provinsi</label>
              <p>{props.userDetail.provinsi}</p>
            </div>

            <div className="mb-3">
              <label className="form-label">Kota</label>
              <p>{props.userDetail.kota}</p>
            </div>

            <div className="mb-3">
              <label className="form-label">Alamat</label>
              <p>{props.userDetail.alamat}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">No Handphone</label>
              <p>{props.userDetail.notelepon}</p>
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <button
                type="submit"
                className="button-input-profil"
                onClick={() => {
                  navigate(`/profil/edit`)
                }}
              >
                Edit Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetail: state.home.user_data,
  };
};

export default connect(mapStateToProps)(DetailProfil);
