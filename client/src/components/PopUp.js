import React, { useState } from "react";
import { postScore } from "../ScoresService";

const PopUp = function({ snapshotTotalScore, handleNameSubmit }) {

    const [inputName, setInputName] = useState("");

    const handleOnChange = (event) => {
        setInputName(event.target.value);
    }

    const handleClick = () => {
        const data = {
            "player_name": inputName,
            "score": snapshotTotalScore
        };
        postScore(data);
        handleNameSubmit();

    }
    
    return (
        <div>
            <h3>Score 🥇 : {snapshotTotalScore}</h3>
            <h3>Please enter your name:</h3>
            
            <input type="text" onChange={handleOnChange} />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default PopUp;
