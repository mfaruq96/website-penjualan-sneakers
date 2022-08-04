import React from "react";
import axios from "axios";
import { CardSellerInfo } from "../Card/CardSeller/CardSeller";
import "./OfferComponents.css";
import { useNavigate } from "react-router-dom";

export const OfferComponents = ({ dataTransaction, dataUser }) => {
  const Host = process.env.REACT_APP_HOST;
  const Token = sessionStorage.getItem("acc_token");
  const navigate = useNavigate();

  const convertToRupiah = (value) => {
    const numb = value;
    const format = numb.toString().split("").reverse().join("");
    const convert = format.match(/\d{1,3}/g);
    const rupiah = "Rp " + convert.join(".").split("").reverse().join("");

    return rupiah;
  };

  const convertTime = (value) => {
    const time = value.slice(0, 10);
    return time;
  };

  const handleStatus = (value) => {
    if (value === "diterima") {
      return "Penawaran Diterima";
    } else if (value === "ditawar") {
      return "Ditawar";
    } else if (value === "ditolak") {
      return "Ditolak";
    }
  };

  const accOffers = () => {
    var config = {
      method: "put",
      url: `${Host}transaction/${dataTransaction.idTransaksi}/diterima`,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    axios(config)
      .then(function (response) {
        alert("tawaran diterima");
      })
      .catch(function (error) {
        console.log(error);
        navigate(`/`);
      });
  };

  const rejectOffers = () => {
    var config = {
      method: "put",
      url: `${Host}transaction/${dataTransaction.idTransaksi}/ditolak`,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    axios(config)
      .then(function (response) {
        alert("tawaran ditolak");
      })
      .catch(function (error) {
        console.log(error);
        navigate(`/`);
      });
  };

  return (
    <div className="offer-main">
      <CardSellerInfo
        avatar={
          dataUser.roles[0].rolesId === 2
            ? dataTransaction.imgbuyer
            : dataTransaction.imgseller
        }
        seller_name={
          dataUser.roles[0].rolesId === 2
            ? dataTransaction.buyerName
            : dataTransaction.sellerName
        }
      />
      {console.log(dataTransaction)}
      <div className="offer-content mt-3">
        <div className="row">
          <div className="col col-lg-1 col-sm-1 col-2">
            <img
              className="offer-content-image"
              src={`data:image/jpeg;base64,${dataTransaction.imgproduk}`}
              alt="product"
            />
          </div>
          <div className="offer-product col col-lg-11 col-sm-11 col-10">
            <div className="d-flex justify-content-between">
              <p className="offer-status">
                {handleStatus(dataTransaction.status)}
              </p>
              <p className="offer-time">
                {convertTime(dataTransaction.updated)}
              </p>
            </div>
            <div className="offer-product-detail">
              <p className="offer-product-name">
                {dataTransaction.productName}
              </p>
              <p className="offer-original-price">
                {`harga ${convertToRupiah(dataTransaction.price)}`}
              </p>
              <p className="offer-price" style={{ fontWeight: "bolder" }}>
                {`ditawar ${convertToRupiah(dataTransaction.tawar)}`}
              </p>
              {dataTransaction.status === "diterima" &&
              dataUser.roles[0].rolesId !== 2 ? (
                <p className="offer-succes">
                  anda akan segera dihubungi oleh penjual
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="offer-button-group d-flex justify-content-end">
          {dataTransaction.status === "ditawar" && dataUser.roles[0].rolesId === 2? (
            <>
              <button
                className="offer-button offer-decline not-filled"
                onClick={() => {
                  rejectOffers();
                }}
              >
                Tolak
              </button>
              <button
                className="offer-button offer-accept filled"
                onClick={() => {
                  accOffers();
                }}
              >
                Terima
              </button>
            </>
          ) : null}
          {dataTransaction.status === "diterima" &&
          dataUser.roles[0].rolesId === 2 ? (
            <>
              <button className="offer-button offer-accept filled">
                Hubungi Pembeli
              </button>
            </>
          ) : null}
        </div>
        <hr />
      </div>
    </div>
  );
};
