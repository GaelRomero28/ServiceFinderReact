import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/Navbar'
import axios from "axios"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const GestionUsuario = () => {
    const URLUsuarios = "https://localhost:44368/api/usuario"
    const [usuarios, setUsuarios] = useState([])
    const [modalEliminar, setModalEliminar] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionada] = useState({
      idUsuario:0
    });
    

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
      }

    const peticionGetUsuarios = async()=>{
        await axios.get(URLUsuarios)
        .then((response) => {
            setUsuarios(response.data);
        }).catch(error=>{
            console.log(error)
        })
        }

      const peticionDeleteUsuario = async () => {
          await axios.delete(URLUsuarios + "?idUsuario=" + usuarioSeleccionado.idUsuario)
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
            peticionGetUsuario();
        }

    const seleccionarUsuario = (usuario, caso) => {
      setUsuarioSeleccionada(usuario);
      (caso === "Editar") ?
        abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    }

    function validarRol (id){
        switch(id){
            case 1:
                return "Admin"
            case 2:
                return "Cliente"
            case 3:
                return "Profesionista"
        }
    }

    useEffect(() => {
        peticionGetUsuarios();
        }, []);

  return (
    <>
        <NavBar></NavBar>
        <table className='table table-bordered'>
        <thead>
            <th>idUsuario</th>
            <th>Nombre</th>            
            <th>Apellido Paterno</th>            
            <th>Apellido Materno</th>            
            <th>Correo</th>
            <th>Tipo Usuario</th>
            <th>Acciones</th>
        </thead>
        <tbody>
          {usuarios.map((usuario) =>(
            <tr key={usuario.idUsuario}>
              <td>{usuario.idUsuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellidoPaterno}</td>
              <td>{usuario.apellidoMaterno}</td>
              <td>{usuario.correo}</td>
              <td>{validarRol(usuario.idRol)}</td>
              <td>
              <button className='btn btn-danger' onClick={() => seleccionarUsuario(usuario, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar a este Usuario?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDeleteUsuario()}>
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

export default GestionUsuario