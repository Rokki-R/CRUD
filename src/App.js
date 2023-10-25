import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" component={HomePage} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
