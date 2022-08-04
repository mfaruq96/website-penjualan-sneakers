import React from "react";
import "./Modal.css";

export const ModalDelete = ({ closed }) => {
  return (
    <div className="base-modal d-flex justify-content-center align-items-center">
      <div className="modal-body d-flex justify-content-center">
        <div className="row d-flex justify-content-center">
          <div className="modal-text col-12 d-flex justify-content-center align-items-center">
            <p>Yakin ingin menghapus produk ?</p>
          </div>
          <div className="group-modal-button d-flex align-items-end  justify-content-around">
            <button
              className="modal-button col-6"
              style={{ backgroundColor: "green" }}
            >
              Ya
            </button>
            <button
              className="modal-button col-6"
              style={{ backgroundColor: "red" }}
              onClick={closed}  
            >
              Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
