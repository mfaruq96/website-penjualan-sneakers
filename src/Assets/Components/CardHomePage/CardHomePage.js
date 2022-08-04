import React from "react";
import { Card } from "react-bootstrap";
import "../CardHomePage/CardHomePage.css";
import { useNavigate } from "react-router-dom";

export const CardHomePage = ({
  idProduk,
  gambarProduk,
  namaProduk,
  kategori,
  harga,
}) => {
  const navigate = useNavigate();
  const convertToRupiah = () => {
    const numb = harga;
    const format = numb.toString().split("").reverse().join("");
    const convert = format.match(/\d{1,3}/g);
    const rupiah = "Rp " + convert.join(".").split("").reverse().join("");

    return rupiah;
  };

  const convertCategory = () => {
    const category = kategori;
    if (category === 1) {
      const textCategory = "Nike";
      return textCategory;
    } else if (category === 2) {
      const textCategory = "Adidas";
      return textCategory;
    } else if (category === 3) {
      const textCategory = "Puma";
      return textCategory;
    } else if (category === 4) {
      const textCategory = "Vans";
      return textCategory;
    } else if (category === 5) {
      const textCategory = "Jordan";
      return textCategory;
    }
  };

  const handleCard = () => {
    navigate(`/detail-product/${idProduk}`);
  };

  return (
    <div className="utama">
      <Card className="cardUtama" onClick={()=>{handleCard()}}>
        <img
          className="photo-produk"
          src={`data:image/jpeg;base64,${gambarProduk}`}
          alt="produk"
        />
        <Card.Body>
          <h6 className="nama-produk">{namaProduk}</h6>
          <Card.Text className="textCategory">{convertCategory()}</Card.Text>
          <Card.Text className="textPrice mb-1">{convertToRupiah()}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
