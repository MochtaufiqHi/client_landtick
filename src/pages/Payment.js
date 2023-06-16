import { Button } from "react-bootstrap"
import error from "../assets/image/error.png"
import kerta from "../assets/image/icon2.png"
import qr from "../assets/image/qr.png"
import icon2 from '../assets/image/icon2.png'
import bulat1 from '../assets/image/bulat1.png'
import bulat2 from '../assets/image/bulat2.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from "react-query";
import { useContext, useState } from 'react'
import { UserContext } from '../context/useContext'
import { API } from '../config/api'

function Payment() {
  let { id } = useParams()
  let navigate = useNavigate()

  const [user] = useContext(UserContext)

  const [tikets, setTikets] = useState()

  const [jumlah, setJumlah] = useState(4)

  var total = tikets?.harga*jumlah + tikets?.harga*1/2*jumlah

  let { data : tiket } = useQuery("tiketCache", async () => {
    const response = await API.get("/tiket/" + id)
    setTikets(response.data.data)
    return response.data.data
  },)

  const bayarSekarang = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          'Content-type': 'application/json',
          'Authorization':  `Bearer ${localStorage.token}`,
        },
      };

      const data = {
        qty : jumlah,
        total : total,
        status : "Pending",
        attachment : "bca.jpg",
        user_id : user.user.id,
        tiket_id : tikets.id
    
      }

      const body = JSON.stringify(data)

      const response = await API.post("/transaksi", body, config)
      console.log("transaction success :", response)
      navigate("/")
    } catch (error) {
      console.log("transaction failed :", error)
    }
  })

  console.log(user)

  return (
    <>
      <div className="container mt-5">
        <p>Invoince</p>
        <div className="row" >
          <div className="col-7">
            <div className="warning-tiket rounded border border-secondary">
              <div className="d-flex">
                <img src={error} alt="error" style={{objectFit:"contain", padding:"20px"}}/>
                <div className="p-3">
                  <p className="err-text">Silakan melakukan pembayaran memalui M-Banking, E-Banking dan ATM Ke No.rek Yang Tertera .<br/></p>
                  <p className="err-text">No.rek : 09812312312</p>
                </div>
              </div>
            </div>
            <div className="mt-4 shadow border rounded"> 
            <div className="item-logo-kereta">
              <img src={kerta} alt="kereta-logo" style={{marginLeft:"20px"}}/>
            </div>
              <div className="d-flex px-3 ini-tabel">
                <p className="p-text">No. Tanda Pengenal</p>
                <p className="p-text">Nama Pemesan</p>
                <p className="p-text">No. Handphone</p>
                <p className="p-text">No. Email</p>
              </div>
              <div className="d-flex px-3 mt-2 justify-content-between">
                <p className="p-text-p">{user?.user?.username}</p>
                <p className="p-text-p">{user?.user?.fullname}</p>
                <p className="p-text-p">{user?.user?.phone}</p>
                <p className="p-text-p">{user?.user?.email}</p>
              </div>
            </div>
            <p className="rincian-harga">Rincian Harga</p>
            <div className="rounded shadow border border-secondary">
              <div className="d-flex justify-content-between">
                <p className="p-3">{tikets?.name} (Dewasa)x{jumlah}</p>
                <p className="p-3">Rp. {tikets?.harga}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="p-3">{tikets?.name} (Balita)x{jumlah}</p>
                <p className="p-3">Rp. {tikets?.harga}</p>
              </div>
              <div className="d-flex payment-total justify-content-between mb-0">
                <p className="p-3 payment-text">Total</p>
                <p className="p-3 payment-price">Rp. {tikets?.harga*jumlah + tikets?.harga*1/2*jumlah}</p>
              </div>
            </div>
            <div className="mt-4 mb-5">
              <Button className="w-100" onClick={(e) => bayarSekarang.mutate(e)} style={{background:"linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)", borderColor:"white"}}>Bayar Sekarang</Button>
            </div>
          </div>
          <div className="col-4">
            <div className="">
              <div className="kireteria d-flex justify-content-between p-4">
                <div className="">
                  <p className="kereta-text">Kereta Api</p>
                  <p className="tanggal-berangkat" style={{color:"#878787"}}><span className="hari-bayar">Saturday</span>, 21 Februari 2023</p>
                </div>
                <div className="">

                <img src={qr}  alt="qr" style={{objectFit:"contain"}}/>
                <p className="mt-3">INV0101</p>
                </div>
              </div>
              <div className="bg-danger"></div>
            </div>
            <p className="p-2 nama-keretaku">{tikets?.name}</p>
            <p className="p-2">{tikets?.train?.name}</p>
              <div className="row">
          <div className='col-6'>
            <div className='d-flex mt-5'>
              <div style={{marginTop:"20px"}}>
                <img src={bulat1} alt="bulat"/>
              </div>
              <div style={{marginLeft:"20px"}}>
                <p className='text-item'>{tikets?.jam_berangkat}</p>
                <p className='tgl-item'>21 Februari 2023</p>
              </div>
            </div>
            <div className='d-flex my-2'>
              <div style={{marginTop:"20px"}}>
                <img src={bulat2} alt="bulat"/>
              </div>
              <div style={{marginLeft:"20px", marginTop:"10px"}}>
                <p className='text-item'>{tikets?.jam_tiba}</p>
                <p className='tgl-item'>21 Februari 2023</p>
              </div>
            </div>
          </div>
          <div className='col-6'>
          <div className='d-flex mt-5'>
              <div>
                <p className='text-item'>Jakarta (GMR)</p>
                <p className='tgl-item'>{tikets?.stasiun_awal}</p>
              </div>
            </div>
            <div className='d-flex my-2'>
              <div style={{marginTop:"10px"}}>
                <p className='text-item'>Garut (GRT)</p>
                <p className='tgl-item'>{tikets?.stasiun_akhir}</p>
              </div>
            </div>
          </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment