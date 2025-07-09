import { useContext, useState } from "react";
import { IoMdEye,IoIosEyeOff } from "react-icons/io";
import style from "../../themes/input.module.scss";
import { ContextLogin } from "../../pages/Login";
// import { ContextVisitante } from "../../pages/Visitante";

interface inputProps{
    label:string;
    type:'text'|"number"|"password";
    name:string;
    set:string;
    url:"login"|"visitante";
    required?:boolean;
    title?:string;
    placeholder?:string;
    maxLength?:number;
    value?:number|string;
}

const Input:React.FC<inputProps> = ({label,type,name,title,placeholder,set,required,url,maxLength,value}) =>{
    const [revelar,setRevelar] = useState<boolean>(false);
    let contexts = {
        login: useContext(ContextLogin), 
        // visitante:useContext(ContextVisitante)
        visitante: undefined
    }
    const context = contexts[url];

    return (
    <div className={style.input}>
        <label htmlFor={name}>{label}</label>
        {type == "password" ? (
            <div className={style.eye} >
                {revelar ?
                
                (
                    <>
                        <input type="text" title={title} placeholder={placeholder} name={name} id = {name} onChange={e=>{context[`set${set}`](e.target.value)}} required = {required}  maxLength = {maxLength} value={value}/>
                        <button onClick={() => {setRevelar(false)}} title="eye open" type="button"><IoMdEye/></button>
                    </>
                ):(
                    <>
                        <input type="password" title={title} placeholder={placeholder} name={name} id = {name} onChange={e=>{context[`set${set}`](e.target.value)}} required = {required}  maxLength = {maxLength} value={value}/>
                        <button onClick={() => {setRevelar(true)} }title="eye close" type="button"><IoIosEyeOff/></button>
                    </>
                )}
                
            </div>
        ):(
            <input type={type} title={title} placeholder={placeholder} name={name} id = {name} onChange={e=>{context[`set${set}`](e.target.value)}} required = {required}  maxLength = {maxLength} value={value}/>
        )}
    </div>
    )
}
export default Input;