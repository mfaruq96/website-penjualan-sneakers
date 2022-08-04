import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";

const EditProduk = (props) => {
  const { productId } = useParams();
  const accToken = sessionStorage.getItem("acc_token");
  const navigate = useNavigate();
  const idUser = props.userDetail.userId;
  const Host = process.env.REACT_APP_HOST;
  const [editProduk, setEditProduk] = useState({
    namaProduk: null,
    hargaProduk: null,
    kategori: null,
    deskripsi: null,
    fotoProduk: null,
    isFailed: false,
    isDisabled: false,
  });

  const handleState = (e, prop) => {
    if (prop === "fotoProduk") {
      if (e.target.files[0].size <= 1048576) {
        setEditProduk({
          ...editProduk,
          [prop]: e.target.files[0],
          isFailed: true,
        });
      } else {
        alert("Ukuran file terlalu besar");
        setEditProduk({
          ...editProduk,
          isFailed: true,
        });
      }
    } else {
      setEditProduk({
        ...editProduk,
        [prop]: e.target.value,
      });
    }
  };

  const handleSubmitProduk = async () => {
    if (
      (editProduk.fotoProduk &&
        editProduk.namaProduk &&
        editProduk.hargaProduk &&
        editProduk.deskripsi &&
        editProduk.kategori) === null
    ) {
      alert("Gagal, Harap isi semua data");
    } else {
      submitEditProduk();
    }
  };

  const submitEditProduk = () => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('category', editProduk.kategori);
    data.append('productName', editProduk.namaProduk);
    data.append('price', editProduk.hargaProduk);
    data.append('description', editProduk.deskripsi);
    data.append('img', editProduk.fotoProduk);
    data.append('status', "tersedia");
    
    var config = {
      method: 'put',
      url: `${Host}product/update/${productId}`,
      headers: { 
        'Authorization': `Bearer ${accToken}`, 
        ...Headers,
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      alert("Data produk berhasil di update")
    })
    .catch(function (error) {
      console.log(error);
      alert("Data produk gagal di update")
    });
    
  }

  return (
    <>
    {console.log(editProduk)}
      <div className="container add-produk-main">
        {console.log(idUser)}
        <Form.Group className="mb-4">
          <Form.Label>Nama Produk</Form.Label>
          <Form.Control
            type="text"
            id="nama_produk"
            name="nama_produk"
            placeholder="Nama Produk"
            onChange={(e) => {
              handleState(e, "namaProduk");
            }}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Harga Produk</Form.Label>
          <Form.Control
            type="number"
            id="harga_produk"
            name="harga_produk"
            placeholder="Rp 0,00"
            onChange={(e) => {
              handleState(e, "hargaProduk");
            }}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Kategori</Form.Label>
          <Form.Select
            onChange={(e) => {
              handleState(e, "kategori");
            }}
          >
            <option>Kategori</option>
            <option value="1">Nike</option>
            <option value="2">Adidas</option>
            <option value="3">Puma</option>
            <option value="4">Vans</option>
            <option value="5">Jordan</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            type="text"
            id="deskripsi"
            name="deskripsi"
            placeholder="Deskripsi"
            onChange={(e) => {
              handleState(e, "deskripsi");
            }}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <label className="constum-input-image-produk">
            <input
              type="file"
              name="foto_produk"
              accept="image/*"
              onChange={(e) => {
                handleState(e, "fotoProduk");
              }}
            />
            <span id="foto-input-produk">
              {editProduk.fotoProduk !== null
                ? "Ganti Gambar"
                : "Tambah Gambar"}
            </span>
          </label>
          <p className="input-produk-note">Ukuran gambar maksimal 1MB</p>
        </Form.Group>

        {editProduk.fotoProduk !== null ? (
          <div className="d-flex justify-content-center mb-3">
            <img
              className="preview-product"
              src={URL.createObjectURL(editProduk.fotoProduk)}
              alt="preview-product"
            />
          </div>
        ) : null}

        <input
          type="submit"
          className="col-md-12 add-produk-button"
          value="Submit"
          disabled={editProduk.isDisabled}
          onClick={() => {
            handleSubmitProduk();
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetail: state.home.user_data,
  };
};

export default connect(mapStateToProps)(EditProduk);
