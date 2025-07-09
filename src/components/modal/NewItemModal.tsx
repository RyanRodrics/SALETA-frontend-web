import React, { useContext } from "react";
import { useNavigate } from "react-router";
import ReactModal from "react-modal";
// import type { Item } from "../../types/itemTypes"
// import { format } from "date-fns"
import { ContextIds } from "../../App";
import themes from "../../themes/modal-item.module.scss"
import api from "../../services/api.ts";

interface itemModalProps{
    _id: string;
    title: string;
    color: string;
    size: string;
    description: string;
    photo: string;
    date?: Date;
    show:boolean
    setShow:React.Dispatch<React.SetStateAction<boolean>>;
    tipo:"buscar"|"guardar";
}

const NewItemModal:React.FC<itemModalProps> = (modal) => {

    // let contextItem = useContext(ContextIds);
    let navigate = useNavigate();
    const contextIds = useContext(ContextIds);
    
    async function create_item(item:itemModalProps){
        let resposta:any = await api.post('/itens', {
            title: item.title,
            color: item.color,
            size: item.size,
            description: item.description,
            photo: item.photo
        });
        contextIds["setItemId"](resposta.data._id);
        navigate('/sessao/guardar')
    }

    function handleCloseModal () {
        modal.setShow(false)
    }

    return (
        <>
        {(modal)? 
        <ReactModal 
            isOpen={modal.show} 
            onRequestClose={handleCloseModal} 
            shouldCloseOnOverlayClick={true}
            className={themes.modalBody}
            overlayClassName={themes.modalOverlay}
        >
            <h1>CRIAR ITEM?</h1>
            <div className={themes.modalItem}>
                <img src={modal.photo} alt="item"/>
                <div className={themes.modalItemContent}>
                    <h2>{modal.title}</h2>
                    <div className={themes.modalItemMisc}>
                        <p>Cor: {modal.color}</p>
                        <p>Tam: {modal.size}</p>
                    </div>
                </div>
            </div>
            <p className={themes.modalItemDesc}>{modal.description}</p>
            <div className={themes.modalButtons}>
                <button className={themes.buttonY} onClick={() => {create_item(modal)}}>Confirmar</button>
                <button className={themes.buttonN} onClick={handleCloseModal}>Voltar</button>
            </div>       
        </ReactModal> :
        <></>
        }
        </>
    )
}

export default NewItemModal