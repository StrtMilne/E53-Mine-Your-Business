import React from "react";

const Tile = ({tile}) => {
    
    const handleClick = function(event) {
        console.log("event:", event);
    }
 
    return(
        <div className="individual_tile" onClick={handleClick} style={{border: "1px solid black"}}>
            <p>{tile.toString()}</p>
        </div>
    )
};

export default Tile;
