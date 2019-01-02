import React ,{ Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class DeleteCampaign extends Component {
    constructor() {
        super()
        
        this.state = {
            areYouSure: false,
        }
    }
    
    toggleAreYouSure = () => {
        this.setState({areYouSure: !this.state.areYouSure});
    }

    deleteCampaign = () => {
        axios.delete(`/api/campaign/delete/${this.props.campaign_id}`)
            .then(res => {
                this.props.history.push('/landing');
            }).catch(err => {
                console.log(`DeleteCampaign.deleteCampaign ${err}`);
            })
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleAreYouSure}>Delete Campaign</button>
                <div
                style={{display: this.state.areYouSure ? '' : 'none'}}>
                    <p>Are you sure!</p>
                    <button onClick={this.deleteCampaign}>Yes</button>
                    <button onClick={this.toggleAreYouSure}>No</button>
                </div>
            </div>
        )
    }
}



export default withRouter(DeleteCampaign);