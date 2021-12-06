import React from "react";

const HighScoreItem = function({score}) {
    return(
        <li>
            <p><strong>{score.player_name}: </strong>{score.score}</p>
        </li>
    )
}

export default HighScoreItem;
