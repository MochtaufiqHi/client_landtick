import "./App.css";
import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<PrivateRouteLogin />}>
          <Route element={<PrivateRouteUser />}>
            <Route exact path="/tiket-saya/:id" element={<TiketSaya />} />
            <Route exact path="/tiket" element={<Tiket />} />
            <Route exact path="/payment/:id" element={<Payment />} />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route
              exact
              path="/list-transaction"
              element={<ListTransaction />}
            />
            <Route exact path="/add-tiket" element={<AddTiket />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
