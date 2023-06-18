import { Button, Navbar } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import ModalLogin from "../Modal/Login";
import ModalRegister from "../Modal/Register";
import { Link } from "react-router-dom";
import icon from "../../assets/image/icon.png";
import DropdownAdmin from "../Dropdown/DropdownAdmin";
import DropdownUser from "../Dropdown/DropdownUser";
import boy from "../../assets/image/boy.png";
import "./index.css";
import { UserContext } from "../../context/useContext";
// import DropdownAdmin from "../Dropdown/DropdownAdmin";

function Navigation() {
  // modal register
  const [showReg, setShowReg] = useState(false);

  const handleCloseReg = () => setShowReg(false);
  const handleShowReg = () => setShowReg(true);
  // modal login
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, disptch] = useContext(UserContext)
  
  console.log(state)

  var user = state.role;
  var login = state.isLogin;

  const [data, setData] = useState()

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem('data'))
    if(dataUser) {
      setData(dataUser)
    }
  }, [])


  return (
    <>
      <Navbar className="navbar-navbar-container">
        <div className="d-flex w-100 shadow p-0 mb-5 bg-white rounded navbar-container ">
          <div className="container d-flex w-100 justify-content-between ">
            <Link to="/">
              <img src={icon} alt="Logo" style={{ height: "40px", marginTop:"30px" }} />
            </Link>
            <div>
              {login && user === "admin" ? (
                <div className="d-flex">
                  {/* <p className="nama-navbar">Admin</p> */}
                  <DropdownAdmin />
                </div>
              ) : login && user !== "admin" ? (
                <div className="d-flex">
                  {/* <p className="nama-navbar">usser</p> */}
                  <DropdownUser />
                </div>
              ) : (
                <div>
                  <Button
                    style={{marginTop:"20px"}}
                    variant="primary"
                    className="login-daftar"
                    onClick={handleShowReg}
                  >
                    Daftar
                  </Button>

                  <Button
                    style={{marginTop:"20px"}}
                    variant="primary"
                    className="login-button"
                    onClick={handleShow}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Navbar>

      <ModalRegister
        handleCloseReg={handleCloseReg}
        handleShowReg={handleShowReg}
        show={showReg}
      />
      <ModalLogin
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
    </>
  );
}

export default Navigation;
