import React, {useState} from "react";

const ThemeSelect = function ({setChosenTheme}) {

    const [currentTheme, setCurrentTheme] = useState("default");

    const handleChange = function (event) {
        setCurrentTheme(event.target.value);
    }

    const handleSubmit = function (event) {
        event.preventDefault();
        setChosenTheme(currentTheme);
    } 

    return(
        <form onSubmit={handleSubmit}>
            <label for="select-theme">Select theme: </label> 
            <select onChange={handleChange}>
                <option value="default" >Mines</option>
                <option value="christmas" >Christmas</option>
            </select>
            <button type="submit">Set</button>
        </form>
    )
};

export default ThemeSelect;