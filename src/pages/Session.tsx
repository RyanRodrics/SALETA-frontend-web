import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api.ts";
import type { Item } from "../types/itemTypes";
import themes from "../themes/session.module.scss";
// import themesHeader from "../themes/header.module.scss";
import Header from "../components/Header";
import { ContextIds } from "../App";
import type sessionProps from "../types/loginProps";
import { format } from "date-fns";

const Session:React.FC<sessionProps> = ({tipo}) => {
    let navigate = useNavigate()
    let contextIds = useContext(ContextIds);
    const [item, setItem] = useState<Item>();
    const [openDoorClicked, setOpenDoorClicked] = useState<boolean>(false);

    async function create_session(){
        if (!openDoorClicked) {
            await api.post(`/sessao/${contextIds["type"]}/${contextIds["userId"]}/${contextIds["itemId"]}` );
        }
    }
    async function abrir_porta(){
        if (contextIds["type"]!="" && contextIds["userId"]!="" && contextIds["itemId"]!="") {
            console.log("abriu porta")
            const response = await api.post('/porta/abrir', {})
            await create_session();
            setOpenDoorClicked(true);
            if(response.data.error){
                alert("NÃO CONSEGUI ABRIR A PORTA");
                return false;
            }else{
                if(tipo=="buscar") alert("Tranca Liberada, recupere o item e volte para encerrar a sessão");
                if(tipo=="guardar") alert("Tranca Liberada, deposite o item e volte para encerrar a sessão");
                return response.data
            }
        }
        setOpenDoorClicked(true);
    }
    async function fechar_porta() {
        if (contextIds["type"]!="" && contextIds["userId"]!="" && contextIds["itemId"]!="") {
            const response = await api.post('/porta/fechar', {})
            if(response.data.error){
                alert("NÃO CONSEGUI FECHAR PORTA");
                return false;
            }else{
                alert("Sessão Encerrada, favor feche a porta");
                return response.data
            }
        }
    }

    async function getItem() {
        if (contextIds["itemId"] != "") {
            const response = await api.get(`/itens/${contextIds["itemId"]}`);
            if (response.data) {
                const apiItem: Item = response.data;
                setItem(apiItem);
            }
        }
    }

    // async function getItemTeste() {
    //     const response = await api.get(`/itens/677da9ebdad4573d023fa1fd`);
    //     if (response.data) {
    //         const apiItem: Item = response.data;
    //         setItem(apiItem);
    //     }
    // }
    
    useEffect(() => {
        getItem();
    }, []);

    async function end_session() {
        await fechar_porta();
        if(tipo == "buscar" && contextIds["itemId"]!="") {
            await api.post(`/itens/found/${contextIds["itemId"]}`).then( contextIds["setItemId"](""));
        } 
        navigate('/');
    }
    
    return (
        <>
            <Header titulo='S.A.L.E.T.A.' hideHome={true}/>
            <div className={themes.sessionMain}>
            {/* <div className={themes.sessionText}>
                Sua sessão na S.A.L.E.T.A. começou!
            </div> */}
            <div className={themes.sessionText}>
                { (tipo=="buscar") ? 
                    "Entre na S.A.L.E.T.A. e recupere:"  
                : 
                    "Entre na S.A.L.E.T.A. e deposite:"
                }
            </div>
            { item ? (
                <div className={themes.itemCard}>
                <div className={themes.itemInfo}>
                    <img src={item.photo} alt={item.title} />
                    <div className={themes.itemContent}>
                        <h3>{item.title}</h3>
                        <p className={themes.itemDesc}>{item.description}</p>
                        <div className={themes.itemFeats}>
                            <p>Cor: {item.color}</p>
                            <p>Tam: {item.size}</p>
                        </div>
                        <p className={themes.itemDate}>{format(item.date, 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                </div>
                </div>
            ) : (
                <><p>Carregando Informações do Item</p></>
            )}
            <div className={themes.sessionText}>
                Retorne após {(tipo=="buscar") ? "recuperar": "depositar"} o item
            </div>
            <button onClick={abrir_porta} className={themes.buttonOpen}>Abrir Porta</button>
            { openDoorClicked ?
                <button onClick={end_session} className={themes.buttonClose}>Encerrar Sessão</button>
            : 
                <button className={themes.buttonUseless}>Encerrar Sessão</button>
            }
            </div>
        </>
    )
}

export default Session;