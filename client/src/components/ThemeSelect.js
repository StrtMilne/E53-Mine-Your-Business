import React, {useState} from "react";

const ThemeSelect = function ({setChosenTheme}) {

    const mines = {gemImage: "client/src/assets/gem.svg", bombImage: "client/src/assets/bomb.svg"};
    const christmas = 
    {gemImage: "https://cdn.mos.cms.futurecdn.net/WeceHhYEoqG6rZAk6HDWPG-1200-80.jpg", 
    bombImage: "https://lwlies.com/wp-content/uploads/2019/12/die-hard-hans-gruber-1108x0-c-default.jpg"};

    const [currentTheme, setCurrentTheme] = useState(mines);

    const handleChange = function (event) {
        if (event.target.value === "christmas") {
            setCurrentTheme(christmas);
        }
    }

    const handleSubmit = function (event) {
        event.preventDefault();
        setChosenTheme(currentTheme);
    } 


    return(
        <form onSubmit={handleSubmit}>
            <label for="select-theme">Select theme: </label> 
            <select onChange={handleChange}>
                <option value="mines">Mines</option>
                <option value="christmas" >Christmas</option>
            </select>
            <button type="submit">Set</button>
        </form>
    )
};

export default ThemeSelect;