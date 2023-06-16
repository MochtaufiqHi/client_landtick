import { useState } from 'react';
import {Button, Form, Modal} from 'react-bootstrap'
import { useMutation } from 'react-query';
import Swal from 'sweetalert2';
import { API } from '../../config/api';
import './index.css'

function ModalRegister(props) {
  const [message, setMessage] = useState(null)

  const [form, setForm] = useState([{
    fullname:'',
    username:'',
    email: '',
    password: '',
    gender: '',
    phone: '',
    address:''
  }])

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })
  }

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()
      props.handleCloseReg()

      const response = await API.post('/register', form)
      console.log("register success :", response)

      setForm({
        fullname:'',
        username:'',
        email: '',
        password: '',
        gender: '',
        phone: '',
        address:''
      })
      Swal.fire(
        'Register Succes!',
        '',
        'success',
        '3000'
      )
    } catch (error) {
      Swal.fire(
        'Register Failed!',
        'Please try again',
        'error',
        '3000'
      )
      console.log("Register failed : ", error)
    }
  })

  // console.log(form)

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} className="d-flex">
        <Modal.Body className='login-modal'>
          <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <h3 className='label-login'>Daftar</h3>
            <Form.Group className="mb-3">
              <Form.Control
                type="input"
                placeholder="Nama Lengkap"
                name="fullname"
                autoFocus
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="input"
                placeholder="Username"
                name="username"
                autoFocus
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                autoFocus
                onChange={handleOnChange}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                autoFocus
                onChange={handleOnChange}
                name="password"
              />
            </Form.Group>
            <Form.Select aria-label="Default select example" className="mb-3" name="gender" onChange={handleOnChange}>
              <option disabled={true} className='text-option'>Jenis Kelamin</option>
              <option value="Laki-laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Control
                type="input"
                placeholder="Telp"
                name="phone"
                onChange={handleOnChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
        <Form.Control as="textarea" rows={3} placeholder="Alamat" onChange={handleOnChange} name="address"/>
      </Form.Group>


            <div className='d-flex'>

            <Button className='button-login' type="submit">
              Daftar
            </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalRegister