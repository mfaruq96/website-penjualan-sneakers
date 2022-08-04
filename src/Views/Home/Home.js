import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import "../../Assets/Components/FontawsomeIcons/Font";
import { FooterComponent } from "../../Assets/Components/Footer/FooterComponent";
import { HomeSlider } from "../../Assets/Components/HomeSlider/HomeSlider";
import { connect } from "react-redux";
import { CardHomePage } from "../../Assets/Components/CardHomePage/CardHomePage";
import { NavbarAfterLogin } from "../../Assets/Components/NavBar/NavbarAfterLogin";
import { NavbarBeforeLogin } from "../../Assets/Components/NavBar/NavbarBeforeLogin";
import {
  fetchDataUser,
  fetchDataProduct,
  fetchTransactionSeller,
  fetchTransactionBuyer,
} from "../../Redux/Action/Action";
import { ButtonSell } from "../../Assets/Components/Button/ButtonSell/ButtonSell";
import { LoadingAuth } from "../../Assets/Components/Loading/LoadingAuth";
import { ModalWarning } from "../../Assets/Components/Modal/ModalWarning";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const [ShowModal, setShowModal] = useState(false);
  const [homeState, sethomeState] = useState({
    category: "semua",
    isLogin: true,
  });

  const handleState = (e, prop) => {
    sethomeState({
      ...homeState,
      [prop]: e.target.value,
    });
  };

  // untuk tampil notif

  useEffect(() => {
    const Token = sessionStorage.getItem("acc_token");
    if (Token) {
      const timer = setTimeout(
        () =>
          handleNotif(
            props.userDetail.roles[0].rolesId,
            props.userDetail.userId,
            Token
          ),
        6000
      );
      return () => clearTimeout(timer);
    }
  }, [props.userDetail.userId]);

  //untuk tampil list produk

  useEffect(() => {
    props.getDataProduct();
  }, []);

  //untuk cek sudah login atau belum
  useEffect(() => {
    const Token = sessionStorage.getItem("acc_token");

    if (!Token) {
      sethomeState({
        ...homeState,
        isLogin: !homeState.isLogin,
      });
    } else {
      props.getUserDetail(Token);
    }
  }, []);

  //tampil notif tergantung role
  const handleNotif = (role, userid, token) => {
    if (role === 2) {
      props.getTransactionSeller(userid, token);
    } else {
      props.getTransactionBuyer(userid, token);
    }
  };

  const showProduk = (data, kategori) => {
    if (kategori === "semua") {
      return data
        .filter((value) => value.status === "tersedia")
        .map((value, key) => {
          return (
            <div className="col col-lg-2 col-sm-3 col-6" key={key}>
              <CardHomePage
                idProduk={value.idProduct}
                gambarProduk={value.img}
                namaProduk={value.productName}
                kategori={value.category}
                harga={value.price}
              />
            </div>
          );
        });
    } else {
      return data
        .filter((value) => value.category === parseInt(kategori))
        .filter((value) => value.status === "tersedia")
        .map((value, key) => {
          return (
            <div className="col col-lg-2 col-sm-3 col-6" key={key}>
              <CardHomePage
                idProduk={value.idProduct}
                gambarProduk={value.img}
                namaProduk={value.productName}
                kategori={value.category}
                harga={value.price}
              />
            </div>
          );
        });
    }
  };

  const handleModal = () => {
    setShowModal(!ShowModal);
  };

  const checkDataSeller = () => {
    if (
      props.userDetail.alamat === null &&
      props.userDetail.provinsi === null &&
      props.userDetail.kota === null &&
      props.userDetail.img === null
    ) {
      setShowModal(true);
    } else {
      navigate(`/add-product`);
    }
  };

  return (
    <>
      <div>
        {ShowModal ? (
          <ModalWarning
            closed={() => {
              handleModal();
            }}
          />
        ) : null}

        {homeState.isLogin ? (
          <NavbarAfterLogin
            dataTransaksi={props.dataTransaksi}
            dataUser={props.userDetail}
          />
        ) : (
          <NavbarBeforeLogin />
        )}
        <div className="container-sm">
          <div className="home-carousel ">
            <HomeSlider />
          </div>
          <div className="home-kategori">
            <h5>Telusuri kategori</h5>
            <div className="home-kategori-button-grup">
              <div className="row">
                <div className="col col-lg-2 col-sm-3 col-4">
                  <button
                    className="button-kategori"
                    type="button"
                    value="semua"
                    onClick={(e) => {
                      handleState(e, "category");
                    }}
                  >
                    Semua
                  </button>
                </div>
                <div className="col col-lg-2 col-sm-3 col-4">
                  <button
                    className="button-kategori"
                    type="button"
                    value={1}
                    onClick={(e) => {
                      handleState(e, "category");
                    }}
                  >
                    Nike
                  </button>
                </div>
                <div className="col col-lg-2 col-sm-3 col-4">
                  <button
                    className="button-kategori"
                    type="button"
                    value={4}
                    onClick={(e) => {
                      handleState(e, "category");
                    }}
                  >
                    Vans
                  </button>
                </div>
                <div className="col col-lg-2 col-sm-3 col-4">
                  <button
                    className="button-kategori"
                    type="button"
                    value={3}
                    onClick={(e) => {
                      handleState(e, "category");
                    }}
                  >
                    Puma
                  </button>
                </div>
                <div className="col col-lg-2 col-sm-3 col-4">
                  <button
                    className="button-kategori"
                    type="button"
                    value={5}
                    onClick={(e) => {
                      handleState(e, "category");
                    }}
                  >
                    Jordan
                  </button>
                </div>
                <div className="col col-lg-2 col-sm-3 col-4">
                  <button
                    className="button-kategori"
                    type="button"
                    value={2}
                    onClick={(e) => {
                      handleState(e, "category");
                    }}
                  >
                    Adidas
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="home-card-grup">
            <div className="row">
              {props.dataProduct.length === 0 ? (
                <div className="d-flex justify-content-center my-5">
                  <LoadingAuth />
                </div>
              ) : (
                showProduk(props.dataProduct, homeState.category)
              )}
            </div>
          </div>
        </div>

        <FooterComponent />
      </div>
      {props.userDetail.roles?.[0]?.rolesId === 2 ? (
        <ButtonSell
          fungsi={() => {
            checkDataSeller();
          }}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetail: state.home.user_data,
    dataProduct: state.home.data_produk,

    dataTransaksi: state.home.data_transaksi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetail: (token) => dispatch(fetchDataUser(token)),
    getDataProduct: () => dispatch(fetchDataProduct()),
    getTransactionSeller: (id, token) =>
      dispatch(fetchTransactionSeller(id, token)),
    getTransactionBuyer: (id, token) =>
      dispatch(fetchTransactionBuyer(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
