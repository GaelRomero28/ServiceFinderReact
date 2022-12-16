import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import axios from "axios";
import star from "../assets/star.png"
import Cookies from "universal-cookie"

const ReseniasHechas = () => {
    const [datosResenias,setDatosResenias] = useState([]);
    const cookies = new Cookies();
    const [dataProfesionista,setDataProfesionista] = useState([]);
  
    const listarResenias = "https://localhost:44368/api/resena";
    const listarProfesionista = "https://localhost:44368/api/profesionista";
  
    const peticionGetReseniasHechas= async()=>{
      await axios.get(listarResenias +"?id=" + cookies.get("idCliente"))
      .then((response) => {
        setDatosResenias(response.data);
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
        getProfesionistas();
        peticionGetReseniasHechas();
      }, []);

      const asignarProfesionista = (id) =>{
    
        let prof = dataProfesionista.find(profesionista => profesionista.idProfesionista === id)
        return prof.nombre + " " + prof.apellidoPaterno + " "
      }
    return (
      <>
      <NavBar></NavBar>
      {datosResenias.map((resenias) =>(
      <div key={resenias.idResena}>
        <div class="card text-left">
          <img class="card-img-top" src="holder.js/100px180/" alt=""/>
          <div class="card-body">
            <h4 class="card-title">{asignarProfesionista(resenias.idProfesionista)}<b>{resenias.calificacion} </b><img width={30} src={star}></img></h4>
            <p class="card-text">Comentario Hecho: {resenias.comentario}</p>
          </div>
        </div>
      </div>
      ))}



  
      </>
    )
}

export default ReseniasHechas