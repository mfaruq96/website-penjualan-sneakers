import React, { useEffect, useState } from "react";
import "../DafarJual/DaftarJual.css";
import profile from "../../Assets/Img/blank-image.jpg";
import box from "../../Assets/Img/box.png";
import love from "../../Assets/Img/hearth.png";
import dollar from "../../Assets/Img/dollar.png";
import { Alert, Button } from "react-bootstrap";
import { CardHomePage } from "../../Assets/Components/CardHomePage/CardHomePage";
import { NavbarAfterLogin } from "../../Assets/Components/NavBar/NavbarAfterLogin";
import { connect } from "react-redux";
import { fetchDataUser } from "../../Redux/Action/Action";
import { useNavigate } from "react-router-dom";
import { NavbarSecond } from "../../Assets/Components/NavBar/NavbarSecond";
import { ModalWarning } from "../../Assets/Components/Modal/ModalWarning";

const DaftarJual = (props) => {
  const Host = process.env.REACT_APP_HOST;
  const status = sessionStorage.getItem("status");
  const Token = sessionStorage.getItem("acc_token");
  const navigate = useNavigate();
  const [DataProduct, setDataProduct] = useState(null);
  const [ShowModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "in") {
      const Token = sessionStorage.getItem("acc_token");
      handleDashboard();
    }


    if (props.userDetail.length === 0) {
      navigate(`/`);
    }

    {
      console.log(props.userDetail, "ini props");
    }
  }, []);

  const handleDashboard = async () => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `${Host}product/seller/${props.userDetail.userId}`,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        setDataProduct(response.data);
      })
      .catch(function (error) {
        console.log(error);
        navigate(`/`)
      });
  };

  const showCard = () => {
    console.log(DataProduct, "dataproduk");
    return DataProduct?.map((value, key) => {
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
    <div className="daftar-jual">
            {ShowModal ? (
          <ModalWarning
            closed={() => {
              handleModal();
            }}
          />
        ) : null}
      {console.log(props.userDetail)}
      <NavbarSecond page={"Dashboard"} />
      <div className="daftar-value container-sm">
        <div className="title">
          <h1 className="h1-daftarJual">Daftar Jual Saya</h1>
        </div>
        {/* border utama */}
        <div className="border-utama">
          <div>
            <img
              className="image-profile"
              src={profile}
              width={60}
              height={60}
            />
          </div>
          <div className="profile-penjual">
            <p className="nama-penjual">{props.userDetail.username}</p>
            <p className="daerah">{props.userDetail.kota}</p>
            <p className="daerah">{props.userDetail.provinsi}</p>
          </div>
          <div className="cover-button-edit">
            <div className="button-edit col col-lg-2 col-sm-3 col-4">
              <Button
                className="buttonEdit"
                onClick={() => {
                  navigate(`/profil/detail`);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
        {/* border left and card*/}
        <div className="border-left-card-utama">
          <div className="border-left-card">
            <div className="border-left">
              <div>
                <p className="title-kategori">Kategori</p>
              </div>
              <div className="semua-produk">
                <img
                  className="img-semua-produk"
                  src={box}
                  width={20}
                  height={20}
                />
                <p className="text-border-left">Semua Produk</p>
              </div>
              <div className="diminati">
                <img
                  className="img-diminati"
                  src={love}
                  width={20}
                  height={20}
                />
                <p className="text-border-left">Diminati</p>
              </div>
              <div className="terjual">
                <img
                  className="img-terjual"
                  src={dollar}
                  width={20}
                  height={20}
                />
                <p className="text-border-left">Terjual</p>
              </div>
            </div>
            <div>
              <Button className="button-tambahProduk" variant="outline-primary" onClick={()=>{checkDataSeller()}}>
                Tambah Produk
              </Button>
            </div>
          </div>
          {/* {console.log(props.userDetail)}
          {console.log([props.userDetail.userId])} */}
          {/* {console.log({handleDashboard})} */}
          {/* {Show ? handleDashboard() : null} */}
          {/* {DataProduct !== null ? showCard():(null)} */}
          {showCard()}
          {console.log(DataProduct)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetail: state.home.user_data,
  };
};

export default connect(mapStateToProps)(DaftarJual);
