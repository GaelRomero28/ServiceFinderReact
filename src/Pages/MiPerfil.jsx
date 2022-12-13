import React,{useEffect, useState} from 'react'
import NavBar from '../Components/Navbar'
import Cookies from "universal-cookie";
import axios from "axios";
import profile from "../assets/profile.png";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2"

const MiPerfil = () => {
    const cookies = new Cookies();
    const [data, setData] =useState([]);
    const baseURL = "https://localhost:44368/api/cliente";
    const [modalEditar, setModalEditar]=useState(false);
    const [usuarioSeleccionado,setUsuarioSeleccionado] = useState({
        idUsuario: cookies.get("idUsuario"),
        nombre:"",
        apellidoPaterno: "",
        apellidoMaterno: "",
        correo: "",
        contrasenia: ""
      })

    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }

      const SeleccionarUsuario = (usuario, caso) => {
        setUsuarioSeleccionado(usuario);
        (caso === "Editar") ?
          abrirCerrarModalEditar() : abrirCerrarModalEliminar();
      }

    const peticionGet= async()=>{
        await axios.get(baseURL, "?id=", cookies.get("idUsuario"))
        .then((response) => {
            setData(response.data);
            console.log(response.data)
        }).catch(error=>{
            console.log(error)
        })
        }

        const handleChange=e=>{
            const{name,value} = e.target;
            setUsuarioSeleccionado({
              ...usuarioSeleccionado,
              [name]: value
            });
          }

          const peticionPut=async()=>{
            await axios.put(baseURL,usuarioSeleccionado)
            .then(response=>{
              if(response){
                Swal.fire(
                  'Operación realizada',
                  'Informacion modificada correctamente!',
                  'success'
                )
              }
            }).catch(error=>{
              console.log(error);
              Swal.fire(
                'Error',
                'Se produjo un error al modificar la información, por favor, intente de nuevo.',
                'error'
              )
            })
            peticionGet();
            abrirCerrarModalEditar();
          }

useEffect(() => {
    peticionGet()
}, [])


  return (
    <>
        <NavBar></NavBar>
        <img src={profile} alt="" width={200}/>
        <br />
        <br />
        {data.map((usuario) => (
            <div key={usuario.idCliente}>
        <button className='btn btn-warning btn-rounded btn-lg'
        style={{float:"right", marginRight:"20px"}}
        onClick={() => SeleccionarUsuario(usuario, "Editar")}>Editar</button>{"  "}
            <h1>Nombre: {usuario.nombre}</h1>
            <br />
            <h1>Apellido Paterno: {usuario.apellidoPaterno}</h1>
            <br />
            <h1>Apellido Materno: {usuario.apellidoMaterno}</h1>
            <br />
            <h1>Correo: {usuario.correo}</h1>
            <br />
            <h1>Contraseña: {" "}
                <input style={{border:"0"}} type="password" value={usuario.contrasenia} /></h1>
            </div>
        ))}

        <Modal isOpen={modalEditar}>
            <ModalHeader>Editar mis Datos</ModalHeader>
            <ModalBody>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" className='form-control' onChange={handleChange} name="nombre"
                defaultValue={usuarioSeleccionado.nombre } />
                <br />
                <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                <input type="text" className='form-control' onChange={handleChange} name="apellidoPaterno"
                defaultValue={usuarioSeleccionado.apellidoPaterno } />
                <br />
                <label htmlFor="apellidoMaterno">Apellido Materno</label>
                <input type="text" className='form-control' onChange={handleChange} name="apellidoMaterno"
                defaultValue={usuarioSeleccionado.apellidoMaterno } />
                <br />
                <label htmlFor="correo">Correo</label>
                <input type="text" className='form-control' onChange={handleChange} name="correo"
                defaultValue={usuarioSeleccionado.correo } />
                <br />
                <label htmlFor="contrasenia">Contraseña</label>
                <input type="text" className='form-control' onChange={handleChange} name="contrasenia"
                defaultValue={usuarioSeleccionado.contrasenia } />
                <br />
                </div>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default MiPerfil