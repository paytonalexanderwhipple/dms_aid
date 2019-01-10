import React ,{ Component } from 'react';
import Message from '../Message/Message.jsx';
import CharacterLanding from '../CharacterLanding/CharacterLanding.jsx';
import { connect } from 'react-redux';
    import { setCurrentCampaign } from '../../ducks/reducer/campaign_reducer.js';
    import { saveCharacterData } from '../../ducks/reducer/character_reducer.js';
import { Link } from 'react-router-dom';
import EditCampaign from '../EditCampaign/EditCampaign.jsx';
import DeleteCampaign from '../DeleteCampaign/DeleteCampaign.jsx';
import LeaveCampaign from '../LeaveCampaign/LeaveCampaign.jsx';
import Invite from '../Invite/Invite.jsx';
import Requests from '../Requests/Requests.jsx';
import RemovePlayer from '../RemovePlayer/RemovePlayer.jsx';
import './CampaignLanding.css';
import axios from 'axios';

class CampaignLanding extends Component {
    constructor() {
        super()
        
        this.state = {
            view: 'landing',
        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        let res = await axios.get(`/api/campaign?campaign_id=${id}`);
        this.props.setCurrentCampaign(res.data);
        res = await axios.get('/api/character/creation');
        this.props.saveCharacterData(res.data);
        const { campaign_id, name } = this.props.currentCampaign.campaignDetails
        this.props.history.push(`/landing/campaign/${campaign_id}/${name}`);
    }

    handleView = (event) => {
        const { name } = event.target;
        this.setState({view: name}) 
    }
    
    render() {
        let campaign_id = 0
            , is_dm = false;
        if (this.props.currentCampaign.campaignDetails) {
            campaign_id = this.props.currentCampaign.campaignDetails.campaign_id ;
            is_dm = this.props.currentCampaign.campaignDetails.is_dm;
        }
        let render;
        if (!this.props.currentCampaign.user_id) {
            render = (<div>
                <p>Loading {this.props.match.params.name}</p>
            </div>
            )
        } else {
            render = (<div className='CampaignLanding'>
                <div
                    className={this.state.view === 'messages' 
                    ? 'left-and-center landing-screen'
                    : 'hidden-left landing-screen'
                    }>
                    <Message handleView={this.handleView}/>
                </div>
                <div
                    className={this.state.view === 'landing' 
                    ? 'front-and-center landing-screen mainLanding'
                    : this.state.view === 'messages' 
                        ? 'hidden-right landing-screen mainLanding'
                        : 'hidden-left landing-screen mainLanding'
                    }>
                    <button onClick={this.handleView} name='messages'>Messages</button>
                    <div 
                        className="Box"
                        style={{display: is_dm ? "" : "none"}}>
                        <EditCampaign />
                    </div>
                    <div 
                        className="Box"
                        style={{display: is_dm ? "" : "none"}}>
                        <DeleteCampaign campaign_id={campaign_id}/>
                    </div>
                    <div 
                        className="Box"
                        style={{display: is_dm ? "none" : ""}}>
                        <LeaveCampaign campaign_id={campaign_id}/>    
                    </div>
                    <div 
                        className="Box"
                        style={{display: is_dm ? "" : "none"}}>
                        <RemovePlayer campaign_id={campaign_id}/>    
                    </div>
                    <Link to="/landing">
                        <button>Return To Landing</button>
                    </Link>
                    <div 
                        className="Box"
                        style={{display: is_dm ? "" : "none"}}>
                        <Invite campaign_id={campaign_id}/>
                    </div>
                    <div 
                        className="Box"
                        style={{display: is_dm ? "" : "none"}}>
                        <Requests campaign_id={campaign_id}/>
                    </div>
                    <button onClick={this.handleView} name='characters'>Characters</button>
                </div>
                <div
                    className={this.state.view === 'characters' 
                    ? 'right-and-center landing-screen'
                    : 'hidden-right landing-screen'
                    }>
                    <CharacterLanding handleView={this.handleView}/>
                </div>
            </div>)
        }
        return (
            <div>
                {render}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { currentCampaign, loading, loadingName } = state.campaign;
    return {
        currentCampaign,
        loading,
        loadingName, 
    }
}

export default connect(mapStateToProps, { setCurrentCampaign, saveCharacterData })(CampaignLanding);