import api from "../services/api.ts";

export default function Door(){
    async function abrir(){
        const response = await api.post('/porta/abrir', {});
        
        if(response.data.error){
            alert("NÃO CONSEGUI ABRIR A PORTA");
            return false;
        }else{
            alert("PORTA ABERTA!!!");
            return response.data
        }
    }
    async function fechar() {
        const response = await api.post('/porta/fechar', {})
        
        if(response.data.error){
            alert("NÃO CONSEGUI FECHAR PORTA");
            return false;
        }else{
            alert("PORTA FECHADA!!!");
            return response.data
        }
    }
    return (
    <>
        <button onClick={abrir}>ABRIR PORTA</button>
        <button onClick={fechar}>FECHAR PORTA</button>
    </>);
}