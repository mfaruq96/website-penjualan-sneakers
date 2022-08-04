import React, { useState } from "react";
import { ModalOffers } from "../../Modal/ModalOffers";
import { ModalWarning } from "../../Modal/ModalWarning";
import "./CardDetailProduct.css";
import { useNavigate, useParams } from "react-router-dom";

export const CardDetailProduct = ({
  product,
  productImg,
  category,
  price,
  role,
  isOwner,
  dataBuyyer,
  productStatus,
}) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const status = sessionStorage.getItem("status");
  const [ShowModal, setShowModal] = useState(false);
  const [ShowWarning, setShowWarning] = useState(false);

  const handleModal = () => {
    setShowModal(!ShowModal);
  };

  const handleWarning = () => {
    setShowWarning(!ShowWarning);
  };

  const convertToRupiah = () => {
    const numb = price;
    const format = numb.toString().split("").reverse().join("");
    const convert = format.match(/\d{1,3}/g);
    const rupiah = "Rp " + convert.join(".").split("").reverse().join("");

    return rupiah;
  };

  const convertCategory = () => {
    const kategori = category;
    if (kategori === 1) {
      const textCategory = "Nike";
      return textCategory;
    } else if (kategori === 2) {
      const textCategory = "Adidas";
      return textCategory;
    } else if (kategori === 3) {
      const textCategory = "Puma";
      return textCategory;
    } else if (kategori === 4) {
      const textCategory = "Vans";
      return textCategory;
    } else if (kategori === 5) {
      const textCategory = "Jordan";
      return textCategory;
    }
  };

  const checkDataBuyyer = () => {
    if (
      dataBuyyer.alamat === null &&
      dataBuyyer.provinsi === null &&
      dataBuyyer.kota === null &&
      dataBuyyer.img === null
    ) {
      setShowWarning(true);
    } else {
      setShowModal(!ShowModal);
    }
  };

  return (
    <div className="card-detail-main">
      <div className="card-detail-content">
        <h5 className="card-detail-product-name">{product}</h5>
        <p className="card-detail-product-category">{convertCategory()}</p>
        <p>{convertToRupiah()}</p>
        {status === "in" ? (
          <div className="card-detail-group-button">
            {role === 1 ? (
              <div className="row">
                <div className="col-12">
                  <button
                    className="card-detail-button filled"
                    onClick={() => {
                      checkDataBuyyer();
                    }}
                  >
                    Saya tertarik dan ingin nego
                  </button>
                </div>
              </div>
            ) : (
              <>
                {isOwner ? (
                  <div className="row">
                    <div className="col-12">
                      {productStatus === "terjual" ? (
                        <div className="d-flex justify-content-center"> 
                          <h5 style={{fontWeight:"bolder"}}>Produk Telah Terjual</h5>
                        </div>
                      ) : (
                        <button
                          className="card-detail-button not-filled"
                          onClick={() => {
                            navigate(`/edit-product/edit/${productId}`);
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        ) : null}
      </div>
      {ShowWarning ? (
        <ModalWarning
          closed={() => {
            handleWarning();
          }}
        />
      ) : null}
      {ShowModal ? (
        <ModalOffers
          productImg={productImg}
          productName={product}
          productPrice={price}
          closed={() => {
            handleModal();
          }}
        />
      ) : null}
    </div>
  );
};
