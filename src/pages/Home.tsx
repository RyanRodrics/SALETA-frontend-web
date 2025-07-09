// import React from 'react'
import { useEffect, useContext } from 'react'
import imagemEncontrar from '../assets/home/EncontrarItem.png'
import imagemGuardar from '../assets/home/GuardarItem.png'
import themes from '../themes/home.module.scss'
import Header from '../components/Header'
import { ContextIds } from "../App";

function Home(){
    let contextIds = useContext(ContextIds);
    useEffect(() => {
        contextIds["setItemId"]("")
        contextIds["setUserId"]("")
        contextIds["setType"]("")
    }, []);

    return (
        <>
            <Header titulo='S.A.L.E.T.A.' hideHome={true}/>
            <div className={themes.home}>
                <img src="" alt="?" className={themes.sobre}/>
                <a href="/itens" className={themes.encontrar}>
                    <img src={imagemEncontrar} alt="ENCONTRAR" />
                    <p>Encontrar Item</p>
                </a>
                <a href="/login/guardar"  className={themes.guardar}>
                    <img src={imagemGuardar} alt="GUARDAR" />
                    <p>Guardar Item</p>
                </a>
            </div>     
        </>    
        
    )
}

export default Home