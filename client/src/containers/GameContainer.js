import React, {useState, useEffect} from "react";
import TilesList from "../components/TilesList";
import "./static/GameContainer.css"
import GameHeader from "../components/GameHeader";

const GameContainer = function () {
    
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);

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
        let temp = tiles.map(t => t);
        // console.log(temp)
        temp[index].clicked = true;
        setTiles(temp);
    }

    const incrementScore = () => {
        setScore(score + 1);
    }

    return(
        <div>
            {/* <GameHeader /> */}
            <div className="game-container">
                <div className="left">
                    <p>Score: {score}</p>
                    <label for>
                        4 x 4 grid
                        <input type="radio" name="grid-size"checked/>
                    </label>
                    <label>
                        5x5 grid
                        <input type="radio"name="grid-size" />

                    </label>
                </div>
                <div className="Right">
                    <TilesList tiles={tiles} setClicked={setClicked} incrementScore={incrementScore} />
                </div>
            </div>
        </div>
    )
    
};

export default GameContainer;
