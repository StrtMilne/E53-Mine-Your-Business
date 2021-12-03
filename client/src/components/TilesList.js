import React from "react";
import Tile from "./Tile";

const TilesList = function ({tiles}) {

    const tileItems = tiles.map((tile, index) => {
        return <Tile key={index} tile={tile} />
    })
    
    return(
        <div className="Tile-list">
            {tileItems}
        </div>
    );
};

export default TilesList;
