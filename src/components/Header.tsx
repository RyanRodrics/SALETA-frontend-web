import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import themes from '../themes/header.module.scss'

interface HeaderProps{
    titulo:string
    hideHome?:boolean
    color?:string
    home?:string
}

const Header:React.FC<HeaderProps> = ({titulo, hideHome = false,color = "#2F9E41",home = "/"}) => {
    let navigate = useNavigate();

    function goHome(){
        navigate(home)
    }

    return (
        <header className={themes.header} style={{backgroundColor:color}} >
                {hideHome?
                <></>
                :
                <a onClick={goHome}><IoHomeSharp /></a>
                }
                <p>{titulo}</p>
        </header>
    )
}

export default Header