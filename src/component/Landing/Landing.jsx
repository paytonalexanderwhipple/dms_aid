import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
    import { getCampaignList, setCurrentCampaign } from '../../ducks/reducer/campaign_reducer.js';
import CampaignBlock from '../CampaignBlock/CampaignBlock.jsx';
import InputBox from '../InputBox/InputBox.jsx';
import InviteBox from '../InviteBox/InviteBox.jsx';
import './Landing.css';


class Landing extends Component {
    constructor() {
        super()

        this.state = {
            currentView: 'player',
            joinRevealed: false,
            inviteRevealed: false,
            campaignList: [],
            stagedCampaign: (<div></div>),
        }
    }

    componentDidMount = () => {
        this.props.getCampaignList();
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
        const campaignList = this.selectCampaignList(name);
        this.setState({currentView: name, campaignList, stagedCampaign: (<div></div>), joinRevealed: false, inviteRevealed: false});
    }

    toggleInput = () => {
        this.setState({joinRevealed: !this.state.joinRevealed});
    }

    toggleInvite = () => {
        this.setState({inviteRevealed: !this.state.inviteRevealed})
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDragStart = (event, id) => {
        event.dataTransfer.setData('campaign_id', id);
    }

    onDropStage = (event) => {
        const fullCampaignList = this.selectCampaignList()
        const campaign_id = event.dataTransfer.getData('campaign_id');
        const campaignList = fullCampaignList.filter(campaign => campaign.campaign_id != campaign_id);
        const stagedCampaign = fullCampaignList.filter(campaign => campaign.campaign_id == campaign_id);
        this.setState({campaignList, stagedCampaign: stagedCampaign[0]});
    }

    onDropInit = (event) => {
        const campaign_id = event.dataTransfer.getData('campaign_id');
        const campaignList = this.selectCampaignList()
        if (campaign_id == this.state.stagedCampaign.campaign_id) {
            this.setState({campaignList, stagedCampaign: (<div></div>)});
        }
    }

    selectCampaignList = (name = this.state.currentView) => {
        return name === 'player'? this.props.playerCampaignArray : this.props.dmCampaignArray; 
    }
        
        render() {

        const { name, campaign_id } = this.state.stagedCampaign
            
        const { currentView } = this.state;

        const campaignList = this.state.campaignList.map((campaign, i) => {
            return (
                <div draggable key={i} onDragStart={(event) => this.onDragStart(event, campaign.campaign_id)}>
                    <CampaignBlock campaign={campaign} key={i}/>
                </div>
            )
        });

        let stagedCampaign = this.state.stagedCampaign;

        if (this.state.stagedCampaign.name) {
            stagedCampaign = (<div draggable onDragStart={event => this.onDragStart(event, this.state.stagedCampaign.campaign_id)}>
                <CampaignBlock campaign={this.state.stagedCampaign} />
            </div>);
        }

        return (
        <div className="Landing">
            <InputBox revealed={this.state.joinRevealed} currentView={this.state.currentView} toggleInput={this.toggleInput}/>
            <InviteBox revealed={this.state.inviteRevealed} toggleInvite={this.toggleInvite}/>
            <button id='logout' className='button' onClick={this.logout}>Logout</button>
            <button id='viewButton' className='button' onClick={this.toggleView} name='player'>Player</button>
            <button id='viewButton2' className='button' onClick={this.toggleView} name='dm'>DM</button>
            <button 
                className = 'button'
                id='create-join'
                onClick={this.toggleInput}>
                {currentView === 'player' ? 'Join Campaign' : 'New Campaign'}
            </button>
            <button    
                className='button'
                id='invite' 
                onClick={this.toggleInvite}
                style={{display: this.state.currentView === 'player' ? '' : 'none'}}>
                Invite List</button>
            <div className='Boxes'>
                <div 
                    className='Drag-Box paper'
                    onDragOver={this.onDragOver}
                    onDrop={this.onDropInit}>
                    <div className='Campaign-List'>
                        {campaignList}
                    </div>
                </div>
                <div
                    className='Staging-Box paper'
                    onDragOver={this.onDragOver}
                    onDrop={this.onDropStage}>
                    <div className='stageingBox'>
                        {stagedCampaign}
                    </div>
                    <Link to={`/landing/campaign/${campaign_id}/${name}`}>
                        <button
                            className='stageButton button'
                            style={{display: this.state.stagedCampaign.name ? '' : 'none'}}
                            onClick={this.stageCampaign}>
                                Load Campaign
                        </button>
                    </Link>
                </div>
            </div>
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

export default connect(mapStateToProps, { getCampaignList, setCurrentCampaign })(Landing);