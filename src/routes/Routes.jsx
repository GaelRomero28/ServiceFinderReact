import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from '../Pages/Login'
import Menu from '../Pages/InicioCliente'
import RegisterCliente from '../Pages/RegisterCliente'
import RegisterProfesionista from '../Pages/RegisterProfesionista'
import MiPerfil from '../Pages/MiPerfil'
import SolicitudesRecibidas from '../Pages/SolicitudesRecibidas'
import GestionarImagenes from '../Pages/GestionarImagenes'
import ReseniasProfesionista from '../Pages/ReseniasProfesionista'
import ReseniasHechas from '../Pages/ReseniasHechas'
import ReseniasRecibidas from '../Pages/ReseniasRecibidas'
import SolicitudesEnviadas from '../Pages/SolicitudesEnviadas'
import GestionUsuario from '../Pages/Admin/GestionUsuario'

const routes = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/Inicio" element={<Menu/>}/>
            <Route exact path="/RegistrarCliente" element={<RegisterCliente/>}/>
            <Route exact path="/RegistrarProfesionista" element={<RegisterProfesionista/>}/>
            <Route exact path="/MiPerfil" element={<MiPerfil/>}></Route>
            <Route exact path="/SolicitudesRecibidas" element={<SolicitudesRecibidas/>}></Route>
            <Route exact path="/GestionarImagenes" element={<GestionarImagenes/>}></Route>
            <Route exact path={"/ReseniasProfesionista/:idProf"} element={<ReseniasProfesionista/>}></Route>
            <Route exact path="/ReseniasHechas" element={<ReseniasHechas/>}></Route>
            <Route exact path="/ReseniasRecibidas" element={<ReseniasRecibidas/>}></Route>
            <Route exact path="/SolicitudesEnviadas" element={<SolicitudesEnviadas/>}></Route>
            <Route exact path="/GestionUsuarios" element={<GestionUsuario/>}></Route>

        </Routes>
    </BrowserRouter>
    </>
  )
}

export default routes