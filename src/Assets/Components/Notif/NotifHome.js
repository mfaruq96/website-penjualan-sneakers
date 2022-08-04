import React from "react";
import "./NotifHome.css";

export const NotifHome = ({
  photoProduct,
  productName,
  price,
  offersPrice,
  status,
  role,
}) => {

  const convertToRupiah = (value) => {
    const numb = value;
    const format = numb.toString().split("").reverse().join("");
    const convert = format.match(/\d{1,3}/g);
    const rupiah = "Rp " + convert.join(".").split("").reverse().join("");

    return rupiah;
  };
  return (
    <>
      <div className="row notif-home-main">
        <div className="col-3 d-flex justify-content-center align-items-center">
          <img src={`data:image/jpeg;base64,${photoProduct}`} alt="product" />
        </div>
        <div className="col-9">
          <p>{productName}</p>
          {role === 2 ? (
            <>
              <p>{convertToRupiah(price)}</p>
              <p style={{fontWeight:"bolder"}}>{`Ditawar ${convertToRupiah(offersPrice)}`}</p>
            </>
          ) : (
            <>
              {status === "diterima" ? (
                <>
                  <p style={{fontWeight:"bolder"}}>{`Tawaran Diterima ${convertToRupiah(offersPrice)}`}</p>
                  <p style={{fontSize:"9px"}}>anda akan segera dihubungi penjual</p>
                </>
              ) : (
                <>
                  <p style={{fontWeight:"bolder"}}>{`Tawaran ${convertToRupiah(offersPrice)} Ditolak`}</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};
