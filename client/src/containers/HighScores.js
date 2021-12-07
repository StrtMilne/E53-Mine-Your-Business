import React, {useState, useEffect} from "react";
import HighScoreItem from "../components/HighScoreItem.js";
import { getScores } from "../ScoresService.js";
import "./static/HighScores.css"
import Navigation from "../components/Navigation.js";


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
       <Navigation/>
        <ol>
            {highScore_nodes}
        </ol>
       </div> 
    )

}

export default HighScores;
