import React from "react";
import Tile from "./Tile";
import "./static/TileList.css";

const TilesList = function ({tiles}) {

    const tileItems = tiles.map((tile, index) => {
        return <Tile key={index} tile={tile} index={index} />
    })
    
    return(
        <div className="Tile-list">
            {tileItems}
        </div>
    );
};

export default TilesList;
