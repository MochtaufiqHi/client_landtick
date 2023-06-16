import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/useContext";
import boy from "../../assets/image/boy.png"
import logout from "../../assets/image/logot.png"
import train from "../../assets/image/tiket.png"

function DropdownAdmin() {
  let navigate = useNavigate();
  const [_, dispatch] = useContext(UserContext);

  const logoutAdmin = () => {
    dispatch({
      type: 'LOGOUT',
    });
    navigate("/");
    window.location.reload();
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant=""
        id="dropdown-basic"
        style={{ border: "none", height: "90px" }}
      >
        <div className="d-flex">
          <p style={{marginTop:"32px", marginBottom:"0px", marginRight:"14px"}}>Admin</p>
          <img src={boy} alt="..." style={{objectFit:"contain", marginTop:"24px"}}/>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="" style={{ top: "80px", left: "-80px" }}>
        <Dropdown.Item className="d-flex">
          <div className="d-flex">
            <Link to="/add-tiket">
              <img
                src={train}
                alt="income-trip"
                style={{ objectFit: "contain" }}
              />
            </Link>
            <Link to="/add-tiket" className="text-decoration-none">
              <p className="mx-3 mt-2 text-secondary">Tambah TIket</p>
            </Link>
          </div>
        </Dropdown.Item>
        <Dropdown.Item className="d-flex" style={{borderTop:"2px solid #ec7ab7"}}>
          <div className="d-flex mt-3">
            <Link to="/transaction">
              <img src={logout} alt="logout" style={{ objectFit: "contain" }} />
            </Link>
            <Link 
              onClick={logoutAdmin} 
              className="text-decoration-none">
              <p className="mx-3 mt-2 text-secondary">Logout</p>
            </Link>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownAdmin;
