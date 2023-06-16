import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AddTiket() {
  let navigate = useNavigate()

  const [kelas, setKelas] = useState([])
  const [preview, setPreview] = useState(null) 
  const [form, setForm] = useState({
    kereta:'',
    train_id: '',
    tgl_berangkat: '',
    sts_berangkat: '',
    jam_berangkat: '',
    sts_tujuan:'',
    jam_tiba: '',
    harga:'',
    qty:''
  })

  const getKelas = async () => {
    try {
      const response = await API.get("/train")
      setKelas(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : 
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()
      //configuration
      const config = {
        headers: {
          "Content-type" : "multipart/form-data",
          "Authorization" :`Bearer ${localStorage.token}`
        }
      }

      const formData = new FormData()
      formData.set("name", form.kereta)
      formData.set("train_id", form.train_id)
      formData.set("tanggal", form.tgl_berangkat)
      formData.set("stasiun_awal", form.sts_berangkat)
      formData.set("jam_berangkat", form.jam_berangkat)
      formData.set("stasiun_akhir", form.sts_tujuan)
      formData.set("jam_tiba", form.jam_tiba)
      formData.set("harga", form.harga)
      formData.set("kuota", form.qty)

      const response = await API.post("/tiket", formData, config)
      console.log("Tambah tiket berhasil : ", response)

      navigate("/")
    } catch (error) {
      console.log("tambah tiket gagal :", error)
    }
  })

  useEffect(() => {
    getKelas()
  }, [])

  console.log(form)

  return (
    <>
      <div className="container my-5">
        <p
          style={{ fontWeight: "800", fontSize: "36px", marginBottom: "50px" }}
        >
          Tambah Tiket
        </p>
        <Form
          id="mySwitch"
          onSubmit={(e) => handleSubmit.mutate(e)}
        >
          <Form.Group className="mb-3">
            <Form.Control
              name="kereta"
              type="input"
              placeholder="Nama Kereta"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              name="train_id"
              type="input"
              placeholder="Jenis Kereta"
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Select 
              aria-label="Default select example" 
              name="train_id" 
              onChange={handleChange}
            >
              {kelas.map((item, index) => {
                return (
                  <option value={item.id}>
                    {item.name}
                  </option>
                )
              })}

              {/* <option>Jenis Kereta</option>
              <option value="1">1</option>
              <option value="2">1</option>
              <option value="3">1</option>
            </Form.Select>
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Control
              type="input"
              name="tgl_berangkat"
              placeholder="Tanggal Keberangkatan"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="input"
              name="sts_berangkat"
              placeholder="Stasiun Keberangkatan"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="input"
              name="jam_berangkat"
              placeholder="Jam Keberangkatan"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="input"
              name="sts_tujuan"
              placeholder="Stasiun Tujuan"
               onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="input"
              name="jam_tiba"
              placeholder="Jam Tiba"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="input"
              name="harga"
              placeholder="Harga Tiket"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="input"
              name="qty"
              placeholder="Qty"
              onChange={handleChange}
            />
          </Form.Group>

          <div
            className="d-flex"
            style={{ margin: "0px auto", justifyContent: "space-around" }}
          >
            <Button
              variant="primary"
              type="submit"
              style={{
                width: "250px",
                backgroundColor: "#0ACF83",
                border: "none",
              }}
            >
              <p
                style={{
                  fontWeight: "900",
                  fontSize: "18px",
                  marginBottom: "0px",
                }}
              >
                Simpan
              </p>
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AddTiket;
