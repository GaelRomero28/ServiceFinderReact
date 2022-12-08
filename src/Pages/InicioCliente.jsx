import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import profile from "../assets/profile.png";
import Cookies from "universal-cookie";

const Menu = () => {
  const cookies = new Cookies()

  const listarProfesionista = "https://localhost:44368/api/profesionista";
  const resenias = "https://localhost:44368/api/resena"
  const [data, setData] = useState([]);
  const [dataResenia,setDataResenia] = useState({
    nombre:"",
    apellidoPaterno:"",
    apellidoMaterno:"",
    idProfesionista:0
  });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [resenaSeleccionada, setResenaSeleccionada] = useState({
    idCliente: 0,
    idProfesionista: 0,
    comentario: "",
    calificacion: 0,
  });

  const abrirCerrarModalInsertar = (id) => {
    getProfesionistaPorId(id);
    console.log(id)
    setModalInsertar(!modalInsertar);
  };

  const getProfesionistas = async () => {
    await axios
      .get(listarProfesionista)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProfesionistaPorId = async(id)=>{
    await axios
     .get(listarProfesionista + "?id=" + id)
     .then((respuesta) => {
      setDataResenia(
        {nombre: respuesta.data[0].nombre,
        apellidoPaterno: respuesta.data[0].apellidoPaterno,
        apellidoMaterno: respuesta.data[0].apellidoMaterno,
        idProfesionista: respuesta.data[0].idProfesionista
      });
      setResenaSeleccionada({
        idProfesionista: respuesta.data[0].idProfesionista,
        idCliente: cookies.get("idCliente")
      })
      console.log(dataResenia)
     })
     .catch((error) => {
       console.log(error);
     });
   };

   const peticionPostResenia=async()=>{
    await axios.post(resenias, resenaSeleccionada)
    .then(response=>{
      console.debug(response)
      if(response){
        Swal.fire(
          'Operación realizada',
          'Reseña Hecha con Exito!',
          'success'
        )
        return;
      }
    }).catch((error) => {
      console.log(error)
      Swal.fire(
        'Error',
        'Se produjo un error al insertar la información, por favor, intente de nuevo.',
        'error'
      )
    })
    abrirCerrarModalInsertar();
    peticionGet();
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResenaSeleccionada({
      ...resenaSeleccionada,
      [name]: value,
    });
    console.log(resenaSeleccionada);
  };

  useEffect(() => {
    getProfesionistas();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      {data.map((profesionista) => (
        <div className="row" key={profesionista.idUsuario} style={{marginLeft:"100px",marginRight:"100px"
        ,marginTop:"10px", backgroundColor:"#e6e6e6"}}>
            <div
            className="card"
            style={{ backgroundColor:"#e6e6e6"}}
          >
            <br />
            <div className="card-body">
              <h1 className="card-title" >
              <img className="card-image" src={profile} height={200} width={200} />
              <div style={{float:"right",padding:"10px"}}>
              <div className="col-4">
                <button className="btn btn-secondary btn-rounded">Ver Calificaciones</button>
                </div>
              </div>
              <div style={{float:"right",padding:"10px"}}>
                <div className="col-4">
                <button className="btn btn-secondary btn-rounded"
                onClick={() => abrirCerrarModalInsertar(profesionista.idUsuario)}>
                Calificar</button>
                </div>
              </div>
              <p>
              {" " +
                profesionista.nombre +
                " " +
                profesionista.apellidoPaterno +
                " " +
                profesionista.apellidoMaterno}
              </p>
              </h1>
              <h3>Profesión: {profesionista.idProfesion}
                  <button style={{float:"right"}} className="btn btn-secondary btn-rounded">Ver trabajos realizados</button>
              </h3>
            </div>
          </div>
          <hr />
          </div>
      
      ))}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Calificar a {dataResenia.nombre + " " + dataResenia.apellidoPaterno
        + " " + dataResenia.apellidoMaterno}
        <br />
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="calificacion">Calificacion</label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              name="calificacion"
            />
            <br />
            <label htmlFor="comentario">Comentario</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="comentario"
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPostResenia()}>
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
    </>
  );
};

export default Menu;
