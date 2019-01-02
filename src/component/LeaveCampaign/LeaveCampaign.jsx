import React ,{ Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
            <div>
                <button onClick={this.toggleAreYouSure}>Leave Campaign</button>
                <div
                style={{display: this.state.areYouSure ? '' : 'none'}}>
                    <p>Are you sure!</p>
                    <button onClick={this.deleteCampaignUser}>Yes</button>
                    <button onClick={this.toggleAreYouSure}>No</button>
                </div>
            </div>
        )
    }
}

export default withRouter(LeaveCampaign);