import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const baseURL = "https://localhost:44368/api/login";
  const infoCliente = "https://localhost:44368/api/cliente";
  const infoProfesionista = "https://localhost:44368/api/profesionista";
  const URLLogs = "https://localhost:44368/api/logs";

  const cookies = new Cookies();
  const navigate = useNavigate();

  const [logs, setLogs] = useState({
    fecha: new Date(),
    descripcion: "Inicio de Sesion",
    idUsuario: 0,
  });

  const [inicioSesion, setInicioSesion] = useState({
    correo: "",
    contrasenia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInicioSesion({
      ...inicioSesion,
      [name]: value,
    });
    console.log(inicioSesion);
  };

  const iniciarSesion = async () => {
    await axios
      .post(baseURL, inicioSesion)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set("idUsuario", respuesta.idUsuario, { path: "/" });
          cookies.set("nombre", respuesta.nombre, { path: "/" });
          cookies.set("apellidoPaterno", respuesta.apellidoPaterno, {
            path: "/",
          });
          cookies.set("apellidoMaterno", respuesta.apellidoMaterno, {
            path: "/",
          });
          cookies.set("Rol", respuesta.idRol, { path: "/" });
          cookies.set("correo", respuesta.correo, { path: "/" });
          cookies.set("contraseña", respuesta.contrasenia, { path: "/" });
          if (cookies.get("Rol") == 2) {
            axios
              .get(infoCliente + "?id=" + respuesta.idUsuario)
              .then((response) => {
                return response.data;
              })
              .then((response) => {
                if (response.length > 0) {
                  var respuestaCliente = response[0];
                  console.log("es un cliente");
                  console.log(respuestaCliente);
                  cookies.set("idCliente", respuestaCliente.idCliente, {
                    path: "/",
                  });
                  setLogs({
                    idUsuario: cookies.get("idUsuario"),
                  });
                  postLogs().catch((error) => {
                    console.log(error);
                  });
                  navigate("/Inicio");
                }
              });
          }
          if (cookies.get("Rol") == 3) {
            axios
              .get(infoProfesionista + "?id=" + respuesta.idUsuario)
              .then((response) => {
                return response.data;
              })
              .then((response) => {
                if (response.length > 0) {
                  var respuestaProfesionista = response[0];
                  console.log("es un profesionista");
                  cookies.set(
                    "idProfesionista",
                    respuestaProfesionista.idProfesionista,
                    { path: "/" }
                  );
                  cookies.set(
                    "idProfesion",
                    respuestaProfesionista.idProfesion,
                    { path: "/" }
                  );
                  cookies.set(
                    "descripcion",
                    respuestaProfesionista.descripcion,
                    { path: "/" }
                  );
                  setLogs({
                    idUsuario: cookies.get("idUsuario"),
                  });
                  postLogs().catch((error) => {
                    console.log(error);
                  });
                  navigate("/GestionarImagenes");
                }
              });
          }
          if (cookies.get("Rol") == 1) {
            setLogs({
              idUsuario: cookies.get("idUsuario"),
            });
            postLogs().catch((error) => {
              console.log(error);
            });
            navigate("/GestionUsuarios");
          }
        }
      });
  };

  const postLogs = async () => {
    await axios
      .post(URLLogs, logs)
      .then((response) => {
        if (response) {
          return;
        }
      })
      .catch((error) => {});
  };

  const handleNewClienteRegister = (e) => {
    navigate("/RegistrarCliente");
  };
  const handleNewProfesionistaRegister = (e) => {
    navigate("/RegistrarProfesionista");
  };
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <h2 style={{ textAlign: "center" }}>Bienvenido a Service Finder</h2>
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Email address
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
                  Password
                </label>
                <input
                  type="password"
                  name="contrasenia"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={() => {
                  iniciarSesion();
                }}
              >
                Iniciar Sesion
              </button>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={handleNewClienteRegister}
              >
                Registrarse como Cliente
              </button>
              <br />
              <br />
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={handleNewProfesionistaRegister}
              >
                Registrarse como Profesionista
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
