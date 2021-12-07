import React, {useState, useEffect} from "react";
import HighScoreItem from "../components/HighScoreItem.js";
import { getScores } from "../ScoresService.js";
import "./static/HighScores.css"
// import Navigation from "../components/Navigation.js";
import "../components/static/nav-link.css";
import { NavLink } from 'react-router-dom'



const HighScores = () => {  

    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        getHighScores();
    }, [])

    const getHighScores = async function() {
        await getScores()
        .then(response => response.sort(function(a, b) {
            return b.score - a.score;
        }))
        .then(data => setHighScores(data))
    }


    const highScore_nodes = highScores.map((score, index) => {
        return (
            <HighScoreItem key={index} score={score} index={index} />
        )
    })

    return(


       <div className="high-scores-list" >
            <div className="nav-link"> 
            <NavLink to="/">
                <button className="home-button">About the Game</button>
            </NavLink>
            <NavLink to="/game">
                <button className="game-button">Back to Game</button>
            </NavLink>
            </div>
            <ol>
                {highScore_nodes}
            </ol>
       </div> 
    )

}

export default HighScores;
