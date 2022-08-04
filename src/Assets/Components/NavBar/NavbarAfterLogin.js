import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../NavBar/NavbarAfterLogin.css";
import { useMediaQuery } from "react-responsive";
import list from "../../Img/list.svg";
import alarm from "../../Img/alarm.svg";
import user from "../../Img/user.svg";
import { useNavigate } from "react-router-dom";
import { NotifHome } from "../Notif/NotifHome";
import { LoadingAuth } from "../Loading/LoadingAuth";

export const NavbarAfterLogin = ({ dataTransaksi, dataUser }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 426px)" });
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("acc_token");
    sessionStorage.removeItem("status");
    window.location.reload(false);
  };

  const showNotif = (role) => {
    if (role === 2) {
      return dataTransaksi
        .filter((value) => value.status === "ditawar")
        .map((value, index) => {
          return (
            <li key={index}>
              <NotifHome
                productName={value.productName}
                photoProduct={value.imgproduk}
                price={value.price}
                offersPrice={value.tawar}
                status={value.status}
                role={2}
              />
            </li>
          );
        })
        .reverse();
    } else {
      return dataTransaksi
        .filter(
          (value) => value.status === "diterima" || value.status === "ditolak"
        )
        .map((value, index) => {
          return (
            <li key={index}>
              <NotifHome
                productName={value.productName}
                photoProduct={value.imgproduk}
                price={value.price}
                offersPrice={value.tawar}
                status={value.status}
              />
            </li>
          );
        })
        .reverse();
    }
  };
  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <div
            className={
              isMobile ? "null" : "container-sm d-flex justify-content-between"
            }
          >
            <div
              className="d-flex justify-content-between"
              style={isMobile ? { width: "400px" } : null}
            >
              <Navbar.Brand
                href="#home"
                className="logo-after"
                onClick={() => {
                  navigate(`/`);
                }}
              >
                Sneakers
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>

            <div className="d-flex align-items-center">
              <Navbar.Collapse id="basic-navbar-nav ">
                <Nav
                  className="me-auto d-flex justify-content-between align-items-lg-center"
                  style={isMobile ? null : { width: "100px" }}
                >
                  {dataUser.roles?.[0]?.rolesId === 2 ? (
                    <div className="imageButton">
                      {isMobile ? (
                        <p
                          onClick={() => {
                            navigate(`/dashboard-seller`);
                          }}
                        >
                          DaftarJual
                        </p>
                      ) : (
                        <img
                          src={list}
                          width={20}
                          alt=""
                          onClick={() => {
                            navigate(`/dashboard-seller`);
                          }}
                        />
                      )}
                    </div>
                  ) : null}

                  <div className="imageButton">
                    {isMobile ? (
                      <>
                        {dataTransaksi.length === 0 ? null : (
                          <p
                            onClick={() => {
                              navigate(`/info-penawaran`);
                            }}
                          >
                            Info Penawaran
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="dropdown remove-icon">
                          <p
                            className="dropdown-toggle"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img src={alarm} width={20} alt="" />
                          </p>
                          <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            {dataTransaksi.length <= 0 ? (
                              <div className="d-flex justify-content-center">
                                Tidak ada notifikasi
                              </div>
                            ) : (
                              <>
                                {dataUser.roles?.[0]?.rolesId === 2
                                  ? showNotif(2)
                                  : showNotif(1)}
                                <li
                                  className="d-flex justify-content-center"
                                  style={{
                                    cursor: "pointer",
                                    fontWeight: "bolder",
                                  }}
                                  onClick={() => {
                                    navigate(`/info-penawaran`);
                                  }}
                                >
                                  Info Penawaran
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="imageButton">
                    {isMobile ? (
                      <>
                        <p
                          onClick={() => {
                            navigate(`/profil/detail`);
                          }}
                        >
                          Profile
                        </p>
                        <p
                          onClick={() => {
                            logout();
                          }}
                        >
                          Logout
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="dropdown remove-icon">
                          <p
                            className="dropdown-toggle"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img src={user} width={20} alt="" />
                          </p>
                          <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <p
                                className="dropdown-item"
                                onClick={() => {
                                  navigate(`/profil/detail`);
                                }}
                              >
                                Profil
                              </p>
                            </li>
                            <li>
                              <p
                                className="dropdown-item"
                                onClick={() => {
                                  logout();
                                }}
                              >
                                Logout
                              </p>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </Nav>
              </Navbar.Collapse>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};
