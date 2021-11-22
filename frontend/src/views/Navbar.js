import React from "react";
import {Link} from 'react-router-dom';
import "../App.css";

function Navbar(){
    return (
        <div className="App">
          <header className="App-header">
            <ul>
            <li><Link to="/" class="menuLink">Home</Link></li>
            <li>|</li>
            <li><Link to="/About" class="menuLink">About</Link></li>
            <li>|</li>
            <li><Link to="/Board" class="menuLink">Board</Link></li>
            <li>|</li>
            <li><Link to="/QnA" class="menuLink">QnA</Link></li>
            <li>|</li>
            <li><Link to="/Apply" class="menuLink">Apply</Link></li>
            </ul>
          </header> 
          <br/><br/>
        </div>
    );
};

export default Navbar;