import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import profile from "../assets/profile.png";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import star from "../assets/star.png";

const Menu = (props) => {
  const cookies = new Cookies();

  const listarProfesionista = "https://localhost:44368/api/profesionista";
  const resenias = "https://localhost:44368/api/resena";
  const URLImagenes = "https://localhost:44368/api/imagen";
  const profesionesURL = "https://localhost:44368/api/profesion";
  const solicitud = "https://localhost:44368/api/solicitud";
  const URLLogs = "https://localhost:44368/api/logs";
  const [imagenes, setImagenes] = useState([]);
  const [dataProfesion, setDataProfesion] = useState({
    profesion: "",
  });
  const [profesiones, setProfesiones] = useState([]);
  const [data, setData] = useState([]);
  const [dataResenia, setDataResenia] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    idProfesionista: 0,
  });
  const [dataSolicitud, setDataSolicitud] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    idProfesionista: 0,
  });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalImagenes, setmModalImagenes] = useState(false);
  const [modalContactar, setModalContactar] = useState(false);
  const [resenaSeleccionada, setResenaSeleccionada] = useState({
    idCliente: 0,
    idProfesionista: 0,
    comentario: "",
    calificacion: 0,
  });
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState({
    idCliente: 0,
    idProfesionista: 0,
    descripcion: "",
    telefono: "",
    idEstatus: 1,
    fechaSolicitud: new Date(),
  });

  const [logs, setLogs] = useState({
    fecha: new Date(),
    descripcion: " ",
    idUsuario: 0,
  });

  const abrirCerrarModalInsertar = (id) => {
    getProfesionistaPorId(id);
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalContactar = (id) => {
    getProfesionistaPorIdSoli(id);
    setModalContactar(!modalContactar);
  };

  const abrirCerrarModalImagenes = (id) => {
    getImagenesProfesionista(id);
    setmModalImagenes(!modalImagenes);
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

  const getProfesionistas = async () => {
    await axios
      .get(listarProfesionista)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProfesionistaPorId = async (id) => {
    await axios
      .get(listarProfesionista + "?id=" + id)
      .then((respuesta) => {
        setDataResenia({
          nombre: respuesta.data[0].nombre,
          apellidoPaterno: respuesta.data[0].apellidoPaterno,
          apellidoMaterno: respuesta.data[0].apellidoMaterno,
          idProfesionista: respuesta.data[0].idProfesionista,
        });
        setResenaSeleccionada({
          idProfesionista: respuesta.data[0].idProfesionista,
          idCliente: cookies.get("idCliente"),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProfesionistaPorIdSoli = async (id) => {
    await axios
      .get(listarProfesionista + "?id=" + id)
      .then((resp) => {
        setDataSolicitud({
          nombre: resp.data[0].nombre,
          apellidoPaterno: resp.data[0].apellidoPaterno,
          apellidoMaterno: resp.data[0].apellidoMaterno,
          idProfesionista: resp.data[0].idProfesionista,
        });
        setSolicitudSeleccionada({
          idProfesionista: resp.data[0].idProfesionista,
          idCliente: cookies.get("idCliente"),
          fechaSolicitud: new Date(),
          idEstatus: 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getImagenesProfesionista = async (id) => {
    await axios
      .get(URLImagenes + "?id=" + id)
      .then((response) => {
        setImagenes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPostResenia = async () => {
    await axios
      .post(resenias, resenaSeleccionada)
      .then((response) => {
        console.debug(response);
        if (response) {
          Swal.fire(
            "Operación realizada",
            "Reseña Hecha con Exito!",
            "success"
          );
          setLogs({
            idUsuario: cookies.get("idUsuario"),
            descripcion: "Registro una reseña",
          });
          postLogs().catch((error) => {
            console.log(error);
          });
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Error",
          "Se produjo un error al insertar la información, por favor, intente de nuevo.",
          "error"
        );
      });
    abrirCerrarModalInsertar();
    peticionGet();
  };

  const peticionPostSolicitud = async () => {
    await axios
      .post(solicitud, solicitudSeleccionada)
      .then((response) => {
        console.debug(response);
        if (response) {
          Swal.fire(
            "Operación realizada",
            "Solicitud Enviada con Exito!",
            "success"
          );
          setLogs({
            idUsuario: cookies.get("idUsuario"),
            descripcion: "Peticion de Solicitud",
          });
          postLogs().catch((error) => {
            console.log(error);
          });
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Error",
          "Se produjo un error al insertar la información, por favor, intente de nuevo.",
          "error"
        );
      });
    abrirCerrarModalContactar();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResenaSeleccionada({
      ...resenaSeleccionada,
      [name]: value,
    });
    console.log(resenaSeleccionada);
  };

  const handleChangeSolicitud = (e) => {
    const { name, value } = e.target;
    setSolicitudSeleccionada({
      ...solicitudSeleccionada,
      [name]: value,
    });
    console.log(solicitudSeleccionada);
  };

  useEffect(() => {
    getProfesionistas();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      {data.map((profesionista) => (
        <div
          className="row"
          key={profesionista.idUsuario}
          style={{
            marginLeft: "100px",
            marginRight: "100px",
            marginTop: "10px",
            backgroundColor: "#e6e6e6",
          }}
        >
          <div className="card" style={{ backgroundColor: "#e6e6e6" }}>
            <br />
            <div className="card-body">
              <h1 className="card-title">
                <div>
                  <img src={profile} alt="User" width={150} />
                  <Link
                    to={`/ReseniasProfesionista/${profesionista.idProfesionista}`}
                    style={{ marginLeft: "20px" }}
                  >
                    <button className="btn btn-info btn-rounded btn-lg">
                      Ver Calificaciones
                    </button>
                  </Link>
                  <button
                    className="btn btn-warning btn-rounded btn-lg"
                    style={{ marginLeft: "20px" }}
                    onClick={() =>
                      abrirCerrarModalInsertar(profesionista.idUsuario)
                    }
                  >
                    Calificar
                  </button>
                  <button
                    className="btn btn-secondary btn-rounded btn-lg"
                    style={{ marginLeft: "20px" }}
                    onClick={() =>
                      abrirCerrarModalImagenes(profesionista.idProfesionista)
                    }
                  >
                    Ver trabajos realizados
                  </button>
                  <button
                    className="btn btn-primary btn-rounded btn-lg"
                    style={{ marginLeft: "20px" }}
                    onClick={() =>
                      abrirCerrarModalContactar(profesionista.idUsuario)
                    }
                  >
                    Contactar
                  </button>
                </div>
                <div style={{ float: "right", padding: "10px" }}></div>
                <div style={{ float: "right", padding: "10px" }}></div>
                <p>
                  {" " +
                    profesionista.nombre +
                    " " +
                    profesionista.apellidoPaterno +
                    " " +
                    profesionista.apellidoMaterno}
                </p>
              </h1>
              <h3>Profesion</h3>
            </div>
          </div>
          <hr />
        </div>
      ))}

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          Calificar a{" "}
          {dataResenia.nombre +
            " " +
            dataResenia.apellidoPaterno +
            " " +
            dataResenia.apellidoMaterno}
          <br />
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="calificacion">Calificacion:</label>

            <img width={30} src={star}></img>
            <input
              style={{ marginTop: "10px", marginBottom: "1px" }}
              type="number"
              className="col-sx-2"
              onChange={handleChange}
              name="calificacion"
              min={1}
              max={5}
            />
            <br />
            <br />
            <label htmlFor="comentario">Comentario</label>
            <textarea
              type="text"
              className="form-control"
              onChange={handleChange}
              name="comentario"
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary"
            onClick={() => peticionPostResenia()}
          >
            Insertar
          </button>
          {"  "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancelar
          </button>
          {"  "}
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalImagenes}>
        <ModalHeader>Trabajos del Profesionista</ModalHeader>
        <ModalBody>
          {imagenes.map((img) => (
            <div className="container">
              <img
                class="row"
                width={400}
                src={`data:image/png;base64,${img._Imagen}`}
                alt="Trabajos del Profesionista"
              />
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalImagenes()}
          >
            Cerrar
          </button>
          {"  "}
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalContactar}>
        <ModalHeader>
          Enviar Solicitud a{" "}
          {dataSolicitud.nombre +
            " " +
            dataSolicitud.apellidoPaterno +
            " " +
            dataSolicitud.apellidoMaterno}
          <br />
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="telefono">Escriba su Telefono</label>
            <input
              style={{ marginTop: "10px", marginBottom: "1px" }}
              type="text"
              className="form-control"
              onChange={handleChangeSolicitud}
              name="telefono"
            />
            <br />
            <label htmlFor="descripcion">Descripcion del Problema</label>
            <textarea
              type="text"
              className="form-control"
              onChange={handleChangeSolicitud}
              name="descripcion"
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary"
            onClick={() => peticionPostSolicitud()}
          >
            Enviar Mensaje
          </button>
          {"  "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalContactar()}
          >
            Cancelar
          </button>
          {"  "}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Menu;
