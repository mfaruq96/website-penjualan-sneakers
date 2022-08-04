import React from "react";
import "./Modal.css";
import { ReactComponent as IconClose } from "../../Img/close-fill.svg";
import { useNavigate } from "react-router-dom";

export const ModalWarning = ({ closed }) => {
  const navigate = useNavigate();
  return (
    <div className="base-modal d-flex justify-content-center align-items-center">
      <div className="modal-body d-flex justify-content-center">
        <div className="row d-flex justify-content-center flex-grow-1">
          <div className="modal-close col-12 d-flex justify-content-end">
            <IconClose onClick={closed} className="icon-close" />
          </div>
          <div className="modal-text col-12 d-flex justify-content-center align-items-center">
            <p style={{ color: "red" }}>Profil Anda Belum Lengkap</p>
          </div>
          <div className="group-modal-button d-flex align-items-end  justify-content-around">
            <button
              className="modal-button offers-button col-12"
              onClick={() => {
                navigate(`/profil/detail`);
              }}
            >
              Lengkapi Profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
