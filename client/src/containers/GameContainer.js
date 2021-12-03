import React, {useState, useEffect} from "react";
import TilesList from "../components/TilesList";

const GameContainer = function () {
    
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        const defaultArray = 
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        const bombIndex = Math.floor(Math.random() * 16);
        defaultArray[bombIndex] = true;
        setTiles(defaultArray);
    }, [])

    return(
        <div>
            <TilesList tiles={tiles}/>
        </div>
    )
    
};

export default GameContainer;
