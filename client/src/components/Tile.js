import React from "react";
import "./static/Tile.css";
import bombImage from "../assets/bomb.svg";
import gemImage from "../assets/gem.svg";

const Tile = ({tile, index, setClicked, incrementScore}) => {
    
    const handleClick = function(event) {
        // console.log("event:", event.target);
        // console.log("event:", event.target.title);
        // ^ testing
        const id = event.target.title;
        if (!tile.clicked) {
            setClicked(id);
            console.log(event.target)
            if (event.target.id === "false") {
                console.log(event.target)
                incrementScore();
            } 
        }
    }
 
    return(
           <>
             <div className="tile">
               <div title={index} id={tile.value.toString()} className="individual_tile"  onClickCapture={handleClick} style={{border: "1px solid black"}}>
                {tile.clicked && !tile.value ? <img src={gemImage} className="gem-image" alt="gem"/> : null}
                {tile.clicked && tile.value ? <img src={bombImage} className="bomb-image" alt="bomb"/> : null}
               </div>
             </div>
           </>
    )

};

export default Tile;
