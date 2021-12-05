import React ,{Component}from 'react';
import './App.css';
import GameHeader from "./components/Home.js";
import {BrowserRouter, Route, Routes, useHistory} from 'react-router-dom' 
// import GameHeader from './components/GameHeader';
import Navigation from './components/Navigation';
import GameContainer from './containers/GameContainer.js';

class App extends Component {
  render(){
  return (
    <BrowserRouter>
      
      <Navigation />
            <Routes>
             <Route path="/" element={<GameHeader/>} exact/>
             <Route path="/game" element={<GameContainer/>}/>
            <Route component={Error}/>
           </Routes>
      
     

       
      
      
    </BrowserRouter>
    
  );
}
}

export default App;
