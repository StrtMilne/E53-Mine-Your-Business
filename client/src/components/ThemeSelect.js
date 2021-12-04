import React, {useState} from "react";
import bombImage from "../assets/bomb.svg";
import gemImage from "../assets/gem.svg";

const ThemeSelect = function ({setChosenTheme}) {

    const mines = {goodImage: gemImage, badImage: bombImage};
    const christmas = 
    {goodImage: "https://static3.srcdn.com/wordpress/wp-content/uploads/2020/12/Die-Hard-Is-A-Christmas-Movie-Debate-Ended-By-The-Movie---s-Director.jpg", 
    badImage: "https://lwlies.com/wp-content/uploads/2019/12/die-hard-hans-gruber-1108x0-c-default.jpg",
    goodClass: "mcclane-image",
    badClass: "hans-image"};

    const [currentTheme, setCurrentTheme] = useState(mines);

    const handleChange = function (event) {
        if (event.target.value === "christmas") {
            setCurrentTheme(christmas);
        } else if (event.target.value === "mines") {
            setCurrentTheme(mines);
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