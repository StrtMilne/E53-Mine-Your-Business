import React, {useState, useEffect, useRef} from "react";
import TilesList from "../components/TilesList";
import "./static/GameContainer.css"
import ThemeSelect from "../components/ThemeSelect";
import bombImage from "../assets/bomb2.svg";
import gemImage from "../assets/gem.svg";
import heartImage from "../assets/8bitHeart.png";
import coinSound from "../components/static/magic.wav";
import bombSound from "../components/static/gun.wav";
import { getScores } from "../ScoresService";
import PopUp from "../components/PopUp";
import Snowfall from 'react-snowfall'
import "../components/static/nav-link.css";
import { NavLink } from 'react-router-dom';

const GameContainer = function () {
    
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(100);

    const [gridSize, setGridSize] = useState(4);
    const [theme, setTheme] = useState({name:"mines", goodImage: gemImage, badImage: bombImage, goodClass: "gem-image", badClass: "bomb-image", class: "mines", goodSound: coinSound, badSound: bombSound});

    const [totalScore, setTotalScore] = useState(0);
    const [numberMines, setNumberMines] = useState(1);
    const [numberOfLives,setNumberOfLives] = useState(0);
    const [highScores, setHighScores] = useState([]);
    const [endGame, setEndGame] = useState(false);
    const [multiplier, setMultiplier] = useState(0)

    // for multiplier scoring
    const [currentMultiplier, setCurrentMultiplier] = useState(0);
    const [gemsRevealed, setGemsRevealed] = useState(0);
    const [numberClicks, setNumberCLicks] = useState(1);
    const [snapshotTotalScore, setSnapshotTotalScore] = useState(0);
    const firstRender = useRef(true);

    const getHighScores = function() {
        getScores()
        .then(response => response.sort(function(a, b) {
            return b.score - a.score;
        }))
        .then(data => setHighScores(data))
    }

    useEffect(() => {
        if (firstRender.current === true) {
            firstRender.current = false;
            return;
        } else {
            setTimeout(() => {
                setScore(0);
            }, 8000)
        }
    }, [endGame])

    useEffect(() => {
        getHighScores();
        setNumberOfLives(3);
        document.querySelector(".Tile-list").style.pointerEvents = "none";
        document.querySelector(".cashout-button").style.pointerEvents = "none";
        resetGame(numberMines);
    }, [])

    // useEffect executed when numberMines state changes, it calls the resetGame method which will 
    // start the game if numberMines is not = to 0 (meaning user selected from dropdown)
    useEffect(() => {
        if(numberMines >= (gridSize*gridSize)){
            setNumberMines(1);
            resetGame(1);
        } else {
            resetGame(numberMines);
        }
    }, [numberMines, gridSize])

    const resetGame = (numberMines) => {

        setTotalScore(0);
        setCurrentMultiplier(0);

        gemPoints();

        const defaultArray = Array.from(Array(gridSize*gridSize),
            ()=>{ return {value: false, clicked: false}; });
        
        if (numberMines === 0) {
            document.querySelector(".Tile-list").style.pointerEvents = "none";
            document.querySelector(".cashout-button").style.pointerEvents = "none";   
        }
        // if statement ensures that tiles only clickable when user has selected a number of mines
        if (numberMines !== 0) {
            document.querySelector(".Tile-list").style.pointerEvents = "auto";
            document.querySelector(".cashout-button").style.pointerEvents = "auto";
            // create custom number of bombs
            let bombIndexes = [];
            for (let i=0; i<numberMines; i++) {
                let bombIndex = Math.floor(Math.random() * gridSize*gridSize); // generate random number 1-gridsize
                while (bombIndexes.includes(bombIndex)) {
                    bombIndex = Math.floor(Math.random() * gridSize*gridSize); // keep re-generating until number not already in list
                }
                bombIndexes.push(bombIndex)
            }
            // assign bombs at specified indexes from the array bombIndexes
            for (let i=0; i<bombIndexes.length; i++) {
                defaultArray[bombIndexes[i]].value = true;
            }
        }
        setTiles(defaultArray); 
    }

    const setClicked = (index) => {
        let temp = tiles.map(t => t);
        temp[index].clicked = true;
        setTiles(temp);
    }


    const setChosenTheme = (passedTheme) => {
        setTheme(passedTheme);
    }

    const gemPoints = () => {
        const probMine =(numberMines/(gridSize*gridSize));
        const probGem = ((gridSize*gridSize - numberMines)/gridSize*gridSize);
        const multiplier = (1/(probGem/(gridSize*gridSize)));
        setMultiplier(multiplier);
    }
    
    const incrementScore = () => {
        // multiplier formula: multiplier = 1/probabiloity of winning (considering all rounds of clicks)

        // const points = Math.round(score + multiplier);
        // setScore(points);
        const numberTiles = gridSize * gridSize;
        const initialNumberGems = numberTiles - numberMines;
        const probabilityGem = (initialNumberGems - gemsRevealed) / numberTiles;
        const probabilityOfSuccessFractions = [];
        for (let i=0; i<numberClicks; i++) {
            // console.log("initialNumberGems", initialNumberGems);
            // console.log("numberTiles", numberTiles);
            // console.log("i", i);
            probabilityOfSuccessFractions.push((initialNumberGems - i) / (numberTiles - i));
        }
        console.log("probabilityOfSuccessFractions:", probabilityOfSuccessFractions);
        let probabilityOfSuccess = 1;
        for (let i=0; i<probabilityOfSuccessFractions.length; i++) {
            probabilityOfSuccess *= probabilityOfSuccessFractions[i];
        }
        console.log("probabilityOfSuccess", probabilityOfSuccess);
        let calcMultiplier = 1 / probabilityOfSuccess;
        calcMultiplier = calcMultiplier.toFixed(2);
        console.log("calcMultiplier", calcMultiplier);
        setCurrentMultiplier(calcMultiplier);
        // use calcMultiplier because asyncronous
        setScore((score * calcMultiplier).toFixed(2));

        setGemsRevealed(gemsRevealed + 1);
        setNumberCLicks(numberClicks + 1);
    }

    const cashOut = () => {
        setTotalScore(score);
        setTimeout(() => { 
            if (numberOfLives === 1) {
                console.log("totalScore", totalScore);
                setSnapshotTotalScore(totalScore);
                console.log("snapshotTotalScore", snapshotTotalScore);
                if (score === 100) {
                    setScore(0);
                }
                setEndGame(true);
                setNumberOfLives(3);
            } else {
                setNumberOfLives(numberOfLives - 1);
                // setTotalScore(score)
                // setScore(totalScore);
            }
            // setScore(0);
            setTimeout(() => {
                resetGame(numberMines);
            }, 500)
        }, 500);
    }

    const bombClicked = () => {
        // disable clicking of the tiles grid after cashout button clicked & the cashout button
        document.querySelector(".Tile-list").style.pointerEvents = "none";
        document.querySelector(".cashout-button").style.pointerEvents = "none";
        // 2 second delay before resetting grid after bomb click
        // number of lives is 3 when lives = 0 then Total score will reset to 0
        // setTotalScore(0);
        setTimeout(() => {
            if (numberOfLives === 1) {
                setSnapshotTotalScore(totalScore);
                setEndGame(true);
                setNumberOfLives(3);
            } else {
                setNumberOfLives(numberOfLives-1);
                // setTotalScore(100);
                // setScore(0);
            }
            setScore(100);
            setTotalScore(0);
            resetGame(numberMines);
            // re-enable clicking of the tiles grid after has been processed & the cashout button
            document.querySelector(".Tile-list").style.pointerEvents = "auto";
            document.querySelector(".cashout-button").style.pointerEvents = "auto";
        }, 2000);
    }

    const handleNameSubmit = () => {
        setEndGame(false);
        setTotalScore(0);
    }

    const handDropdownInput = (event) => {
        const dropdownValue = parseInt(event.target.value);
        setNumberMines(dropdownValue);
    }

    const handleGridSize=(event)=>{
        const dropdownValue = parseInt(event.target.value);
        setGridSize(dropdownValue);
    }

    const windowContainer = "out" + theme.class;

    return(

        <div className={windowContainer}>
            {theme.name.length > 5 &&
            <Snowfall/>}

            <div className="nav-link"> 
                <NavLink to="/">
                <button className="home-button">About</button>
                </NavLink>
                <NavLink to="/highscores">
                    <button className="highscore-button">Leaderboard</button>
                </NavLink>
             </div>

            <div className={theme.class}>
                
                <div className="left">

                    <h2 className="total-score-data">Total Score: {totalScore}</h2>
                    <div className="lives-data">
                    <h2>Lives:</h2>
                        <div className="heart-images">
                            {numberOfLives===3 ? 
                                <div>
                                    <img src={heartImage} alt="heart" width="40px" height="40px" />
                                    <img src={heartImage} alt="heart" width="40px" height="40px" />
                                    <img src={heartImage} alt="heart" width="40px" height="40px" />
                                </div>
                            : null}
                            {numberOfLives===2 ? 
                                <div>
                                    <img src={heartImage} alt="heart" width="40px" height="40px" />
                                    <img src={heartImage} alt="heart" width="40px" height="40px" />
                                </div>
                            : null}
                            {numberOfLives===1 ? 
                                <img src={heartImage} alt="heart" width="40px" height="40px" />
                            : null}
                        </div>
                    </div>
                    <br /><br />
                    <button onClick={cashOut} className="cashout-button"><strong>Cash Out: </strong>{score} point(s)</button>
                    <p>Current Multiplier: {currentMultiplier}%</p>
                    <p>Current Points: {score}</p>
                    <br />
                    <hr />
                    <br />
                    <div className="adjustables">
                        <label htmlFor="gridSize">Choose Grid: </label>
                        <select name="gridSize" id="gridSize" onInput={handleGridSize}>
                            <option value={0} key={0}>select...</option>
                            {Array(6).fill(null).map((_, index)=> {
                                if (index === 2){
                                    return (
                                        <option selected={true} value={index+2} key={index+1}>
                                            {index+2}
                                        </option>);
                                }
                                return(
                                    <option value={index+2} key={index+1}>
                                        {index+2}
                                    </option>);})}
                        </select>   
                    </div>
                    <br />

                    <label htmlFor="numberMines">No. Mines: </label>
                    <select name="numberMines" id="numberMines" onInput={handDropdownInput} >
                    <option value={0} >select...</option>
                        {Array(gridSize*gridSize-1).fill(null).map((_, index)=> {
                            if (index === 0){
                                return (
                                    <option selected={true} value={index+1}>
                                        {index+1}
                                    </option>);
                            }
                            return(
                                <option value={index+1}>
                                    {index+1}
                                </option>);})}
                    </select>
                    <br /><br />

                    <ThemeSelect setChosenTheme={setChosenTheme}/>
                </div>
                <div className="Right">
                    <TilesList tiles={tiles} setClicked={setClicked} incrementScore={incrementScore} bombClicked={bombClicked} theme={theme}/>
                </div>
                {endGame ? 
                <div className="popup">
                    <PopUp snapshotTotalScore={score} handleNameSubmit={handleNameSubmit} />
                </div>
                : null}
            </div>
        </div>
    )  
};

export default GameContainer;
