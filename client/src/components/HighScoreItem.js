import React from "react";

const HighScoreItem = function({score}) {
    return(
        <li>
            <h2>{score.player_name}</h2>
            <h3>{score.score}</h3>
        </li>
    )
}

export default HighScoreItem;
