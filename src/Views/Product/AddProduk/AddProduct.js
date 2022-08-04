import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingAuth } from "../../../Assets/Components/Loading/LoadingAuth";
import { NavbarSecond } from "../../../Assets/Components/NavBar/NavbarSecond";
import "./AddProduct.css";

const AddProduct = (props) => {
  const accToken = sessionStorage.getItem("acc_token");
  const navigate = useNavigate();
  const idUser = props.userDetail.userId;
  const Host = process.env.REACT_APP_HOST;
  const [isLoading, setisLoading] = useState(false);
  const [inputProduk, setInputProduk] = useState({
    namaProduk: null,
    hargaProduk: null,
    kategori: null,
    deskripsi: null,
    fotoProduk: null,
    isFailed: false,
    isDisabled: false,
  });

  useEffect(() => {
    if (idUser === undefined) {
      navigate(`/`);
    }
  }, []);

  const handleState = (e, prop) => {
    if (prop === "fotoProduk") {
      if (e.target.files[0].size <= 1048576) {
        setInputProduk({
          ...inputProduk,
          [prop]: e.target.files[0],
          isFailed: true,
        });
      } else {
        alert("Ukuran file terlalu besar");
        setInputProduk({
          ...inputProduk,
          isFailed: true,
        });
      }
    } else {
      setInputProduk({
        ...inputProduk,
        [prop]: e.target.value,
      });
    }
  };

  const handleSubmitProduk = () => {
    if (
      (inputProduk.fotoProduk &&
        inputProduk.namaProduk &&
        inputProduk.hargaProduk &&
        inputProduk.deskripsi &&
        inputProduk.kategori) === null
    ) {
      alert("Gagal, Harap isi semua data");
    } else {
      InputProduk();
    }
  };

  //   useEffect(() => {
  //     disableSubmitProduk();
  //   });

  const InputProduk = async () => {
    setisLoading(true);
    let axios = require("axios");
    let FormData = require("form-data");

    let data = new FormData();
    data.append("category", inputProduk.kategori);
    data.append("productName", inputProduk.namaProduk);
    data.append("price", inputProduk.hargaProduk);
    data.append("description", inputProduk.deskripsi);
    data.append("img", inputProduk.fotoProduk);
    data.append("status", "tersedia");

    let config = {
      method: "post",
      url: `${Host}product/${idUser}/submit`,
      headers: {
        Authorization: `Bearer ${accToken}`,
        ...Headers,
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        setisLoading(false);
        alert("input produk berhasil");
        navigate(`/`);
      })
      .catch(function (error) {
        console.log(error);
        setisLoading(false);
        alert("gagal");
      });
  };

  return (
    <div>
      <NavbarSecond page={"Input Produk"} />
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
              {inputProduk.fotoProduk !== null
                ? "Ganti Gambar"
                : "Tambah Gambar"}
            </span>
          </label>
          <p className="input-produk-note">Ukuran gambar maksimal 1MB</p>
        </Form.Group>

        {inputProduk.fotoProduk !== null ? (
          <div className="d-flex justify-content-center mb-3">
            <img
              className="preview-product"
              src={URL.createObjectURL(inputProduk.fotoProduk)}
              alt="preview-product"
            />
          </div>
        ) : null}

        {isLoading ? (
          <div className="d-flex justify-content-center">
            <LoadingAuth />
          </div>
        ) : (
          <input
            type="submit"
            className="col-md-12 add-produk-button"
            value="Submit"
            disabled={inputProduk.isDisabled}
            onClick={() => {
              handleSubmitProduk();
            }}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetail: state.home.user_data,
  };
};

export default connect(mapStateToProps)(AddProduct);
