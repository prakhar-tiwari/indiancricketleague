import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home';
import MatchSummary from './matches/MatchSummary';
import Navigation from './common/Navigation';
import Login from './auth/Login';
import Signup from './auth/Signup';
import MatchPrediction from './matches/MatchPrediction';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/predict" component={MatchPrediction} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/matchsummary/:id" component={MatchSummary} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
