import React, {useState, useEffect} from "react";
import TilesList from "../components/TilesList";
import "./static/GameContainer.css"
import GameHeader from "../components/GameHeader";
import ThemeSelect from "../components/ThemeSelect";
import bombImage from "../assets/bomb.svg";
import gemImage from "../assets/gem.svg";


const GameContainer = function () {
    
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [theme, setTheme] = useState({goodImage: gemImage, badImage: bombImage, goodClass: "gem-image", badClass: "bomb-image"});
    
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
        temp[index].clicked = true;
        setTiles(temp);
    }

    const setChosenTheme = (passedTheme) => {
        setTheme(passedTheme);
    }

    const incrementScore = () => {
        setScore(score + 1);
    }

    return(
        <div>
            <GameHeader />
            <div className="game-container">
                <div className="left">
                    <p>Score: {score}</p>
                    <ThemeSelect setChosenTheme={setChosenTheme}/>
                </div>
                <div className="Right">
                    <TilesList tiles={tiles} setClicked={setClicked} incrementScore={incrementScore} theme={theme}/>
                </div>
            </div>
        </div>
    )
    
};

export default GameContainer;
