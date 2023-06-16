import './index.css'
import icon2 from '../assets/image/icon2.png'
import bulat1 from '../assets/image/bulat1.png'
import bulat2 from '../assets/image/bulat2.png'
import { Button } from 'react-bootstrap'
import { API } from '../config/api'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from "react-query";
import { useContext, useState } from 'react'
import { UserContext } from '../context/useContext'


function TiketSaya() {
  let { id } = useParams()

  const [user] = useContext(UserContext)

  const [tikets, setTikets] = useState()

  let { data : tiket } = useQuery("tiketCache", async () => {
    const response = await API.get("/tiket/" + id)
    setTikets(response.data.data)
    return response.data.data
  },)

  // console.log(user)
  return (
    <>
    <div className="container mt-5">
      <p className='tiket-saya-text'> Tiket Saya</p>
      <div className="border border-dark rounded justify-content-center" style={{heigh:"100px", width:"90%", margin:"10px auto"}}>
        <div className='row'>
          <div className='col-3'>
            <div className='img-kereta'>
              <img src={icon2} alt="icon" className='px-2' style={{objectFit:"contain"}}/>
            </div>
            <p className='nama-kereta'>{tikets?.name}</p>
            <p className='kelas-kereta'>{tikets?.train?.name}</p>
            <p className='status' style={{color:"#F7941E"}}>Pending</p>
          </div>
          <div className='col-3'>
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
                <p className='text-item'>{tikets?.jam_tiba  }</p>
                <p className='tgl-item'>21 Februari 2023</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
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
          {/* <div className='col-2'></div> */}
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
            <p className='item-info-info'>{user?.user?.username}</p>
          </div>
          <div className='col-2'>
            <p className='tabel-info'>Nama Pemesan</p>
            <p className='item-info'>{user?.user?.fullname}</p>
          </div>
          <div className='col-2'>
            <p className='tabel-info'>No. Handphone</p>
            <p className='item-info'>{user?.user?.phone}</p>
          </div>
          <div className='col-2'>
            <p className='tabel-info'>Email</p>
            <p className='item-info'>{user?.user?.email}</p>
          </div>
          <div className='col-3'>
            <Link to={`/payment/${id}`}>
              <Button className='btn-bayar'>Bayar Sekarang</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default TiketSaya