import React from 'react'
import NavBar from '../Components/Navbar'

const MiPerfil = () => {
    const baseURL = "https://localhost:44368/api/cliente";
    const [data, setData] =useState([]);

    const peticionGet= async()=>{
        await axios.get(baseURL).then((response) => {
            setData(response.data);
        }).catch(error=>{
            console.log(error)
        })
        }

  return (
    <>
        <NavBar></NavBar>
        <div>MiPerfil</div>
    </>
  )
}

export default MiPerfil