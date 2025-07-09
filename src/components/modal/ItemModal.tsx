import React, { useContext } from "react";
import { useNavigate } from "react-router";
import ReactModal from "react-modal";
import type { Item } from "../../types/itemTypes"
import { format } from "date-fns"
import { ContextIds } from "../../App";
import themes from "../../themes/modal-item.module.scss"

interface itemModalProps{
    item:Item,
    show:boolean,
    setShow:React.Dispatch<React.SetStateAction<boolean>>
}

const ItemModal:React.FC<itemModalProps> = (props:itemModalProps) => {

    let contextItem = useContext(ContextIds);
    let navigate = useNavigate();
    function start_session(id:string) {
        contextItem["setItemId"](id)
        navigate('/login/buscar')   
    }
    
    function handleCloseModal () {
        props.setShow(false)
    }

    return (
        <>
        {props.item? 
        <ReactModal 
            isOpen={props.show} 
            onRequestClose={handleCloseModal} 
            shouldCloseOnOverlayClick={true}
            className={themes.modalBody}
            overlayClassName={themes.modalOverlay}
        >
            <h1>É SEU ITEM?</h1>
            <div className={themes.modalItem}>
                <img src={props.item.photo} alt="item"/>
                <div className={themes.modalItemContent}>
                    <h2>{props.item.title}</h2>
                    <div className={themes.modalItemMisc}>
                        <p>Cor: {props.item.color}</p>
                        <p>Tam: {props.item.size}</p>
                        <p className={themes.date}>{format(props.item.date, 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                </div>
            </div>
            <p className={themes.modalItemDesc}>{props.item.description}</p>
            <div className={themes.modalButtons}>
                <button className={themes.buttonY} onClick={() => {start_session(props.item._id)}}>Sim, é meu item</button>
                <button className={themes.buttonN} onClick={handleCloseModal}>Não, achar outro</button>
            </div>       
        </ReactModal> :
        <></>
        }
        </>
    )
}

export default ItemModal