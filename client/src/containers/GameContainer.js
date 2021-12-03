import React, {useState, useEffect} from "react";
import TilesList from "../components/TilesList";
import "./static/GameContainer.css"
import GameHeader from "../components/GameHeader";

const GameContainer = function () {
    
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        resetGame();
    }, [])

    const resetGame = () => {
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
    }

    const setClicked = (index) => {
        let temp = tiles.map(t => t);
        console.log(temp)
        temp[index].clicked = true;
        setTiles(temp);
    }

    const incrementScore = () => {
        setScore(score + 1);
    }

    const cashOut = () => {
        console.log("cash out called"); // testing
        setTotalScore(score);
        setScore(0);
        resetGame();
    }

    const bombClicked = () => {
        // disable clicking of the tiles grid after cashout button clicked & the cashout button
        document.querySelector(".Tile-list").style.pointerEvents = "none";
        document.querySelector(".cashout-button").style.pointerEvents = "none";
        // 2 second delay before resetting grid after bomb click
        setTimeout(() => {
            setTotalScore(0);
            setScore(0);
            resetGame();
            // re-enable clicking of the tiles grid after has been processed & the cashout button
            document.querySelector(".Tile-list").style.pointerEvents = "auto";
            document.querySelector(".cashout-button").style.pointerEvents = "auto";
        }, 2000);
    }

    return(
        <div>
            <GameHeader />
            <div className="game-container">
                <div className="left">
                    <h2>Total Score: {totalScore}</h2>
                    <p>Score: {score}</p>
                    <button onClick={cashOut} className="cashout-button"><strong>Cash Out: </strong>{score} point(s)</button>
                </div>
                <div className="Right">
                    <TilesList tiles={tiles} setClicked={setClicked} incrementScore={incrementScore} bombClicked={bombClicked} />
                </div>
            </div>
        </div>
    )
    
};

export default GameContainer;
