import React from 'react';
 import "./static/nav-link.css";
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div className="nav-link">
          <NavLink to="/">
              <button className="home-button">Home</button>
          </NavLink>
          <NavLink to="/game">
              <button className="game-button">Game</button>
          </NavLink>
          <NavLink to="/contact">
          <button className="roulette-button">Russian Roulette</button>
          </NavLink>
       </div>
    );
}
 
export default Navigation;