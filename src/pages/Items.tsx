// import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// import ReactModal from "react-modal";
import api from "../services/api.ts";
import type { Item } from "../types/itemTypes"
import { format } from "date-fns"
import themes from "../themes/items.module.scss"
import { IoHomeSharp } from "react-icons/io5";
// import { ContextItens } from "../App";
// import Header from "../components/Header";
import ItemModal from "../components/modal/ItemModal";
// import { ContextIds } from "../App";
// import { DateTimezoneSetter } from "date-fns/parse/_lib/Setter";

function Items() {
    // let contextItem = useContext(ContextIds);
    let navigate = useNavigate();
    const [itemList, setItemList] = useState<Item[]>([]);
    useEffect(() => {  
        getItems();
    }, []);
      
    async function getItems() {
        const response = await api.get('/itens');
        const apiItems: Item[] = response.data;
        setItemList(apiItems);
    }

    const [busca,setBusca] = useState("")
    // const lowerBusca = busca.toLowerCase()
    const itemListFiltered = itemList.filter((item) => 
        (item.title.toLowerCase().includes(busca.toLowerCase()) ||
        item.color.toLowerCase().includes(busca.toLowerCase()) ||
        item.description.toLowerCase().includes(busca.toLowerCase())) &&
        !item.found
    ) 

    // function start_session(id:string) {
    //     contextItem["setItemId"](id)
    //     navigate('/login/buscar')   
    // }

    function goHome() {
        navigate('/')
    }


    const [showModal,setShowModal] = useState(false)
    const [modalItem,setModalItem] = useState<Item>(itemList[0]);
    function handleOpenModal (item:Item) {
        setModalItem(item)
        setShowModal(true)
    }

    return (
        <>
            <ItemModal item={modalItem} show={showModal} setShow={setShowModal}/>
            <header className={themes.header}>
                <a onClick={goHome}><IoHomeSharp /></a>
                <input type="text" value={busca} onChange={(e) => {setBusca(e.target.value)}} className={themes.search}/>
            </header>
            <main className={themes.itemMain}>
                {itemListFiltered.map(item => (
                    <div className={themes.itemCard}>
                        <div className={themes.itemInfo}>
                            <img src={item.photo} alt={item.title} />
                            <div className={themes.itemContent}>
                                <h3>{item.title}</h3>
                                <div className={themes.itemMisc}>
                                    <p className={themes.itemDesc}>{item.description}</p>
                                    <div>
                                        <div className={themes.itemFeats}>
                                            <p>Cor: {item.color}</p>
                                            <p>Tam: {item.size}</p>
                                        </div>
                                        <p className={themes.itemDate}>{format(item.date, 'dd/MM/yyyy HH:mm')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <button onClick={() => {start_session(item._id)}} className={themes.itemButton}>Recuperar Item</button> */}
                        <button onClick={() => handleOpenModal(item)} className={themes.itemButton}>Recuperar Item</button>
                    </div>
                ))}
            </main>
        </>
    )
}

export default Items;