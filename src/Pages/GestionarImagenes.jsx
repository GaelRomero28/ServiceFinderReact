import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import Cookies from "universal-cookie";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2"

const GestionarImagenes = () => {
    const cookies = new Cookies()
    //cookies.get("idProfesionista")
    const baseURL = "https://localhost:44368/api/imagen";
    const [modalInsertar,setModalInsertar]= useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState({
        idImagen:0,
        idProfesionista: 0,
        _imagen:""
      });
    const [imgs, setImgs] = useState([]);

    const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEliminar = () => {
      setModalEliminar(!modalEliminar);
    }

    const seleccionarImagen = (img, caso) => {
      setImagenSeleccionada(img);
      (caso === "Editar") ?
        abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    }

    const peticionGetImagenes= async()=>{
    await axios.get(baseURL+"?id=" + cookies.get("idProfesionista"))
    .then((response) => {
      setImgs(response.data);
      console.log(response.data)
    }).catch(error=>{
        console.log(error)
    })
    }

    const peticionDeleteImagen = async () => {
      await axios.delete(baseURL+ "?id=" + imagenSeleccionada.idImagen)
        .then(response => {
          if(response){
            Swal.fire(
              'Operación realizada',
              'Servicio eliminado correctamente!',
              'success'
            )
            peticionGetImagenes();
          }
        }).catch(error => {
          console.log(error);
          Swal.fire(
            'Error',
            'Se produjo un error al eliminar la información, por favor, intente de nuevo.',
            'error'
          )
        })
        abrirCerrarModalEliminar();
        peticionGet();
    }
  
    

    const _handleReaderLoaded = e => {
      console.log("file uploaded 2: ", e);
      let binaryString = e.target.result;
      console.log("este es base64?",btoa(binaryString))

      setImagenSeleccionada({
        idProfesionista: cookies.get("idProfesionista"),
        _imagen: btoa(binaryString)
      })

      console.log("AQUI VAMOS A VER SI SE GUARDO O NO",imagenSeleccionada)
    };

    const onChange = (e) => {
      console.log("file uploaded: ", e.target.files[0]);
      let file = e.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = _handleReaderLoaded.bind();
        reader.readAsBinaryString(file);

      }};
      
    const peticionPostImagenes = async() =>{
      await axios.post(baseURL,imagenSeleccionada)
      .then(response=>{
        console.debug(response)
        if(response){
          Swal.fire(
            'Operación realizada',
            'Imagen Guardada correctamente!',
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
      peticionGetImagenes();
    }
    
      useEffect(() => {
        peticionGetImagenes();
      }, []);
    
  return (
    <>
    <NavBar></NavBar>
    <br />
      <button style={{float:"right",marginTop:"-10px",marginRight:"10px"}} onClick={()=>abrirCerrarModalInsertar()} className="btn btn-primary btn-lg btn-block">Insertar Nueva Reseña</button>
      <br />
      <br />
      <table className='table table-bordered'>
        <thead>
            <th>Imagen</th>
            <th>Acciones</th>            
        </thead>
        <tbody>
          {imgs.map((img) =>(
            <tr key={img.idImagen}>
              <td>
                <img src={`data:image/png;base64,${img._Imagen}`}  width={300} height={200}/>
              </td>
              <td>
              <button className='btn btn-danger' onClick={() => seleccionarImagen(img, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar una Nueva Imagen</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label htmlFor="imagen">Seleccione una Imagen</label>
            <input type="file" 
            className='form-control'
            onChange={e=>onChange(e)}
            name="imagen"
            accept='.jpeg, .png, .jpg'/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>peticionPostImagenes()}>Insertar</button>{"  "}
          <button className='btn btn-danger' onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>{"  "}
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar Esta Imagen?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDeleteImagen()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default GestionarImagenes