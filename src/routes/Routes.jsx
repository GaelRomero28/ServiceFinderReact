import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from '../Pages/Login'
import Menu from '../Pages/InicioCliente'
import RegisterCliente from '../Pages/RegisterCliente'
import RegisterProfesionista from '../Pages/RegisterProfesionista'
import MiPerfil from '../Pages/MiPerfil'

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
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default routes