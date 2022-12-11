import React from 'react'
import { NavLink } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom"

const NavBar = (props) => {

  const cookies = new Cookies();
  const navigate = useNavigate();


  const CerrarSesion = () =>{
    cookies.remove('idUsuario',{path:'/'});
    cookies.remove('nombre',{path:'/'});
    cookies.remove('apellidoPaterno',{path:'/'});
    cookies.remove('apellidoMaterno',{path:'/'});
    cookies.remove('Rol',{path:'/'});
    cookies.remove('correo',{path:'/'});
    cookies.remove('contraseña',{path:'/'});
    cookies.remove("idCliente",{path:'/'})
    console.log("es un profesionista")
    cookies.remove("idProfesionista")
    cookies.remove("idProfesion")
    cookies.remove("descripcion")
    navigate("/")
    
  }
  
  function AsignarNavbar(){
    if(cookies.get("Rol") ==1 ){
      return(<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
          <h4 className="navbar-brand">ServiceFinder</h4>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <b><NavLink className="nav-link active" aria-current="page" to="/GestionSolicitudes" >Gestion de Solicitudes</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/GestionDeudas" >Gestion de Deudas</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/GestionUsuarios" >Gestion de Usuarios</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/GestionProfesiones" >Gestion de Profesiones</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/GestionReseñas" >Gestion de Reseñas</NavLink></b>
                </li>
              </ul>
                <button className="btn btn-light" onClick={() => CerrarSesion()}>Cerrar Sesion</button>
            </div>
          </div>
        </nav>
      </>)
    }
    if(cookies.get("Rol") ==2 ){ //Navbar Cliente
      return(<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
          <h4 className="navbar-brand">ServiceFinder</h4>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <b><NavLink className="nav-link active" aria-current="page" to="/Inicio" >Servicios</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/SolicitudesEnviadas" >Mensajes Enviados</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/ReseniasHechas" >Reseñas Realizadas</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/MiPerfil" >MiPerfil</NavLink></b>
                </li>
              </ul>
                <button className="btn btn-light" onClick={() => CerrarSesion()}>Cerrar Sesion</button>
            </div>
          </div>
        </nav>
              </>)
    }
    if(cookies.get("Rol") == 3 ){ //Navbar Profesionista
      return(<>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
          <h4 className="navbar-brand">ServiceFinder</h4>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <b><NavLink className="nav-link active" aria-current="page" to="/SolicitudesRecibidas" >Solicitudes Recibidas</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/ReseniasRecibidas" >Reseñas Recibidas</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/GestionarImagenes" >Gestion de Imagenes</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/Deudas" >Deudas</NavLink></b>
                </li>
                <li className="nav-item">
                <b><NavLink className="nav-link active" aria-current="page" to="/MiPerfil" >MiPerfil</NavLink></b>
                </li>
              </ul>
                <button className="btn btn-light" onClick={() => CerrarSesion()}>Cerrar Sesion</button>
            </div>
          </div>
        </nav>
              </>)
    }
  }
  
  return (
    <>
      {AsignarNavbar()}
    </>
  )
}

export default NavBar