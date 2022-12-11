import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import axios from "axios";
import star from "../assets/star.png"

const ReseniasProfesionista = () => {
  const {idProf} = useParams();
  const [datosResenias,setDatosResenias] = useState([]);
  console.log(idProf)

  const listarReseniasProfesionista = "https://localhost:44368/api/resena";

  const peticionGetReseniasProf= async()=>{
    await axios.get(listarReseniasProfesionista+"?idProf=" + idProf)
    .then((response) => {
      setDatosResenias(response.data);
      console.log(response.data)
    }).catch(error=>{
        console.log(error)
    })
    }

    useEffect(() => {
      peticionGetReseniasProf();
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

export default ReseniasProfesionista