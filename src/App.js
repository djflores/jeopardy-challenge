import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.scss';
import Board from './views/Board';
import Clue from './views/Clue';
import Home from './views/Home';
import AppState from './context/GlobalState';

function App() {
    return (
        <BrowserRouter>
            <AppState>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/board" component={Board} />
                    <Route path="/clue/:id" component={Clue} />
                </Switch>
            </AppState>
        </BrowserRouter>
    );
}

export default App;
