import React ,{ Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './DeleteCampaign.css';

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
            <div className='DeleteCampaign'>
                <button 
                    style={{display: this.state.areYouSure ? 'none' : ''}}
                    className='button paper' onClick={this.toggleAreYouSure}>Delete Campaign</button>
                <div
                    style={{display: this.state.areYouSure ? '' : 'none'}}
                    className='DeleteCampaign'>
                    <p className='text'>Are you sure!</p>
                    <div className='DeleteButtonBox'>
                        <button id='deleteYes' className='button' onClick={this.deleteCampaign}>Yes</button>
                        <button id='deleteNo' className='button' onClick={this.toggleAreYouSure}>No</button>
                    </div>
                </div>
            </div>
        )
    }
}



export default withRouter(DeleteCampaign);