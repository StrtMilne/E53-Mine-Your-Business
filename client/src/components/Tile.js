import React from "react";
import "./static/Tile.css";
import bombImage from "../assets/bomb.svg";
import gemImage from "../assets/gem.svg";

const Tile = ({tile, index, setClicked}) => {
    
    const handleClick = function(event) {
        console.log("event:", event.target);
        console.log("event:", event.target.title);
        // change tile.clicked to true
        setClicked(event.target.id);
    }
 
    return(
        <div id={index} title={tile.value.toString()} className="individual_tile"  onClick={handleClick} style={{border: "1px solid black"}}>
            {/* {tile.value ? <img src={bombImage} className="bomb-image" /> : <img src={gemImage} className="gem-image" />} */}
            {tile.clicked && !tile.value ? <img src={gemImage} className="gem-image"/> : null}
            {tile.clicked && tile.value ? <img src={bombImage} className="bomb-image"/> : null}
        </div>
    )
};

export default Tile;
