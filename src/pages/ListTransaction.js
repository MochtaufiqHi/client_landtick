import "./index.css";
import kaca from "../assets/image/kaca.png"
import trash from "../assets/image/trash.png"
import edit from "../assets/image/1.png"
import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
// import edit from "../assets/image/edit.png"

function ListTransaction() {

  const [transaksi, setTransaksi] = useState()
  let {data : transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transaksi")
    setTransaksi(response.data.data)
    return response.data.data
  })

  console.log(transaksi)
  return (
    <>
      <div className="container mt-5">
        <h1>List Transaction</h1>
        {/* Thead */}
        <div className="container text-start bg-light">
          <div className="row align-items-center content-table">
            <div className="col-1">
              <p className="text-colom-h my-4">No</p>
            </div>
            <div className="col-3">
              <p className="text-colom-h my-4">Users</p>
            </div>
            <div className="col-3">
              <p className="text-colom-h my-4">Tiket</p>
            </div>
            <div className="col-3">
              <p className="text-colom-h my-4">Status Payment</p>
            </div>
            <div className="col-2">
              <p className="text-colom-h my-4">Action</p>
            </div>
          </div>
          {transaksi?.map((item, index) => {
            return (
              <div className="row align-items-center content-table">
            <div className="col-1">
              <p className="text-colom-h my-4">{index + 1}</p>
            </div>
            <div className="col-3">
              <p className="text-colom-h my-4">{item?.user?.fullname}</p>
            </div>
            <div className="col-3">
              <p className="text-colom-h my-4">{item?.tiket?.stasiun_awal} - {item?.tiket?.stasiun_akhir}</p>
            </div>
            <div className="col-3">
              <p className="text-colom-h my-4">{item?.status}</p>
            </div>
            <div className="col-2">
              {/* <p className="text-colom-h my-4">Action</p> */}
              <img src={kaca} alt="action"/>
              <img src={edit} alt="action" className="mx-4"/>
              <img src={trash} alt="action"/>
            </div>
          </div>
            )
          })}
          {/* <div className="row align-items-center content-table">
            <div className="col-1">
              <p className="text-colom-h my-4">1</p>
            </div>
            <div className="col-3">
              <p className="text-colom-h my-4">Anto</p>
            </div>
            <div className="col-3">
              <p className="text-colom-h my-4">Surabaya-Jakarta</p>
            </div>
            <div className="col-3">
              <p className="text-colom-h my-4">Pending</p>
            </div>
            <div className="col-2">
              <p className="text-colom-h my-4">Action</p>
              <img src={kaca} alt="action"/>
              <img src={edit} alt="action" className="mx-4"/>
              <img src={trash} alt="action"/>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ListTransaction;
