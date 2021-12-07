import React from "react";
import "./static/GameHeader.css";
import { useNavigate } from "react-router";

const GameHeader = ()=> {
    let goto = useNavigate(); 

    return(
        <header className="title-bar">
            <svg onClick={() => {
                goto("/game")
            }} classname="svg"viewBox="0 0 248 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
        </header>
    )
}

export default GameHeader;
