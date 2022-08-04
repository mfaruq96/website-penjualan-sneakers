import React from "react";
import "./CardSeller.css";
import akun from "../../../Img/avatar-account.png";

export const CardSeller = ({ avatar, seller_name, province, city }) => {
  return (
    <div className="card-seller-main">
      <div className="card-seller-content">
        <div className="row">
          <div className="col-3 d-flex align-items-center justify-content-center" >
            <img
              src={`data:image/jpeg;base64,${avatar}`}
              alt="avatar seller"
              className="card-seller-avatar"
            />
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-12">
                <p className="card-seller-name">{seller_name}</p>
              </div>
              <div className="col-12">
                <p className="card-seller-addres">{`${province}  ,  ${city}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardSellerInfo = ({avatar, seller_name}) => {
  return (
    <div className="card-seller-info-main">
    <div className="card-seller-content">
      <div className="row">
        <div className="col-1 d-flex align-items-center" >
          <img
            src={`data:image/jpeg;base64,${avatar}`}
            alt="avatar seller"
            className="card-seller-avatar"
          />
        </div>
        <div className="col-11 ps-lg-4 ps-5">
          <div className="row">
            <div className="col-12">
              <p className="card-seller-name">{seller_name}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
