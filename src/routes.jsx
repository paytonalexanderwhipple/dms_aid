import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './component/Login/Login.jsx';
import PlayerLanding from './component/PlayerLanding/PlayerLanding.jsx';
import DmLanding from './component/DmLanding/DmLanding.jsx';
import CampaignLanding from './component/CampaignLanding/CampaignLanding.jsx';


export default (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/landing/player' component={PlayerLanding}/>
        <Route path='/landing/dm' component={DmLanding}/>
        <Route path='/landing/campaign' component={CampaignLanding}/>
    </Switch>
);