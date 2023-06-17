import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ListTransaction from "./pages/ListTransaction";
import AddTiket from "./pages/AddTiket";
import Navigation from "./components/Navbar/Navigation";
import TiketSaya from "./pages/TiketSaya";
import Payment from "./pages/Payment";
import Tiket from "./pages/Tiket";
import {
  PrivateRouteAdmin,
  PrivateRouteLogin,
  PrivateRouteUser,
} from "./pages/PrivateRoute";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/useContext";
import { setAuthToken, API } from "./config/api";

function App() {

  const [perhitungan, setPerhitungan] = useState({
    pp: 1,
    dewasa: 0,
    balita: 0,
  })

  const handleHarga = (e) => {
    setPerhitungan(e)
  }

  // console.log(perhitungan)

  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      checkUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth")
      console.log("check user success : ", response)

      let payload = response.data.data

      payload.token = localStorage.token

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      })
    } catch (error) {
      console.log("check user failed : ", error)
      dispatch({
        type: 'AUTH_ERROR',
      })
      setIsLoading(false)
    }
  }
  return isLoading ? null : (
    <>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home handle={handleHarga} />} />
        {/* <Route element={<PrivateRouteLogin />}> */}
          {/* <Route element={<PrivateRouteUser />}> */}
            <Route exact path="/tiket-saya/:id" element={<TiketSaya />} />
            <Route exact path="/tiket" element={<Tiket />} />
            <Route exact path="/payment/:id" element={<Payment perhitungan={perhitungan}/>} />
          {/* </Route> */}
        {/* </Route> */}
          {/* <Route element={<PrivateRouteUser />}> */}
            <Route exact path="/list-transaction" element={<ListTransaction />}/>
            <Route exact path="/add-tiket" element={<AddTiket />} />
          {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
