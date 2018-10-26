import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';
import Login from './Login';

const Routing = () => (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
        </ul>
  
        <hr />
  
        <Route exact path="/" component={Login} />
        <Route path="/game" component={App} />
      </div>
    </Router>
  );
  export default Routing;