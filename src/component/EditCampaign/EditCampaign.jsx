import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCampaign } from '../../ducks/reducer/campaign_reducer.js';
import axios from 'axios';

class EditCampaign extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: this.props.currentCampaign.campaignDetails.name,
            img: this.props.currentCampaign.campaignDetails.img,
            level_limits: this.props.currentCampaign.campaignDetails.level_limits,
            description: this.props.currentCampaign.campaignDetails.description,
        }
    }
    
    handleCheckbox = (event) => {
        const { name } = event.target;
        if (name === 'class_restrictions' && this.state.class_restrictions) {
            this.setState({level_limits: false});
        }
        this.setState({[name]: !this.state[name]});
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    reset = () => {
        this.setState({
            name: this.props.currentCampaign.campaignDetails.name,
            img: this.props.currentCampaign.campaignDetails.img,
            level_limits: this.props.currentCampaign.campaignDetails.level_limits,
            description: this.props.currentCampaign.campaignDetails.description,
        })
    }

    submitEdit = () => {
        const { name, img, level_limits, description } = this.state;
        axios.put(`/api/campaign/${this.props.currentCampaign.campaignDetails.campaign_id}`, {name, img, level_limits, description})
            .then( async (res) => {
                const { campaign_id, name } = res.data;
                const results = await axios.get(`/api/campaign?campaign_id=${campaign_id}`);
                this.props.setCurrentCampaign(results.data);
                this.reset();
            }).catch(err => {
                if (err.response.request.response) {
                    alert(err.response.request.response);
                }
                console.log(`EditCampaign.submitEdit ${err}`);
            });
    }

    render() {

        const { name, img, description } = this.props.currentCampaign.campaignDetails;

        return (
            <div>
                <p>Name:</p>
                <input type="text" name="name" onChange={this.handleInput} value={this.state.name} placeholder={name}/>
                <p>Img url:</p>
                <input type="text" name="img" onChange={this.handleInput} value={this.state.img} placeholder={img}/>
                <p>Level Restrictions:</p>
                { !this.state.level_limits 
                    ? <input onClick={this.handleCheckbox} name="level_limits" type="checkbox" unchecked/>
                    : <input onClick={this.handleCheckbox} name="level_limits" type="checkbox" checked/>
                }
                <p>Description:</p>
                <textarea name="description" onChange={this.handleInput} value={this.state.description} id="" cols="20" rows="3" placeholder={description}></textarea>
                <button onClick={this.submitEdit}>Submit Changes</button>
                <button onClick={this.reset}>Cancel</button>
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

export default connect(mapStateToProps, { setCurrentCampaign })(EditCampaign);