// import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../services/api.ts";
import type { Item } from "../types/itemTypes"
import { format } from "date-fns"
// import Header from "../components/Header";
import themes from "../themes/admin.module.scss"
// import { IoHomeSharp } from "react-icons/io5";
// import { ContextIds } from "../App";
import type { Sessao } from "../types/adminTypes";
import type { sessionUser } from "../types/loginProps";
import { Routes,Route } from "react-router";
import AdminSession from "./AdminSession";
function Admin() {
    const [sessaoList, setSessaoList] = useState<Sessao[]>([]);
    // const [itemList, setItemList] = useState<Item[]>([]);
    let navigate = useNavigate();
    useEffect(() => {  
        getSessao();
    }, []);
      
    async function getSessao() {
        const response = await api.get('/sessao');
        const apiSessao: Sessao[] = response.data;
        
        const responseitens = await api.get('/itens');
        const apiItens:Item[] = responseitens.data        

        const responseUsers = await api.get('/login/id');
        const apiUsers:sessionUser[] = responseUsers.data
        apiSessao.map((sessao,index)=>{
            sessao.itemImage = apiItens.filter((item) => item._id == sessao.itemId)[0] != undefined ? apiItens.filter((item) => item._id == sessao.itemId)[0].photo : "" ;
            sessao.itemName = apiItens.filter((item) => item._id == sessao.itemId)[0] != undefined ? apiItens.filter((item) => item._id == sessao.itemId)[0].title : "";
            sessao.userName = apiUsers.filter((item) => item._id == sessao.userId)[0] != undefined ? apiUsers.filter((item) => item._id == sessao.userId)[0].user : "";
            sessao.key = index;
        })
        apiSessao.reverse();
        setSessaoList(apiSessao);
    }

    const [busca,setBusca] = useState("")
    // const lowerBusca = busca.toLowerCase()
    const itemListFiltered = sessaoList.filter((item) => 
        (item.type.toLowerCase().includes(busca.toLowerCase()) ||
        item.itemId.toLowerCase().includes(busca.toLowerCase()) ||
        item.userId.toLowerCase().includes(busca.toLowerCase())) ||
        item.itemName.toLowerCase().includes(busca.toLowerCase()) ||
        item.userName.toLowerCase().includes(busca.toLowerCase()))
        

    function abrirSessao(id:string){
        navigate(`/admin/${id}`);
    }

    function mudarCor(type:string){
        return type == "guardar" ? themes.guardar : themes.buscar;
    }
    return (
        <>
            <Routes>
                {itemListFiltered.map((item,index)=>(
                     <Route path= {`/${item._id}`} element={<AdminSession item = {item} key = {index}/>}/>
                ))}
               
                <Route path="/" element = {
                <>
                    <header className={themes.header}>
                        <input type="text" value={busca} onChange={(e) => {setBusca(e.target.value)}} className={themes.search} placeholder=""/>
                    </header>
                    <main className={themes.itemMain}>
                        {itemListFiltered.map(item => (
                            <button onClick={() => {abrirSessao(item._id)}} className={themes.itemButton} key={item.key}>
                                <div className={themes.itemCard + " " + mudarCor(item.type) }>
                                    <div className={themes.itemInfo}>
                                        <img src={item.itemImage} alt={item.itemName} />
                                        <div className={themes.itemContent}>
                                            <h3>{item.itemName}</h3>
                                                <p>Type: {item.type.toLocaleUpperCase()}</p>
                                                <p>Aluno: {item.userName}</p>
                                                <p>ItemId: {item.itemId}</p>
                                                <p>SessionId: {item._id}</p>
                                            <p className={themes.itemDate}>{format(item.date, 'dd/MM/yyyy HH:mm')}</p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        
                        ))}
                    </main>
                </>
                }/>
            
            </Routes>
        </>
    )
}

export default Admin;