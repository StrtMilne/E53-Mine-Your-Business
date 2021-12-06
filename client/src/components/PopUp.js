import React, { useState } from "react";
import { postScore } from "../ScoresService";

const PopUp = function({ totalScore, handleNameSubmit }) {

    const [inputName, setInputName] = useState("");

    const handleOnChange = (event) => {
        setInputName(event.target.value);
    }

    const handleClick = () => {
        // send playerName and totalScore to the server...
        const data = {
            "player_name": inputName,
            "score": totalScore
        };
        // send new high score to database
        postScore(data);

        // call method from container which would set endGame to false & setTotalScore to 0
        handleNameSubmit();

    }
    
    return (
        <div>
            <h3>Score 🥇 : {totalScore}</h3>
            <h3>Please enter your name:</h3>
            
            <input type="text" onChange={handleOnChange} />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default PopUp;
