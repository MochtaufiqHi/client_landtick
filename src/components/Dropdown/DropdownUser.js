import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../../context/useContext'
import boy from "../../assets/image/boy.png"
import logout from "../../assets/image/logot.png"
import bill from "../../assets/image/bill.png"
import tiket from "../../assets/image/tiket.png"



function DropdownUser(props) {
  let navigate = useNavigate()
  const [_, dispatch] = useContext(UserContext)

  const logoutUser = () => {
    dispatch({
      type: 'LOGOUT'
    })
    navigate("/")
    window.location.reload()
  } 


  return (
    <Dropdown style={{}}>

      <Dropdown.Toggle variant="" id="dropdown-basic" style={{border:"none", height:"90px"}}>
        <div className="d-flex">
        <p style={{marginTop:"32px", marginRight:"14px", marginBottom:"0px"}}>User</p>
          <img src={boy} alt="..." style={{objectFit:"contain", marginTop:"24px"}}/>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="" style={{top:"80px", left:"-80px"}}>
      <Dropdown.Item className='d-flex'>
          <div className='d-flex'>
            <Link to="/tiket" >
              <img src={tiket} alt="user profile" style={{objectFit:"contain"}}/>
            </Link>
            <Link to="/tiket" className='text-decoration-none'>
              <p className='mx-3 mt-2 text-secondary'>Tiket Saya</p>
            </Link>
          </div>
        </Dropdown.Item>
        <Dropdown.Item className='d-flex'>
          <div className='d-flex'>
            <Link to="/payment" >
              <img src={bill} alt="user profile" style={{objectFit:"contain"}}/>
            </Link>
            <Link to="/payment" className='text-decoration-none'>
              <p className='mx-3 mt-2 text-secondary'>Payment</p>
            </Link>
          </div>
        </Dropdown.Item>
        <Dropdown.Item className='d-flex' style={{borderTop:"2px solid #ec7ab7"}}>
          <div className='d-flex mt-3'>
            <Link 
            onClick={logoutUser}
            >
                <img src={logout} alt="logout" style={{objectFit:"contain"}}/>
            </Link>
            <Link 
            onClick={logoutUser} 
            className='text-decoration-none'>
              {/* Logout */}
              <p className='mx-3 mt-2 text-secondary text-decoration-none'>Logout</p>
            </Link>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownUser