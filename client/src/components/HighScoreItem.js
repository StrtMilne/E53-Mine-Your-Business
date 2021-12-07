import React from "react";
import "./static/HighScoreItem.css";

const HighScoreItem = function({score, index}) {
    return(
        <li className="list-item">
            <p className="rank"><strong>Rank: </strong>{index + 1}</p>
            <p className="score"><strong>{score.player_name}: </strong>{score.score}</p>
        </li>
    )
}

export default HighScoreItem;
