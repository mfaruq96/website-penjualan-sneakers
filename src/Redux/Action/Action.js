import axios from "axios";
import {
  FETCH_DATA_PRODUK,
  FETCH_USER_DETAIL,
  FETCH_DETAIL_PRODUK,
  FETCH_TRANSACTION_SELLER,
  FETCH_TRANSACTION_BUYER,
} from "./Types";

const Host = process.env.REACT_APP_HOST;

function fetchDataUser(token) {
  let config = {
    method: "get",
    url: `${Host}profile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return async (dispatch) => {
    await axios(config)
      .then(function (response) {
        dispatch({
          type: FETCH_USER_DETAIL,
          userData: response,
        });
      })
      .catch(function (error) {
        alert("Sesi anda telah berakhir mohon login kembali");
        sessionStorage.clear();
        window.location.replace(`/auth/login`);
      });
  };
}

function fetchDataProduct() {
  let config = {
    method: "get",
    url: `${Host}product/display-all`,
    headers: {},
  };

  return async (dispatch) => {
    await axios(config)
      .then(function (response) {
        dispatch({
          type: FETCH_DATA_PRODUK,
          dataProduk: response,
        });
      })
      .catch(function (error) {
        console.log(error);
        alert("fetch produk gagal");
      });
  };
}

function fetchDetailProduct(id) {
  var config = {
    method: "get",
    url: `${Host}product/display/${id}`,
    headers: {},
  };

  return async (dispatch) => {
    await axios(config)
      .then(function (response) {
        dispatch({
          type: FETCH_DETAIL_PRODUK,
          detailProduk: response,
        });
      })
      .catch(function (error) {
        alert("Sesi anda telah berakhir mohon login kembali");
        window.location.replace(`/auth/login`);
      });
  };
}

function fetchTransactionSeller(id, token) {
  const config = {
    method: "get",
    url: `${Host}transaction/display/seller/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },

  };


  return async (dispatch) => {
    await axios(config)
      .then(function (response) {
        dispatch({

          type: FETCH_TRANSACTION_SELLER,
          transaksiSeller: response,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

function fetchTransactionBuyer(id, token) {
  var config = {
    method: "get",
    url: `${Host}transaction/display/buyer/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    axios(config)
      .then(function (response) {
        dispatch({

          type: FETCH_TRANSACTION_BUYER,
          transaksiBuyer: response,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export {
  fetchDataUser,
  fetchDataProduct,
  fetchDetailProduct,
  fetchTransactionSeller,
  fetchTransactionBuyer,
};
