import { useState } from "react";

import '../assets/formularioReceta.css';
import axios from "axios";


export const formularioReceta = () =>{
    const [datosFormulario, setDatosFormulario] = useState( {
        nombreReceta: '',
        descripcionReceta: '',
        tiempoPreparacion: 0
    })

    const changesHandler = (e: { target: { name: any; value: any; }; }) =>{
        const {name,value} = e.target;
        setDatosFormulario({...datosFormulario,[name]:value})
        console.log(datosFormulario);
    } 

    const manejarEnvio = (e: { preventDefault: () => void; }) =>{
        const url = 'http://localhost:8080/api/v1/productos/receta';
        e.preventDefault();
        axios.post(url,datosFormulario).then(response=>{
            console.log(response.data); 
        }).catch(error=>{
            console.log(error.response.data);
        })
    } 

    return (
        <form onSubmit={manejarEnvio}>
            <label>Nombre de la receta<input type="text" name="nombreReceta" value={datosFormulario.nombreReceta} onChange={changesHandler}/></label>
            <label>Descripcion receta<input type="text" name="descripcionReceta" value={datosFormulario.descripcionReceta} onChange={changesHandler}/></label>
            <label>Tiempo de preparacion<input type="text" name="tiempoPreparacion" value={datosFormulario.tiempoPreparacion} onChange={changesHandler}/></label>
            <button type="submit">Enviar</button>
        </form>
        
    )
}

export default formularioReceta;