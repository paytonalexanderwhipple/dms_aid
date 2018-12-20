import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
    import { getCampaignList } from '../../ducks/reducer/campaign_reducer.js';
import CampaignLanding from '../CampaignLanding/CampaignLanding.jsx';
import CampaignBlock from '../CampaignBlock/CampaignBlock.jsx';
import InputBox from '../InputBox/InputBox.jsx';
import './Landing.css';


class Landing extends Component {
    constructor() {
        super()

        this.state = {
            currentView: 'player',
            joinRevealed: false,
        }
    }

    componentDidMount = () => {
        this.props.getCampaignList()
    }

    logout = () => {
        axios.get('/auth/logout')
            .then(res => {
                this.props.history.push('/');
            }).catch(err => {
                console.log(`Landing.logout ${err}`);
            })
    }

    toggleView = (event) => {
        const { name } = event.target;
        this.setState({currentView: name});
    }

    toggleInput = () => {
        this.setState({joinRevealed: !this.state.joinRevealed});
    }
    
    render() {

        const { currentView } = this.state;

        const campaign = this.state.currentView === 'player' ? this.props.playerCampaignArray : this.props.dmCampaignArray; 

        const campaignlist = campaign.map((campaign, i) => {
            return (
                <div draggable key={i}>
                    <CampaignBlock campaign={campaign} key={i}/>
                </div>
            )
        });

        return (
        <div className="Landing">
            <InputBox revealed={this.state.joinRevealed} currentView={this.state.currentView} toggleInput={this.toggleInput}/>
            <button onClick={this.logout}>Logout</button>
            <button onClick={this.toggleView} name='player'>Player</button>
            <button onClick={this.toggleView} name='dm'>Dungeon Master</button>
            <button 
                onClick={this.toggleInput}>
                {currentView === 'player' ? 'Join Campaign' : 'Create Campaign'}
            </button>
            {campaignlist}

        </div>
        );
    }
}

function mapStateToProps(state) {
    let { currentCampaign, playerCampaignArray, dmCampaignArray } = state.campaign;
    return {
        playerCampaignArray,
        dmCampaignArray,
        currentCampaign,
    }
}

export default connect(mapStateToProps, { getCampaignList })(Landing);