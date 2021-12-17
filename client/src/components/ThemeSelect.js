import React, {useState} from "react";
import bombImage from "../assets/bomb2.svg";
import gemImage from "../assets/gem.svg";
import coal from "./static/lump-of-coal-2.mp3";
import hoHoHo from "./static/ho-ho-ho.wav";
import useSound from 'use-sound';
import gemSound from "./static/magic.wav"
import bombSound from "./static/gun.wav"

const ThemeSelect = function ({setChosenTheme}) {

    const mines = {name: "mines",goodImage: gemImage, badImage: bombImage, goodClass: "gem-image", badClass: "bomb-image", class: "mines", goodSound: gemSound , badSound: bombSound};
    const christmas = {
        name: "dieHard",
        goodImage: "https://icon-library.com/images/christmas-gift-icon/christmas-gift-icon-27.jpg", 
        badImage: "https://www.pngrepo.com/png/156300/512/coal.png",
        class: "xmas",
        goodClass: "goodxmas-image",
        badClass: "badxmas-image",
        goodSound: hoHoHo,
        badSound: coal
    };

    const [currentTheme, setCurrentTheme] = useState(mines);

    const handleChange = function (event) {
        if (event.target.value === "christmas") {
            setCurrentTheme(christmas);
        } else if (event.target.value === "mines") {
            setCurrentTheme(mines);
        }
    }

    const [play] = useSound("http://www.cs.tlu.ee/~rinde/media/soundid/aisakell.wav", {
       
    })

    const handleSubmit = function (event) {
        event.preventDefault();
        setChosenTheme(currentTheme);
        if (currentTheme.class === "xmas") {
            play();
        }
    } 

    return(
        <form onSubmit={handleSubmit}>
            <label for="select-theme">Theme: </label>
            <select onChange={handleChange}>
                <option value="mines">Mines</option>
                <option value="christmas">Christmas</option>
            </select>
            <button type="submit" style={{marginLeft: "2.5%", padding: "2%"}}>Set</button>
        </form>
    )
}

export default ThemeSelect;