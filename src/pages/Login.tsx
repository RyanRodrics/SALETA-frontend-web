import React,{ useContext, useState }  from "react"

import style from "../themes/loginstyle.module.scss";
import { PiUserCircleFill } from "react-icons/pi";
import Input from "../components/login/Input";
import { Route, Routes, useNavigate } from "react-router";
// import Visitante from "./Visitante";
import api from "../services/api.ts";
import Header from "../components/Header";
import type sessionProps from "../types/loginProps";
import { ContextIds } from "../App";

export const ContextLogin = React.createContext<any>({
    login:'',setLogin:()=>{},password:'',setPassword:()=>{}
});
const Login:React.FC<sessionProps> = ({tipo})=>{ 

    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const contextIds = useContext(ContextIds);
    let navigate = useNavigate();
    async function postUsers() {
        const response = await api.post('/login', {
            login,
            password
        })
        
        
        if(response.data.error){
            console.log(response.data.error);
            return false;
        }else{
            const token = response.data.token;
            
            if(token){
                await localStorage.setItem('authToken', token);
                console.log('Token armazenado com sucesso!');
                
                console.log('Login bem-sucedido!');
            }
            contextIds["setUserId"](response.data.user.id);
            return response.data;
        }
        
    }

    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Dados que serão enviados no POST
        const response = await postUsers()
        if( response){
            console.log("LOGADO")
            
            switch(tipo){
                case "buscar":
                    contextIds["setType"]("buscar");
                    navigate("/sessao/buscar");

                    break;
                case "guardar":
                    contextIds["setType"]("guardar");
                    navigate("/cadastrar-novo-item")
                    break;
                case "admin":
                    if(response.user.role !== "admin" && response.user.role !== "guard") {
                        alert("Acesso negado. Você não tem permissão para acessar a área administrativa.");
                        return;
                    }
                    navigate("/admin");
                    break;
                default:
                    break;
            }
        }
        
      };
    function changeColor(tipo:string){
        if(tipo == "admin") return "#1E0BFF";
        return "#2F9E41";
    }
    return (
        <>
        <Header titulo="LOGIN" color = {changeColor(tipo)} />
        <Routes>
            <Route path="/" element =  {
                <main className={style.login}> 
                    <PiUserCircleFill width="450px" height="450px"/>
                    <form onSubmit={HandleSubmit}>
                        
                        <div>
                            <ContextLogin.Provider value= {{login,setLogin}}>
                                <Input label = "Usuário" type="text" name="login" title="Usuário" set = "Login" url = "login" required = {true}/>
                            </ContextLogin.Provider>
                            <ContextLogin.Provider value= {{password,setPassword}}>
                                <Input label = "Senha" type="password" name="password" title="Senha" set= "Password" url = "login" required = {true} />
                            </ContextLogin.Provider>
                        </div>
                        
                        <button type="submit" style={{backgroundColor:changeColor(tipo)}}>Entrar</button>
                    </form>
                    {/* <a href="/login/visitante">Visitante?</a> */}
                </main>
            }/>

            {/* <Route path = "/visitante" element = {<Visitante tipo = {tipo}/>}/> */}
        </Routes>
        </>
    )
}

export default Login;