import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import AddDriver from './AddDriver';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/create" exact component={AddDriver} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
