import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import axios from "axios";
import star from "../assets/star.png"
import Cookies from "universal-cookie"

const SolicitudesEnviadas = () => {
    const [datosSolicitudes,setDatosSolicitudes] = useState([]);
    const cookies = new Cookies();

    const listasSolicitudes = "https://localhost:44368/api/solicitud";
    const listarProfesionista = "https://localhost:44368/api/profesionista";

    const [dataProfesionista,setDataProfesionista] = useState([]);
    
    const peticionGetSolicitudesEnviadas= async()=>{
        await axios.get(listasSolicitudes +"?idCte=" + cookies.get("idCliente"))
        .then((response) => {
            setDatosSolicitudes(response.data);
          console.log(response.data)
        }).catch(error=>{
            console.log(error)
        })
        }
      
        
      const getProfesionistas = ()=>{
        axios
       .get(listarProfesionista)
       .then((respuesta) => {
        setDataProfesionista(respuesta.data)
        console.log(respuesta.data)
      })
       .catch((error) => {
         console.log(error);
       });
     };

      
      
    
    useEffect(() => {
        peticionGetSolicitudesEnviadas();
        getProfesionistas();
    }, []);

    const asignarProfesionista = (id) =>{
    
      let prof = dataProfesionista.find(profesionista => profesionista.idProfesionista === id)
      return prof.nombre + " " + prof.apellidoPaterno + " "
    }

    function ValidarEstatus(id){
        switch(id){
            case 1:
                return "Solictud Enviada"    
            case 2:
                return "En negociacion"
            case 3:
                return "Aceptada"
            case 4:
                return "Cancelada"
            case 5:
                return "Finalizado"
            
        }
    }


  return (
    <>
        <NavBar></NavBar>
        <table className='table table-bordered' style={{padding:"10px", marginTop:"10px"}}>
          <thead>
              <th>Profesionista</th>
              <th>Fecha</th>
              <th>Telefono</th>            
              <th>descripcion del Problema</th>            
              <th>Estatus</th>            
          </thead>
          <tbody>
            {datosSolicitudes.map((solicitudes) =>(
              <tr key={solicitudes.idSolicitud}>
                <td>{asignarProfesionista(solicitudes.idProfesionista)}</td>
                <td>{solicitudes.fechaSolicitud}</td>
                <td>{solicitudes.telefono}</td>
                <td>{solicitudes.descripcion}</td>
                <td>{ValidarEstatus(solicitudes.idEstatus)}</td>
              </tr>
            ))}
          </tbody>
        </table>
  

    </>
  )
}

export default SolicitudesEnviadas