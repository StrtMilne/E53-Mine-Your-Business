import React from "react";
import Tile from "./Tile";
import "./static/TileList.css";

const TilesList = function ({tiles, setClicked, incrementScore, bombClicked}) {

    const tileItems = tiles.map((tile, index) => {
        return <Tile key={index} tile={tile} index={index} setClicked={setClicked} incrementScore={incrementScore} bombClicked={bombClicked} />
    })
    
    return(
        <div className="Tile-list">
            {tileItems}
        </div>
    );
};

export default TilesList;
