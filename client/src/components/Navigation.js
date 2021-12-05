import React from 'react';
 import "./static/nav-link.css";
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div className="nav-link">
          <NavLink to="/">
              <button className="button">Home</button>
          </NavLink>
          <NavLink to="/game">
              <button>Game</button>
          </NavLink>
          <NavLink to="/contact">Contact</NavLink>
       </div>
    );
}
 
export default Navigation;