import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import axios from "axios";
import star from "../assets/star.png"
import Cookies from "universal-cookie"

const ReseniasHechas = () => {
    const [datosResenias,setDatosResenias] = useState([]);
    const cookies = new Cookies();
  
    const listarResenias = "https://localhost:44368/api/resena";
  
    const peticionGetReseniasHechas= async()=>{
      await axios.get(listarResenias +"?id=" + cookies.get("idCliente"))
      .then((response) => {
        setDatosResenias(response.data);
        console.log(response.data)
      }).catch(error=>{
          console.log(error)
      })
      }
  
      useEffect(() => {
        peticionGetReseniasHechas();
      }, []);
    return (
      <>
      <NavBar></NavBar>
      <table className='table table-bordered' style={{padding:"10px", marginTop:"10px"}}>
          <thead>
              <th>Calificacion</th>
              <th>Comentarios</th>            
          </thead>
          <tbody>
            {datosResenias.map((resenias) =>(
              <tr key={resenias.idResena}>
                <td><b>{resenias.calificacion}</b><img width={30} src={star}></img></td>
                <td>{resenias.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
      </>
    )
}

export default ReseniasHechas