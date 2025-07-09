import type { Sessao } from "../types/adminTypes";
import themes from "../themes/admin.module.scss"
import { format } from "date-fns"
// import api from "../services/api";
import { API_URL } from "../services/api.ts";
const AdminSession: React.FC<{item:Sessao, key:number}>= ({item}) => {
    function mudarCor(type:string){
        return type == "guardar" ? themes.guardar : themes.buscar;
    }
    return (
    <>
        <header className={themes.header}>
            <h1>SESSÃO</h1>
        </header>
        <main className={themes.itemMain}>
        <div className={themes.itemButton}>
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
        </div>
        </main>
        <div className={themes.itemCam}>
            <div>
                <video controls >
                    <source src={`${API_URL}/video/${item._id}`} type="video/mp4" />
                    Seu navegador não suporta vídeo HTML5.
                </video>
            </div>
            
        </div>
       

    </>
    );
}

export default AdminSession;