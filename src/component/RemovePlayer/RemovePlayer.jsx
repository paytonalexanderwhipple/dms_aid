import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { setCurrentCampaign } from '../../ducks/reducer/campaign_reducer.js';
import axios from 'axios';

class RemovePlayer extends Component {
    constructor() {
        super()
        
        this.state = {
            remove: false,
        }
    }

    toggle = () => {
        this.setState({remove: !this.state.remove});
    }

    removePlayer = (user) => {
        const { campaign_user_id, campaign_id, user_id } = user;
        axios.delete(`/api/campaign/remove?campaign_id=${campaign_id}&user_id=${user_id}&campaign_user_id=${campaign_user_id}`)
            .then(async res => {
                const { campaign_id } = this.props.currentCampaign.campaignDetails
                let results = await axios.get(`/api/campaign?campaign_id=${campaign_id}`);
                this.props.setCurrentCampaign(results.data);
            }).catch(err => {
                console.log(`RemovePlayer.removePlayer ${err}`)
            })
    }
    
    render() {

        const { users } = this.props.currentCampaign;

        let usersDisplay = users.map(user => {
            if (!user.is_dm) {
                return (
                    <div>
                        <p>Player: {user.username}</p>
                        <button onClick={() => this.removePlayer(user)}>x</button>
                    </div>
                )
            }
        })

        let render;
        if (this.state.remove) {
            render = (<div>
                {usersDisplay}
                <button onClick={this.toggle}>Cancel</button>
            </div>)
        } else {
            render = (<div>
                <button onClick={this.toggle}>Remove Players</button>
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
    const { currentCampaign } = state.campaign;
    return {
        currentCampaign,
    }
}

export default connect(mapStateToProps, { setCurrentCampaign })(RemovePlayer);