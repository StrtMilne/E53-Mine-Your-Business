import React, {useState, useEffect} from "react";
import HighScoreItem from "../components/HighScoreItem.js";
import { getScores } from "../ScoresService.js";
import "./static/HighScores.css"
import Navigation from "../components/Navigation.js";
import ScoreChart from "../components/ScoreChart.js";


const HighScores = () => {  

    const [highScores, setHighScores] = useState([]);
    const [highScoresLength, setHighScoresLength] = useState(0);

    useEffect(() => {
        getHighScores();
    }, [])

    useEffect(() => {
        setHighScoresLength(highScores.length);
    }, [highScores])

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
       <div className="high-scores-div" >
       <Navigation/>
       <div>
           {highScores.length===highScoresLength  ? <ScoreChart highScores={highScores} /> : null}
       </div>
        <div className="high-scores-list">
            {highScore_nodes}
        </div>
       </div> 
    )

}

export default HighScores;
