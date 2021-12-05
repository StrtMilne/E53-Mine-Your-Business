import React from "react";
import "./static/Tile.css";
import bombImage from "../assets/bomb2.svg";
import gemImage from "../assets/gem.svg";

const Tile = ({tile, index, setClicked, incrementScore}) => {

    const value = tile.value.toString()
        
        
    

    
    const handleClick = function(event) {
        // console.log("event:", event.target);
        // console.log("event:", event.target.title);
        // ^ testing
        const id = event.target.id;
        if (!tile.clicked) {
            setClicked(id);
            console.log(event.target)
                if (event.target.title === "false") {
                console.log(event.target.name)
                incrementScore();
            } 
        }
    }
 
    return(
           <>
             
               <div id={index} name={value} title={tile.value.toString()} className="individual_tile"  onClickCapture={handleClick} style={{border: "1px solid black"}}>
                {tile.clicked && !tile.value ? <img src={gemImage} className="gem-image" alt="gem"/> : null}
                {tile.clicked && tile.value ? <img src={bombImage} className="bomb-image" alt="bomb"/> : null}
               </div>
             
           </>
    )

};

export default Tile;
