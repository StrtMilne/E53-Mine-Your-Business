import React from "react";
import "./static/Tile.css";

const Tile = ({tile, index}) => {
    
    const handleClick = function(event) {
        console.log("event:", event.target);
        console.log("event:", event.target.title);
    }
 
    return(
        <div id={index} title={tile.toString()} className="individual_tile"  onClick={handleClick} style={{border: "1px solid black"}}>
           {tile.toString()}
        </div>
    )
};

export default Tile;
