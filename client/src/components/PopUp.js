import React, { useState } from "react";
import { postScore } from "../ScoresService";

const PopUp = function({ totalScore, handleNameSubmit }) {

    const [inputName, setInputName] = useState("");

    const handleOnChange = (event) => {
        setInputName(event.target.value);
    }

    const handleClick = () => {
        const data = {
            "player_name": inputName,
            "score": totalScore
        };
        postScore(data);
        handleNameSubmit();

    }
    
    return (
        <div>
            <h3 className="popup-line">Score 🥇 : {totalScore}</h3>
            <h3 className="popup-line">Please enter your name:</h3>
            
            <input type="text" className="popup-line" onChange={handleOnChange} />
            <button className="popup-line pop-button" onClick={handleClick}>Submit</button>
        </div>
    )
}

export default PopUp;
