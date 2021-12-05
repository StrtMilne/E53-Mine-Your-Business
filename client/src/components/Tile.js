import React from "react";
import "./static/Tile.css";
import bombImage from "../assets/bomb.svg";
import gemImage from "../assets/gem.svg";
import useSound from 'use-sound';
import coinSound from "./static/magic.wav";
import bombSound from "./static/gun.wav";

const Tile = ({tile, index, setClicked, incrementScore}) => {
    
    const [playCoinSound]=useSound(coinSound);
    const[playBombSound]=useSound(bombSound)

    const handleClick = function(event) {
        console.log("event:", event.target);
        console.log("event:", event.target.title);
        // ^ testing
        const id = event.target.id;
        if (!tile.clicked) {
            setClicked(id);
            if (event.target.title === "false") {
                incrementScore(); 
                playCoinSound(); 
            } else{
                playBombSound();
            }
        }  
    }
 

    return(
            <div id={index} title={tile.value.toString()} className="individual_tile"  onClick={handleClick} style={{border: "1px solid black"}}>
                {tile.clicked && !tile.value ? <img src={gemImage} className="gem-image"/> : null}
                {tile.clicked && tile.value ? <img src={bombImage} className="bomb-image"/> : null}
            </div>
    )
};

export default Tile;
