import React, { useEffect, useState } from "react";
import "./Modal.css";
import { ReactComponent as IconClose } from "../../Img/close-fill.svg";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ModalOffers = ({
  closed,
  productImg,
  productName,
  productPrice,
}) => {
  const [OfferPrice, setOfferPrice] = useState(null);
  const [isEmpty, setisEmpty] = useState(true);
  const [isSubmit, setisSubmit] = useState(false);
  const Host = process.env.REACT_APP_HOST;
  const Token = sessionStorage.getItem("acc_token");
  const { productId } = useParams();

  const convertToRupiah = () => {
    const numb = productPrice;
    const format = numb.toString().split("").reverse().join("");
    const convert = format.match(/\d{1,3}/g);
    const rupiah = "Rp " + convert.join(".").split("").reverse().join("");
    return rupiah;
  };

  useEffect(() => {
    handleButtonOffer();
  }, [OfferPrice]);

  const handleButtonOffer = () => {
    if (OfferPrice === null || OfferPrice === "" || OfferPrice <= 1) {
      setisEmpty(true);
    } else {
      setisEmpty(false);
    }
  };

  const handleSubmitOffer = () => {
    let data = JSON.stringify({
      tawar: OfferPrice,
    });

    let config = {
      method: "put",
      url: `${Host}transaction/new/${productId}`,
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        alert("Tawaran Anda Berhasil Terkirim Ke Penjual");
        setisSubmit(true);
      })
      .catch(function (error) {
        console.log(error);
        alert("Tawaran Anda Gagal");
        window.location.reload(false);
      });
  };

  return (
    <div className="base-modal d-flex justify-content-center align-items-center">
      <div className="modal-body d-flex justify-content-center">
        <div className="row d-flex justify-content-center flex-grow-1">
          <div className="modal-close col-12 d-flex justify-content-end">
            <IconClose onClick={closed} className="icon-close" />
          </div>
          {isSubmit ? (
            <div className="modal-text col-12 d-flex justify-content-center align-items-center">
              <p style={{color:"green"}}>tawaran anda terkirim</p>
            </div>
          ) : (
            <>
              <div className="modal-text col-12 d-flex align-items-center">
                <p>Masukan Tawaranmu</p>
              </div>
              <div className="modal-product-offers col-12 d-flex align-items-center mb-4">
                {/* {tambahin item yang di tawar} */}
                <img
                  src={`data:image/jpeg;base64,${productImg}`}
                  alt="product"
                />
                {/* <img src={item} alt="product" /> */}
                <div className="row ms-3">
                  <div className="col-12 modal-product-name-offers">
                    {productName}
                  </div>
                  <div className="col-12 modal-product-price-offers">
                    {convertToRupiah()}
                  </div>
                </div>
              </div>
              <div className="modal-input col-12 mb-4">
                <label>Harga Tawar</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setOfferPrice(e.target.value);
                  }}
                />
              </div>
              <div className="modal-note col-12 d-flex align-items-center mb-4">
                <p>
                  Harga tawaranmu akan diketahui penjual, jika penjual cocok
                  kamu akan segera dihubungi penjual.
                </p>
              </div>
              {isEmpty ? null : (
                <div className="group-modal-button d-flex align-items-end  justify-content-around">
                  <button
                    className="modal-button offers-button col-12"
                    onClick={() => {
                      handleSubmitOffer();
                    }}
                  >
                    Kirim
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
