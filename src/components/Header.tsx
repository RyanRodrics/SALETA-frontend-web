import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import themes from '../themes/header.module.scss'

interface HeaderProps{
    titulo:string
    hideHome?:boolean
}

const Header:React.FC<HeaderProps> = ({titulo, hideHome = false}) => {
    let navigate = useNavigate();

    function goHome(){
        navigate('/')
    }

    return (
        <header className={themes.header}>
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