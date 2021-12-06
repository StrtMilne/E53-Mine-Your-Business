import React, {useState, useEffect} from "react";
import HighScoreItem from "../components/HighScoreItem.js";
import { getScores } from "../ScoresService.js";

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
            <HighScoreItem key={index} score={score} />
        )
    })

    return(
        <ol>
            {highScore_nodes}
        </ol>
    )

}

export default HighScores;
