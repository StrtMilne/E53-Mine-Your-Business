import React from "react";
import "./static/Tile.css";
import useSound from 'use-sound';

const Tile = ({tile, index, setClicked, incrementScore, bombClicked, theme}) => {
    
    const [playCoinSound] = useSound(theme.goodSound);
    const [playBombSound] = useSound(theme.badSound);

    const handleClick = function(event) {
        const id = event.target.id;
        if (!tile.clicked) {
            setClicked(id);
            if (event.target.attributes["data-value"].value === "false") {
                incrementScore();
                playCoinSound(); 
            } else if (event.target.attributes["data-value"].value === "true") {
                bombClicked();
                playBombSound();
            }
        }
    }
 

    return(
            <div id={index} data-value={tile.value.toString()} className="individual_tile"  onClick={handleClick} style={{border: "1px solid black"}}>
                {tile.clicked && !tile.value ? <img src={theme.goodImage} className={theme.goodClass} alt="gem"/> : null}
                {tile.clicked && tile.value ? <img src={theme.badImage} className={theme.badClass} alt="bomb"/> : null}
            </div>
    )
};

export default Tile;
