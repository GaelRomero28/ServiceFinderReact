import React, {useState} from 'react'
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const RegisterCliente = () => {
  const baseURL = "https://localhost:44368/api/Cliente";
    const navigate = useNavigate();
    const [cliente,setCliente] = useState({
      idUsuario:0,
      nombre:"",
      apellidoPaterno:"",
      apellidoMaterno: "",
      correo: "",
      contrasenia: "",
      idRol:2
    })

    const handleChange=e=>{
      const{name,value} = e.target;
      setCliente({
        ...cliente,
        [name]: value
      });
      console.log(cliente)
    }

    const validateInputs = () =>{
      if(cliente.nombre.length === 0 || cliente.apellidoMaterno.length === 0|| 
      cliente.apellidoPaterno.length === 0|| cliente.correo.length === 0|| cliente.contrasenia.length === 0){
        Swal.fire({
          text: ' Faltan campos por rellenar, favor de validar su informacion.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        })
      }
      else{
        Registrarse();
      }
    }


    const Registrarse = async() =>{
      delete cliente.idUsuario;
      await axios.post(baseURL,cliente)
      .then(response => {
        console.debug(response)
        if(response){
          Swal.fire({
            text: 'Registro Hecho con Exito, por favor inicie sesion',
            icon: 'success',
            confirmButtonText: 'Entendido'
          })
          navigate("/")    
        }
      })
      .catch(error=>{
        console.log(error);
        Swal.fire({
          text: 'Se produjo un error al ingresar la información, por favor, intente de nuevo.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        })
      })
    }

  return (
    <>
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-50">
        <h2 style={{textAlign:"center"}}>Registrarse como Cliente</h2>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                  required 
                />
              </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                  required 
                />
              </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  name="correo"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="contrasenia"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block"
              onClick={() => {validateInputs()}}>
                Registrarse
              </button>
          </div>
        </div>
    </section>
  </>
  )
}

export default RegisterCliente