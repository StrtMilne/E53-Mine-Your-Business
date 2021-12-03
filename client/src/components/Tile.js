import React from "react";
import "./static/Tile.css";
import bombImage from "../assets/bomb.svg";
import gemImage from "../assets/gem.svg";

const Tile = ({tile, index, setClicked, incrementScore, bombClicked}) => {
    
    const handleClick = function(event) {
        // console.log("event:", event.target);
        // console.log("event:", event.target.title);
        // // ^ testing
        const id = event.target.id;
        if (!tile.clicked) {
            setClicked(id);
            if (event.target.title === "false") {
                incrementScore();
            } else if (event.target.title === "true") {
                // bomb clicked
                bombClicked();
            }
        }
    }
 
    return(
            <div id={index} title={tile.value.toString()} className="individual_tile"  onClick={handleClick} style={{border: "1px solid black"}}>
                {tile.clicked && !tile.value ? <img src={gemImage} className="gem-image" alt="" /> : null}
                {tile.clicked && tile.value ? <img src={bombImage} className="bomb-image" alt="" /> : null}
            </div>
    )

};

export default Tile;
