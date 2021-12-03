import React from "react";
import "./static/Tile.css";
import bombImage from "../assets/bomb.svg";
import gemImage from "../assets/gem.svg";

const Tile = ({tile, index}) => {
    
    const handleClick = function(event) {
        console.log("event:", event.target);
        console.log("event:", event.target.title);
    }
 
    return(
        <div id={index} title={tile.toString()} className="individual_tile"  onClick={handleClick} style={{border: "1px solid black"}}>
           {tile ? <img src={bombImage} className="bomb-image" /> : <img src={gemImage} className="gem-image" />}
        </div>
    )
};

export default Tile;
 