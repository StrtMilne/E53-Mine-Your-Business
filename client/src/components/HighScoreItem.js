import React from "react";
import "./static/HighScoreItem.css";

const HighScoreItem = function({score, index}) {
    return(
        <div className="list-item">
            <h1 className="rank">{index + 1}</h1>
            <div className="list-data">
                <p className="name"><h2>Name: </h2>{score.player_name}</p>
                <p className="score"><h2>Score: </h2>{score.score}</p>
            </div>
        </div>
    )
}

export default HighScoreItem;
