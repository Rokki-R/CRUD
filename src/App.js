import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import AddDriver from './AddDriver';
import UpdateDriver from './UpdateDriver'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/create" exact component={AddDriver} />
        <Route path="/update/:driverId" exact component={UpdateDriver} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
