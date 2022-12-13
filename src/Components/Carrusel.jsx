import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import profile from "../assets/profile.png";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import {
    MDBCarousel,
    MDBCarouselItem,
  } from 'mdb-react-ui-kit';

const Carrusel = (idProfesionista) => {
    const [imagenes, setImagenes] = useState([]);
    const URLImagenes = "https://localhost:44368/api/imagen";

    const getImagenesProfesionista = async()=>{
        await axios.get(URLImagenes+"?id=" + idProfesionista.idProfesionista)
        .then((response) => {
          setImagenes(response.data);
          console.log("imagenes del usuario: "+idProfesionista.idProfesionista ,response.data);
        }).catch(error=>{
            console.log(error)
        })
      };

      useEffect(() => {
        getImagenesProfesionista();
      }, []);

  return (
    <MDBCarousel showIndicators showControls fade>

    {imagenes.map((imagen) =>(
        
        <MDBCarouselItem
        key={imagen.idImagen}
        className='w-100 d-block'
        itemId={imagen.idImagen}
        src={`data:image/png;base64,${imagen._Imagen}`}
        alt='Imagen'
        >
        </MDBCarouselItem>
    ))}
    </MDBCarousel>
  )
}

export default Carrusel