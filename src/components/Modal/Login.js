import { useContext, useState } from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { API, setAuthToken } from '../../config/api'
import { UserContext } from '../../context/useContext'
import './index.css'

function ModalLogin(props) {
  let navigate = useNavigate()

  const [_, dispatch] = useContext(UserContext)

  const [message, setMessage] = useState(null)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { email, password } = form

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post("/login", form)
      console.log("login success :", response)

      dispatch({
        type: "LOGIN_SUCCESS",
        role: response.data.data.role,
        payload: response.data.data
      })

      setAuthToken(localStorage.token)

      if (response.data.data.role === "admin") {
        navigate("/list-transaction")
      } else {
        navigate("/")
      }
      Swal.fire(
        'Loggin Succes!',
        '',
        'success',
        '3000'
      )
    } catch (error) {
      Swal.fire(
        'Loggin Failed!',
        'Please check your email and password',
        'error',
        '3000'
      )
      console.log("Login failed : ", error);
    }
  })

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} className="d-flex">
        <Modal.Body className='login-modal'>
          <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <h3 className='label-login'>LOGIN</h3>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="input"
                placeholder="Username/Email"
                name="email"
                onChange={handleOnChange}
                className='input-login border border-dark'
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="password"
                name="password"
                onChange={handleOnChange}
                placeholder="Password"
                className='input-login border border-dark'
                autoFocus
              />
            </Form.Group>
            <div className='d-flex'>

            <Button className='button-login' type="submit" onClick={props.handleClose}>
              Login
            </Button>
            </div>
            <div className='d-flex text-belum-login'>

            <p>Belum Punya Akun ? klik <b>disini</b></p>
            </div>
           
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

export default ModalLogin