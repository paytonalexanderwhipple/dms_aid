import React ,{ Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../DeleteCampaign/DeleteCampaign.css';

class LeaveCampaign extends Component {
    constructor() {
        super()
        
        this.state = {
            areYouSure: false,
        }
    }
    
    toggleAreYouSure = () => {
        this.setState({areYouSure: !this.state.areYouSure});
    }

    deleteCampaignUser = () => {
        const { campaign_id } = this.props;
        axios.delete(`/api/campaign/leave?campaign_id=${campaign_id}`)
            .then(res => {
                this.props.history.push('/landing');
            }).catch(err => {
                console.log(`LeaveCampaign.deleteCampaignUser ${err}`);
            });
    }

    render() {
        return (
            <div className='DeleteCampaign'>
                <button 
                    style={{display: this.state.areYouSure ? 'none' : ''}}
                    className='button paper' onClick={this.toggleAreYouSure}>Leave Campaign</button>
                <div
                    style={{display: this.state.areYouSure ? '' : 'none'}}>
                    <p className='text'>Are you sure!</p>
                    <div className='DeleteButtonBox'>
                        <button id='deleteYes' className='button' onClick={this.deleteCampaignUser}>Yes</button>
                        <button id='deleteNo' className='button' onClick={this.toggleAreYouSure}>No</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LeaveCampaign);