import React from "react";
import "./static/Tile.css";

import bombImage from "../assets/bomb2.svg";
import gemImage from "../assets/gem.svg";
import useSound from 'use-sound';
import coinSound from "./static/magic.wav";
import bombSound from "./static/gun.wav";


const Tile = ({tile, index, setClicked, incrementScore, bombClicked, theme}) => {
    
    const [playCoinSound]=useSound(coinSound);
    const[playBombSound]=useSound(bombSound)

    const handleClick = function(event) {
        // console.log("event:", event.target);
        // console.log("event:", event.target.title);

        const id = event.target.id;
        if (!tile.clicked) {
            setClicked(id);
            console.log(event.target.attributes)
                if (event.target.attributes["data-value"].value === "false") {
                console.log("gem detected");
                console.log(event.target.name)
                incrementScore();
                playCoinSound(); 
            } else if (event.target.attributes["data-value"].value === "true") {
                console.log("bomb detected");
                // bomb clicked
                bombClicked();
                playBombSound();
            }
        }
    }
 

    return(
// <<<<<<< iain_develop
//            <>
             
//                <div id={index} name={value} title={tile.value.toString()} className="individual_tile"  onClickCapture={handleClick} style={{border: "1px solid black"}}>
//                 {tile.clicked && !tile.value ? <img src={gemImage} className="gem-image" alt="gem"/> : null}
//                 {tile.clicked && tile.value ? <img src={bombImage} className="bomb-image" alt="bomb"/> : null}
//                </div>
             
//            </>
// =======
            <div id={index} data-value={tile.value.toString()} className="individual_tile"  onClick={handleClick} style={{border: "1px solid black"}}>
                {tile.clicked && !tile.value ? <img src={theme.goodImage} className={theme.goodClass} alt="gem"/> : null}
                {tile.clicked && tile.value ? <img src={theme.badImage} className={theme.badClass} alt="bomb"/> : null}
            </div>
    )
};

export default Tile;
