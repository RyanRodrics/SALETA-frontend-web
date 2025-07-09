// import React, { useContext } from "react";
import { useState } from "react";
// import {useNavigate} from "react-router-dom";
// import api from "../services/api";
// import type { Item } from "../types/itemTypes";
import themes from "../themes/new-item-form.module.scss";
import WebCamPhoto from "../components/form/WebCamPhoto"
import Header from "../components/Header";
import NewItemModal from "../components/modal/NewItemModal";
// import { ContextIds } from "../App";

function NewItemForm() {
    const [photo, setPhoto] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [size, setSize] = useState<string>("P");
    const [description, setDescription] = useState<string>("");
    // let navigate = useNavigate();
    // const contextIds = useContext(ContextIds);
    interface itemTemplate{
            _id?: string;
            title: string;
            color: string;
            size: string;
            description: string;
            photo: string;
            date?: Date;
    }

    async function postItem(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let itemtest:itemTemplate = {
            title : title,
            color : color,
            size : size,
            description : description,
            photo : photo,
        }
        setModalItem(itemtest)
        setShowModal(true)
    }

    const [showModal,setShowModal] = useState(false)
    const [modalItem,setModalItem] = useState<itemTemplate>(
    {
        title : title,
        color : color,
        size : size,
        description : description,
        photo : photo,
    }
    );
    // function handleOpenModal (item:Item) {
    //     setShowModal(true)
    // }

    return (
        <>
            <Header titulo='NOVO ITEM'/>
            <NewItemModal _id="" title={modalItem.title} color={modalItem.color} size={modalItem.size} description={modalItem.description} photo={modalItem.photo} show={showModal} setShow={setShowModal} tipo="guardar"/>
            <div className={themes.itemForm}>
                
                
                <form onSubmit={postItem}>
                    <WebCamPhoto photo={photo} setPhoto={setPhoto}/>
                    <label htmlFor="title">Título</label>
                    <input 
                        type="text"
                        id="title"
                        placeholder="o que você encontrou?" 
                        required onChange={e => setTitle(e.target.value)}
                    />
                    <label htmlFor="color">Cor</label>
                    <input 
                        type="text"
                        id="color"
                        placeholder="cor do item"
                        required onChange={e => setColor(e.target.value)}
                    />
                    <div className={themes.itemSize}>
                        <label htmlFor="size">Tamanho</label>
                        <select id="size" onChange={e => setSize(e.target.value)}>
                            <option value="P">P (20x20cm)</option>
                            <option value="M">M (50x50cm)</option>
                            <option value="G">G (100x100cm)</option>
                        </select>
                    </div>
                    <label htmlFor="description">Descrição</label>
                    <textarea 
                        id="description" 
                        maxLength={300}
                        onChange={e => setDescription(e.target.value)}>
                    </textarea>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    )
}

export default NewItemForm;