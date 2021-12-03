import React, {useState, useEffect} from "react";
import TilesList from "../components/TilesList";

const GameContainer = function () {
    
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        const defaultArray = [
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false},
            {value: false, clicked: false}
        ];
        const bombIndex = Math.floor(Math.random() * 16);
        defaultArray[bombIndex].value = true;
        setTiles(defaultArray);
    }, [])

    const setClicked = (index) => {
        console.log("set click method called");
        let temp = tiles.map(t => t);
        temp[index].clicked = true;
        setTiles(temp);
    }

    return(
        <div>
            <TilesList tiles={tiles} setClicked={setClicked}/>
        </div>
    )
    
};

export default GameContainer;
