import React ,{Component}from 'react';
import './App.css';
import GameHeader from "./components/GameHeader.js";
import {BrowserRouter, Route, Routes} from 'react-router-dom' 
// import GameHeader from './components/GameHeader';
// import Navigation from './components/Navigation';
import GameContainer from './containers/GameContainer.js';
import HighScores from './containers/HighScores';

class App extends Component {
  render(){
  return (

    <BrowserRouter>
  
      <Routes>
        <Route path="/" element={<GameHeader/>} exact/>
        <Route path="/game" element={<GameContainer/>}/>
        <Route path="/highscores" element={<HighScores/>}/>

        <Route component={Error}/>
      </Routes>
      
    </BrowserRouter>

    
  );
}
}

export default App;
