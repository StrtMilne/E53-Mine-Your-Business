import React, {useState} from "react";
import bombImage from "../assets/bomb.svg";
import gemImage from "../assets/gem.svg";

const ThemeSelect = function ({setChosenTheme}) {

    const mines = {goodImage: gemImage, badImage: bombImage};
    const christmas = 
    {goodImage: "https://static3.srcdn.com/wordpress/wp-content/uploads/2020/12/Die-Hard-Is-A-Christmas-Movie-Debate-Ended-By-The-Movie---s-Director.jpg", 
    badImage: "https://static2.cbrimages.com/wordpress/wp-content/uploads/2021/02/hans-death.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5",
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