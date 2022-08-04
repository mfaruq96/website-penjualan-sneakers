import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../Views/Product/AddProduk/AddProduct";
import { Auth } from "../Views/Auth/Auth";
import { Login } from "../Views/Auth/Login";
import { Register } from "../Views/Auth/Register";
import { HomeSlider } from "../Assets/Components/HomeSlider/HomeSlider";
import { Dummy } from "../Views/Dummy";
import DetailProduct from "../Views/Product/Detail-Product/DetailProduct";
import InfoPenawaran from "../Views/InfoPenawaran/InfoPenawaran";
import Home from "../Views/Home/Home";
import Profil from "../Views/User/Profil";
import EditProfil from "../Views/User/EditProfil";
import DetailProfil from "../Views/User/DetailProfil";

import EditProduk from "../Views/Product/EdfitProduk/EditProduk";
import EditIndex from "../Views/Product/EdfitProduk/EditIndex";

import DaftarJual from "../Views/DafarJual/DaftarJual";


export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cobahomeslider" element={<HomeSlider />} />


      {/* Auth */}
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/profil" element={<Profil />}>
        <Route path="detail" element={<DetailProfil />} />
        <Route path="edit" element={<EditProfil />} />
      </Route>

      {/* Product */}
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/dummy" element={<Dummy />} />

      <Route path="/detail-product/:productId" element={<DetailProduct />} />
      <Route path="/Dashboard" element={<DaftarJual/>}/>


      <Route path="/edit-product" element={<EditIndex/>}>
        <Route path="edit/:productId" element={<EditProduk/>}/>
      </Route>

      <Route path="/info-penawaran" element={<InfoPenawaran />} />

      <Route path="/dashboard-seller" element={<DaftarJual />} />
    </Routes>
  );
};
