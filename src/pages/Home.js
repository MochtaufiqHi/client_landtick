import portal1 from "../assets/image/portal1.png";
import garis from "../assets/image/garis.png";
import train from "../assets/image/train.png";
import transfer from "../assets/image/transfer.png";
import arrow from "../assets/image/arrow.png";
import portal2 from "../assets/image/portal2.png";
import { Form, Button } from "react-bootstrap";
import "./index.css";
import { useContext, useState } from "react";
import { API } from "../config/api";
import Swal from "sweetalert2";
// import {PropagateLoader} from 'react-spinners'
// import { UserContext } from "../../context/useContext";

import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function Home({ handle }) {

  const [asal, setAsal] = useState("")
  const [tujuan, setTujuan] = useState("")
  const [tanggal, setTanggal] = useState("")

  // console.log(asal)
  // console.log(tujuan)
  // console.log(tanggal)

  const [tiket, setTiket] = useState();
  let { data: tikets } = useQuery("tiketCache", async () => {
    const response = await API.get("/tiket");
    setTiket(response.data.data);
    return response.data.data;
  });

  const alert = () => {
    let timerInterval;
    Swal.fire({
      title: "Memuat Data!",
      html: "Mohon Tunggu <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  const [form, setForm] = useState({
    pp: false,
    dewasa: 0,
    balita: 0
  })

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }
  const handleOnChecked = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.checked
    })
  }

  // handleHarga()
  handle(form)

  // console.log(form)
  // console.log(handle)

  return (
    <>
      {/* Banner */}
      <div
        className="pb-5"
        style={{
          background: "linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)",
        }}
      >
        <div className="d-flex container justify-content-between">
          <div className="mt-5">
            <p style={{ fontWeight: "900", fontSize: "36px", color: "white" }}>
              Selamat Pagi, Ticket Seekers!
            </p>
            <p style={{ fontWeight: "400", fontSize: "26px", color: "white" }}>
              Ingin pulkam dengan Good Deal ? <br /> Masuk atau Daftar Sekarang
              !
            </p>
          </div>
          <div className="mt-5 d-realative">
            <div>
              <img src={portal1} alt="portal" />
            </div>
            <div style={{ position: "absolute", top: "96px", right: "146px" }}>
              <img src={portal2} alt="portal" />
            </div>
          </div>
        </div>
      </div>
      {/* Card Filter */}
      <div
        className="container shadow rounded card-filter mb-5 p-absolute"
        style={{
          top: "350px",
          right: "0px",
          left: "0px",
          background: "white",
          position: "absolute",
        }}
      >
        <div className="row">
          <div className="col-3 p-0">
            <div className="d-flex">
              <img src={garis} alt="garis" />
              <img src={train} alt="train" style={{ objectFit: "contain" }} />
              <p
                style={{
                  fontWeight: "300",
                  fontSize: "18px",
                  marginTop: "16px",
                }}
              >
                Tiket Kereta Api
              </p>
            </div>
          </div>
          <div className="col-4">
            <p style={{ fontWeight: "400", fontSize: "24px" }}>
              Tiket Kereta Api
            </p>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="label-form-input">Asal</Form.Label>
                <Form.Control type="email" placeholder="Jakarta" onChange={e => setAsal(e.target.value)}/>
              </Form.Group>
            </Form>
            <div className="d-flex justify-content-between">
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-form-input">
                      Tanggal Berangkat
                    </Form.Label>
                    <Form.Control
                      type="input"
                      onChange={e => setTanggal(e.target.value)}
                      placeholder="DD-MM-YY"
                      style={{ width: "110px" }}
                    />
                  </Form.Group>
                </Form>
              </div>
              <div>
                <input
                  className="form-check-input mx-2"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                  name="pp"
                  onChange={handleOnChecked}
                />
                <label
                  className="form-check-label label-form-input"
                  for="defaultCheck1"
                >
                  Pulang Pergi
                </label>
              </div>
            </div>
          </div>
          <div
            className="col-1"
            style={{ width: "60px", paddingLeft: "0px", paddingRight: "0px" }}
          >
            <div className="container-button">
              <button className="button-transfer">
                <img src={transfer} alt="transfer" />
              </button>
            </div>
          </div>
          <div className="col-4">
            <p
              style={{
                fontWeight: "300",
                fontSize: "18px",
                marginTop: "12px",
                color: "white",
              }}
            >
              p
            </p>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="label-form-input">Tujuan</Form.Label>
                <Form.Control type="email" placeholder="Bandung" onChange={e => setTujuan(e.target.value)} />
              </Form.Group>
            </Form>
            <div className="d-flex justify-content-between">
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-form-input">Dewasa</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ width: "110px" }}
                      name="dewasa"
                      onChange={handleOnChange}

                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </div>
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-form-input">Bayi</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ width: "110px" }}
                      onChange={handleOnChange}
                      name="balita"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </div>
              <div>
                <Button className="login-button-filter">Cari Tiket</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tiket Item */}
      <div className="container" style={{ marginTop: "270px" }}>
        <div className="row text-center">
          <div className="col-2">Nama Kereta</div>
          <div className="col-2">Berangkat</div>
          <div className="col-1"></div>
          <div className="col-2">Tiba</div>
          <div className="col-2">Durasi</div>
          <div className="col-3">Harga Per Orang</div>
        </div>
      </div>
      {/* Tiket Items */}
      {tiket?.filter((item) => {
        if (asal == "" && tujuan == "" && tanggal == "") {
          return item
        } else if (item?.stasiun_awal.toLowerCase().includes(asal.toLowerCase()) && item?.stasiun_akhir.toLowerCase().includes(tujuan.toLowerCase()) && item?.tanggal.toLowerCase().includes(tanggal.toLowerCase())){
          return item
        }
      })?.map((item, index) => {
        return (
          <Link
            to={`/tiket-saya/${item.id}`}
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => alert()}
          >
            <div className="container mt-4 border shadow rounded" key={index}>
              <div className="row text-center text-align-center">
                <div className="col-2">
                  <p className="text-satu">{item?.name}</p>
                  <p className="text-dua">{item?.train?.name}</p>
                </div>
                <div className="col-2">
                  <p className="text-satu">{item?.jam_berangkat}</p>
                  <p className="text-dua">{item?.stasiun_awal}</p>
                </div>
                <div className="col-1">
                  <img src={arrow} alt="arrow" style={{ marginTop: "44px" }} />
                </div>
                <div className="col-2">
                  <p className="text-satu">{item?.jam_tiba}</p>
                  <p className="text-dua">{item?.stasiun_akhir}</p>
                </div>
                <div className="col-2 text-satu">2 Jam 10 Menit</div>
                <div className="col-3 text-harga">Rp. {item?.harga}</div>
              </div>
            </div>
          </Link>
        );
      })
      
      }

{/*
      {tiket?.map((item, index) => {
        return (
          <Link
            to={`/tiket-saya/${item.id}`}
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => alert()}
          >
            <div className="container mt-4 border shadow rounded" key={index}>
              <div className="row text-center text-align-center">
                <div className="col-2">
                  <p className="text-satu">{item?.name}</p>
                  <p className="text-dua">{item?.train?.name}</p>
                </div>
                <div className="col-2">
                  <p className="text-satu">{item?.jam_berangkat}</p>
                  <p className="text-dua">{item?.stasiun_awal}</p>
                </div>
                <div className="col-1">
                  <img src={arrow} alt="arrow" style={{ marginTop: "44px" }} />
                </div>
                <div className="col-2">
                  <p className="text-satu">{item?.jam_tiba}</p>
                  <p className="text-dua">{item?.stasiun_akhir}</p>
                </div>
                <div className="col-2 text-satu">2 Jam 10 Menit</div>
                <div className="col-3 text-harga">Rp. {item?.harga}</div>
              </div>
            </div>
          </Link>
        );
      })}
 */}

      {/* <div className="container mt-4 border shadow rounded">
      <div className="row text-center text-align-center">
        <div className="col-2">
          <p className="text-satu">Argo Will</p>
          <p className="text-dua">Eksekutif (H)</p>
        </div>
        <div className="col-2">
          <p className="text-satu">05.00</p>
          <p className="text-dua">Gambir</p>
        </div>
        <div className="col-1">
          <img src={arrow} alt="arrow" style={{marginTop:"44px"}}/>
        </div>
        <div className="col-2">
        <p className="text-satu">10.05</p>
          <p className="text-dua">Surabaya</p>
        </div>
        <div className="col-2 text-satu">5j 05m</div>
        <div className="col-3 text-harga">Rp. 250.000</div>
      </div>
    </div> */}
      {/* Footer */}
      <div className="footer">
        <p className="footer-font">Footer</p>
      </div>
    </>
  );
}

export default Home;
