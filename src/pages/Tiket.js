import "./index.css";
import icon2 from "../assets/image/icon2.png";
import bulat1 from "../assets/image/bulat1.png";
import bulat2 from "../assets/image/bulat2.png";
import { Button } from "react-bootstrap";
import { API } from "../config/api";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext, useState } from "react";
import qr from "../assets/image/qr.png";
import { UserContext } from "../context/useContext";
import { Modal } from "react-bootstrap";

function Tiket() {
  const [data] = useContext(UserContext);
  const [tiket, setTiket] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: tiketUser } = useQuery("tiketUser", async () => {
    const response = await API.get("/transaksi-user/" + data?.user?.id);
    setTiket(response.data.data);
    return response.data.data;
  });

  console.log(tiket);

  // console.log(data)
  return (
    <>
      <div className="container mt-5">
        <p className="tiket-saya-text"> Tiket Saya</p>
        {tiket?.map((data, index) => {
          return (
            <>
              <div
                className="border border-secondary rounded justify-content-center mb-5"
                style={{ heigh: "100px", width: "90%", margin: "10px auto" }}
              >
                <div className="row">
                  <div className="col-3">
                    <div className="img-kereta">
                      <img
                        src={icon2}
                        alt="icon"
                        className="px-2"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <p className="nama-kereta">{data?.tiket?.name}</p>
                    <p className="kelas-kereta">{data?.tiket?.train?.name}</p>
                    <p className="status" style={{ color: "#F7941E" }}>
                      Status
                    </p>
                  </div>
                  <div className="col-3">
                    <div className="d-flex mt-5">
                      <div style={{ marginTop: "20px" }}>
                        <img src={bulat1} alt="bulat" />
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        <p className="text-item">
                          {data?.tiket?.jam_berangkat}
                        </p>
                        <p className="tgl-item">{data?.tiket?.tanggal}</p>
                      </div>
                    </div>
                    <div className="d-flex my-2">
                      <div style={{ marginTop: "20px" }}>
                        <img src={bulat2} alt="bulat" />
                      </div>
                      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                        <p className="text-item">{data?.tiket?.jam_tiba}</p>
                        <p className="tgl-item">{data?.tiket?.tanggal}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="d-flex mt-5">
                      <div>
                        <p className="text-item">Jakarta (GMR)</p>
                        <p className="tgl-item">{data?.tiket?.stasiun_awal}</p>
                      </div>
                    </div>
                    <div className="d-flex my-2">
                      <div style={{ marginTop: "10px" }}>
                        <p className="text-item">Garut (GRT)</p>
                        <p className="tgl-item">{data?.tiket?.stasiun_akhir}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className='col-2'></div> */}
                  <div className="col-3">
                    <div>
                      <p className="date-tiket text-end px-3">
                        {data?.tiket?.name}
                      </p>
                      <p className="date-tikett text-end px-3">
                        <span style={{ fontWeight: "800" }}>Sabtu, </span>
                        {data?.tiket?.tanggal}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={handleShow}
                        style={{ border: "none", backgroundColor: "white" }}
                      >
                        <img
                          style={{ width: "120px", marginLeft: "60px" }}
                          src={qr}
                          alt="qr"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row my-4 text-start tabel-item">
                  <div className="col-3">
                    <p className="tabel-info-info">No. Tanda Pengenal</p>
                    <p className="item-info-info">{data?.user?.username}</p>
                  </div>
                  <div className="col-2">
                    <p className="tabel-info">Nama Pemesan</p>
                    <p className="item-info">{data?.user?.fullname}</p>
                  </div>
                  <div className="col-2">
                    <p className="tabel-info">No. Handphone</p>
                    <p className="item-info">{data?.user?.phone}</p>
                  </div>
                  <div className="col-2">
                    <p className="tabel-info">Email</p>
                    <p className="item-info">{data?.user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Modal */}
              {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
              </Button> */}

              <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p
                          style={{
                            fontWeight: "800",
                            fontSize: "48px",
                            marginBottom: "0px",
                          }}
                        >
                          E-Tiket
                        </p>
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "14px",
                            color: "#767676",
                          }}
                        >
                          kode Invoice: INV0101
                        </p>
                      </div>
                      <div style={{ marginLeft: "20px", width: "115px" }}>
                        <img
                          src={icon2}
                          alt="kereta"
                          style={{
                            background:
                              "linear-gradient(180deg, #EC7A7A 0%, #EC7AB7 100%)",
                            padding: "6px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div>
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "24px",
                            marginBottom: "0px",
                          }}
                        >
                          {/* {data?.tiket?.name} */}
                          Kereta Api
                        </p>

                        <p className="date-tikett text-start">
                          <span style={{ fontWeight: "400" }}>Sabtu, </span>
                          {data?.tiket?.tanggal}
                        </p>
                      </div>
                      <div style={{ marginLeft: "20px", width: "190px" }}>
                        <img
                          src={qr}
                          alt="kereta"
                          style={{
                            padding: "6px",
                            width:"180px"
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="nama-kereta">{data?.tiket?.name}</p>
                      <p className="kelas-kereta">{data?.tiket?.train?.name}</p>
                      <div className="d-flex justify-content-start mt-4">
                        <div className="d-flex px-4">
                          <div style={{ marginTop: "2px" }}>
                            <img src={bulat1} alt="bulat" />
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            <p className="text-item">
                              {data?.tiket?.jam_berangkat}
                            </p>
                            <p className="tgl-item">{data?.tiket?.tanggal}</p>
                          </div>
                        </div>
                        <div className="d-flex">
                      <div>
                        <p className="text-item">Jakarta (GMR)</p>
                        <p className="tgl-item">{data?.tiket?.stasiun_awal}</p>
                      </div>
                    </div>
                      </div>
                      <div className="d-flex justify-content-start">
                        <div className="d-flex px-4">
                          <div style={{ marginTop: "6px" }}>
                            <img src={bulat2} alt="bulat" />
                          </div>
                          <div
                            style={{ marginLeft: "20px" }}
                          >
                            <p className="text-item">{data?.tiket?.jam_tiba}</p>
                            <p className="tgl-item">{data?.tiket?.tanggal}</p>
                          </div>
                        </div>
                        <div className="d-flex">
                      <div>
                        <p className="text-item">Jakarta (GMR)</p>
                        <p className="tgl-item">{data?.tiket?.stasiun_awal}</p>
                      </div>
                    </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    style={{
                      background:
                        "linear-gradient(180deg, #EC7A7A 0%, #EC7AB7 100%)",
                      borderColor: "white",
                    }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
        })}
        {/* <div className="border border-secondary rounded justify-content-center" style={{heigh:"100px", width:"90%", margin:"10px auto"}}>
        <div className='row'>
          <div className='col-3'>
            <div className='img-kereta'>
              <img src={icon2} alt="icon" className='px-2' style={{objectFit:"contain"}}/>
            </div>
            <p className='nama-kereta'>nama kereta</p>
            <p className='kelas-kereta'>kelas kerta</p>
            <p className='status' style={{color:"#F7941E"}}>Status</p>
          </div>
          <div className='col-3'>
            <div className='d-flex mt-5'>
              <div style={{marginTop:"20px"}}>
                <img src={bulat1} alt="bulat"/>
              </div>
              <div style={{marginLeft:"20px"}}>
                <p className='text-item'>jam berangkat</p>
                <p className='tgl-item'>21 Februari 2023</p>
              </div>
            </div>
            <div className='d-flex my-2'>
              <div style={{marginTop:"20px"}}>
                <img src={bulat2} alt="bulat"/>
              </div>
              <div style={{marginLeft:"20px", marginTop:"10px"}}>
                <p className='text-item'>jam tiba</p>
                <p className='tgl-item'>21 Februari 2023</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
          <div className='d-flex mt-5'>
              <div>
                <p className='text-item'>Jakarta (GMR)</p>
                <p className='tgl-item'>stasiun awal</p>
              </div>
            </div>
            <div className='d-flex my-2'>
              <div style={{marginTop:"10px"}}>
                <p className='text-item'>Garut (GRT)</p>
                <p className='tgl-item'>stasiun akhir</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
          <div>
                <p className='date-tiket text-end px-3'>Kereta Api</p>
                <p className='date-tikett text-end px-3'><span style={{fontWeight:"800"}}>Sabtu, </span>21 Februari 2023</p>
              </div>
          </div>
        </div>

        <div className='row my-4 text-start tabel-item'>

          <div className='col-3'>
            <p className='tabel-info-info'>No. Tanda Pengenal</p>
            <p className='item-info-info'>0999</p>
          </div>
          <div className='col-2'>
            <p className='tabel-info'>Nama Pemesan</p>
            <p className='item-info'>anto</p>
          </div>
          <div className='col-2'>
            <p className='tabel-info'>No. Handphone</p>
            <p className='item-info'>088</p>
          </div>
          <div className='col-2'>
            <p className='tabel-info'>Email</p>
            <p className='item-info'>email@maill,,co</p>
          </div>

        </div>
      </div> */}
      </div>
    </>
  );
}

export default Tiket;
