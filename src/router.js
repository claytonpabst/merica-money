
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Banker from './components/Banker/Banker.js';
import Teller from './components/Teller/Teller.js';
import MbrHome from './components/Member/MbrHome/MbrHome.js'


export default (
    <Switch>
        
        <Route component={ Teller } path='/' exact />
        <Route component={ Banker } path='/banker' exact />
        <Route component={ Teller } path='/teller' exact />
        {/*<Route component={ MbrHome } path='/member/home' exact />*/}

    </Switch>
)
