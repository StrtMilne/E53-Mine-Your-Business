import React, {useState, useEffect} from "react";
import TilesList from "../components/TilesList";
import "./static/GameContainer.css"
import GameHeader from "../components/GameHeader";
import ThemeSelect from "../components/ThemeSelect";
import bombImage from "../assets/bomb2.svg";
import gemImage from "../assets/gem.svg";
import heartImage from "../assets/heart.svg";
import coinSound from "../components/static/magic.wav";
import bombSound from "../components/static/gun.wav";
import Navigation from "../components/Navigation";
import { postScore, getScores } from "../ScoresService";
import PopUp from "../components/PopUp";
import Snowfall from 'react-snowfall'

const GameContainer = function () {
    
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);

    const [gridSize, setGridSize] = useState(4);
    const [theme, setTheme] = useState({name:"mines", goodImage: gemImage, badImage: bombImage, goodClass: "gem-image", badClass: "bomb-image", goodSound: coinSound, badSound: bombSound});

    const [totalScore, setTotalScore] = useState(0);
    const [numberMines, setNumberMines] = useState(1);
    const [numberOfLives,setNumberOfLives] = useState(0);
    const [highScores, setHighScores] = useState([]);
    const [endGame, setEndGame] = useState(false);

    const getHighScores = function() {
        getScores()
        // .then(response => console.log(response[0].score))
        .then(response => response.sort(function(a, b) {
            return b.score - a.score;
        }))
        .then(data => setHighScores(data))
    }

    useEffect(() => {
        getHighScores();
        setNumberOfLives(3);
        // disable clicking of the tiles grid after cashout button clicked & the cashout button
        document.querySelector(".Tile-list").style.pointerEvents = "none";
        document.querySelector(".cashout-button").style.pointerEvents = "none";
        resetGame(numberMines);
    }, [])

    // useEffect executed when numberMines state changes, it calls the resetGame method which will 
    // start the game if numberMines is not = to 0 (meaning user selected from dropdown)
    useEffect(() => {
        if(numberMines>= (gridSize*gridSize)){
            setNumberMines(1);
            resetGame(1);
        } else {
            resetGame(numberMines);
        }
        console.log("use effect numberMines called");
        console.log(numberMines) // testing
    }, [numberMines, gridSize])

    const resetGame = (numberMines) => {
        const defaultArray = Array.from(Array(gridSize*gridSize),
            ()=>{ return {value: false, clicked: false}; });
        
        // makes sure user can't play with no bombs
        if (numberMines === 0) {
            document.querySelector(".Tile-list").style.pointerEvents = "none";
            document.querySelector(".cashout-button").style.pointerEvents = "none";   
        }
        // if statement ensures that tiles only clickable when user has selected a number of mines
        if (numberMines !== 0) {
            console.log("unlock"); // testing
            document.querySelector(".Tile-list").style.pointerEvents = "auto";
            document.querySelector(".cashout-button").style.pointerEvents = "auto";
            // create custom number of bombs
            let bombIndexes = [];
            for (let i=0; i<numberMines; i++) {
                let bombIndex = Math.floor(Math.random() * gridSize*gridSize); // generate random number 1-16
                while (bombIndexes.includes(bombIndex)) {
                    bombIndex = Math.floor(Math.random() * gridSize*gridSize); // keep re-generating until number not already in list
                }
                bombIndexes.push(bombIndex)
            }
            // console.log(bombIndexes); // testing
            // assign bombs at specified indexes from the array bombIndexes
            for (let i=0; i<bombIndexes.length; i++) {
                defaultArray[bombIndexes[i]].value = true;
                // defaultArray[bombIndexes[i]].clicked = true; // testing
            }
        }
        setTiles(defaultArray); // set under if statement so tiles will still render before user has made a choice
    }

    const setClicked = (index) => {
        let temp = tiles.map(t => t);
        temp[index].clicked = true;
        setTiles(temp);
    }


    const setChosenTheme = (passedTheme) => {
        setTheme(passedTheme);
        console.log("hi")
        
        console.log(theme.name)
    }


    //increasing the bounty for the risk taken 
    const incrementScore = () => {
        // updated dynamic score from number mines
        setScore(score + numberMines);
    }

    const cashOut = () => {
        console.log("cash out called"); // testing
        
        setTotalScore(totalScore + score);
        
        setTimeout(() => { 
            if (numberOfLives === 1) {
                setEndGame(true);
                // // submit total score to server (high-score list)
                // let playerName = prompt("Enter your name for the scoreboard!");
                // if (playerName != null) {
                //     console.log(playerName)
                //     // send playerName and totalScore to the server...
                //     const data = {
                //         "player_name": playerName,
                //         "score": totalScore
                //     };
                //     // send new high score to database
                //     postScore(data);
                // }
                // resetting the game
                setNumberOfLives(3);
                // setTotalScore(0);
            } else {
                setNumberOfLives(numberOfLives - 1);
            }
            setScore(0);
            resetGame(numberMines);
        }, 500);
        
    }

    const bombClicked = () => {
        // disable clicking of the tiles grid after cashout button clicked & the cashout button
        document.querySelector(".Tile-list").style.pointerEvents = "none";
        document.querySelector(".cashout-button").style.pointerEvents = "none";
        // 2 second delay before resetting grid after bomb click
        // number of lives is 3 when lives = 0 then Total score will reset to 0
        setTotalScore(0);
        setTimeout(() => {
            if(numberOfLives === 1){
                setEndGame(true);
                // // submit total score to server (high-score list)
                // let playerName = prompt("Enter your name for the scoreboard!");
                // if (playerName != null) {
                //     console.log(playerName)
                //     // send playerName and totalScore to the server...
                //     const data = {
                //         "player_name": playerName,
                //         "score": totalScore
                //     };
                //     // send new high score to database
                //     postScore(data);
                // }
                // resetting the game
                setNumberOfLives(3);
            } else {
                setNumberOfLives(numberOfLives-1);
            }
            setScore(0);
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
        // console.log(event.target.value); // testing
        const dropdownValue = parseInt(event.target.value);
        setNumberMines(dropdownValue);
        // setNumberOfLives(3);
        // resetGame();
    }

    const handleGridSize=(event)=>{
        const dropdownValue = parseInt(event.target.value);
        setGridSize(dropdownValue);
    }

    // database functions
    return(

        <div className="all-game-container">
            {theme.name.length > 5 &&
            <Snowfall/>}

            <Navigation highScores={highScores} />
            <div className="game-container">
                
                <div className="left">

                    <h2>Total Score: {totalScore}</h2>
                    <div className="lives-data">
                    <h2>Lives:</h2>
                    <div className="heart-images">
                        {numberOfLives===3 ? 
                            <div>
                                <img src={heartImage} alt="heart image" width="40px" height="40px" />
                                <img src={heartImage} alt="heart image" width="40px" height="40px" />
                                <img src={heartImage} alt="heart image" width="40px" height="40px" />
                            </div>
                        : null}
                        {numberOfLives===2 ? 
                            <div>
                                <img src={heartImage} alt="heart image" width="40px" height="40px" />
                                <img src={heartImage} alt="heart image" width="40px" height="40px" />
                            </div>
                        : null}
                        {numberOfLives===1 ? 
                            <img src={heartImage} alt="heart image" width="40px" height="40px" />
                        : null}
                    </div>
                    </div>
                    <br />
                    <button onClick={cashOut} className="cashout-button"><strong>Cash Out: </strong>{score} point(s)</button>
                    <p>Current Points: {score}</p>
                    <br />
                    <hr />
                    <br /><br />

                    <label htmlFor="gridSize">Choose Grid: </label>
                    <select name="gridSize" id="gridSize" onInput={handleGridSize}>
                        <option value={0}>select...</option>
                        {Array(6).fill(null).map((_, index)=> {
                            if (index === 2){
                                return (
                                    <option selected={true} value={index+2}>
                                        {index+2}
                                    </option>);
                            }
                            return(
                                <option value={index+2}>
                                    {index+2}
                                </option>);})}
                    </select>   
                    <br /><br /> 

                    <label htmlFor="numberMines">Number Of Mines: </label>
                    <select name="numberMines" id="numberMines" onInput={handDropdownInput} >
                    <option value={0}>select...</option>
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
                    {/* <p><{highScores}</p> */}
                </div>
                <div className="Right">
                    <TilesList tiles={tiles} setClicked={setClicked} incrementScore={incrementScore} bombClicked={bombClicked} theme={theme}/>
                </div>
                {endGame ? 
                <div className="popup">
                    <PopUp totalScore={totalScore} handleNameSubmit={handleNameSubmit}/>
                </div>
                : null}
            </div>
        </div>
    )  
};

export default GameContainer;
