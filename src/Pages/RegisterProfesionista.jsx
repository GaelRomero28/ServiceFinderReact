import React, {useState} from 'react'
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const RegisterProfesionista = () => {

  const baseURL = "https://localhost:44368/api/profesionista";

    const navigate = useNavigate();
    const [profesionista,setProfesionista] = useState({
      idUsuario:0,
      nombre:"",
      apellidoPaterno:"",
      apellidoMaterno: "",
      correo: "",
      contrasenia: "",
      descripcion: "",
      idProfesion: 1,
    })

    const Registrarse = async() =>{
      delete profesionista.idUsuario;
      await axios.post(baseURL,profesionista)
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

    

    const handleChange=e=>{
      const{name,value} = e.target;
      setProfesionista({
        ...profesionista,
        [name]: value
      });
      console.log(profesionista)
    }

    const validateInputs = () =>{
      if(profesionista.nombre.length === 0 || profesionista.apellidoMaterno.length === 0|| 
      profesionista.apellidoPaterno.length === 0|| profesionista.correo.length === 0|| profesionista.contrasenia.length === 0 ||
      profesionista.descripcion.length === 0 || profesionista.idProfesion == 0){
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

  return (
    <>
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-50">
        <h2 style={{textAlign:"center"}}>Registrarse como Profesionista</h2>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
              </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
              </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  name="correo"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="contrasenia"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Profesion
                </label>
                <select
                  type="text"
                  name="profesion"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                >
                  <option value={1}>Capintero</option>
                </select>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Acerca de mi
                </label>
                <textarea
                  type="text"
                  name="descripcion"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block"
              onClick={() => validateInputs()}>
                Registrarse
              </button>
          </div>
        </div>
    </section>
  </>
  )
}

export default RegisterProfesionista