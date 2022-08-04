import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingAuth } from "../../Assets/Components/Loading/LoadingAuth";
import "./Auth.css";

export const Login = () => {
  const navigate = useNavigate();

  //link enpoint(API)
  const Host = process.env.REACT_APP_HOST;

  //state untuk disable button
  const [DisableButton, setDisableButton] = useState(true);

  //state di gunakan untuk merubah type inputan password
  const [PasswordShow, setPasswordShow] = useState(false);

  //state untuk menampilkan loading
  const [isLoading, setisLoading] = useState(false);

  //state untuk menampilkan eror ketika respon api eror
  const [isEror, setisEror] = useState(false);

  //state untuk menampung email,paswd,role
  const [LoginState, setLoginState] = useState({
    email: null,
    password: null,
  });

  //function untuk cek apakah semua inputan sudah terisi
  const disableSubmit = () => {
    if (LoginState.email !== null && LoginState.password !== null) {
      setDisableButton(false);
    }
  };

  //untuk cek apakah sudah terisi semua (menjalankan functio disableSubmit tiap rerender)
  useEffect(() => {
    disableSubmit();
  });

  //fungsig untuk memasukan data dari inputan ke dalam state
  const handleState = (e, prop) => {
    setLoginState({
      ...LoginState,
      [prop]: e.target.value,
    });
  };

  //fungsi untuk hit api login
  const userLogin = async () => {
    setisLoading(true);
    var data = JSON.stringify({
      email: LoginState.email,
      password: LoginState.password,
    });

    var config = {
      method: "post",
      url: `${Host}login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        setisLoading(false);
        sessionStorage.setItem("acc_token", response.data.access_token);
        sessionStorage.setItem("status", "in")
        navigate(`/`)
      })
      .catch(function (error) {
        setisEror(true);
        setisLoading(false);
      });
  };

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <LoadingAuth />
        </div>
      ) : (
        <div>
          <h3>Masuk</h3>
          {isEror ? (
            <p className="eror-auth">
              Login gagal : cek email atau password anda
            </p>
          ) : null}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email-login"
              onChange={(e) => {
                handleState(e, "email");
              }}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Password</label>
            <input
              type={PasswordShow ? "text" : "password"}
              className="form-control"
              id="password-login"
              onChange={(e) => {
                handleState(e, "password");
              }}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              onChange={() => {
                setPasswordShow(!PasswordShow);
              }}
            />
            <label className="form-check-label">Tampilkan Password</label>
          </div>

          <button
            type="submit"
            className="button-auth mb-4"
            disabled={DisableButton}
            onClick={() => {
              userLogin();
            }}
          >
            Masuk
          </button>

          <div className="d-flex justify-content-center to-register">
            Pengguna Baru?
            <p
              onClick={() => {
                navigate(`/auth/register`);
              }}
            >
              Daftar
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
