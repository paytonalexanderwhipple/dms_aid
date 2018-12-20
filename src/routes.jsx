import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './component/Login/Login.jsx';
import Landing from './component/Landing/Landing.jsx';
import CampaignLanding from './component/CampaignLanding/CampaignLanding.jsx';


export default (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/landing' component={Landing}/>
        <Route path='/landing/campaign' component={CampaignLanding}/> 
    </Switch>
);