import React ,{ Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCampaignList } from '../../ducks/reducer/campaign_reducer.js';
import './InputBox.css';

class InputBox extends Component {
    constructor() {
        super()
        
        this.state = {
            campaignName: '',
            text: '',
            levelLimits: false,
            description: '',
        }
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    clear = () => {
        this.setState({campaignName: '', text: '', img: '', levelLimits: false, description: ''});
        this.props.toggleInput();
    }
    
    handleCheckBoxes = (name) => {
        this.setState({[name]: !this.state[name]});
    }

    createCampaign = () => {
        const { campaignName, text, levelLimits, description } = this.state;
        axios.post('/api/campaign', { campaignName, text, levelLimits, description })
            .then(res => {
                this.clear();
                this.props.getCampaignList();
            }).catch(err => {
                alert(err.response.request.response);
                console.log(`InputBox.createCampaign ${err}`);
            })
    }

    createJoin = () => {
        const { campaignName, text } = this.state;
        axios.post('/api/campaign/join', { campaignName, text, type: 'join' })
            .then(res => {
                this.clear();
            }).catch(err => {
                console.log(`InputBox.createJoin ${err}`);
                alert(err.response.request.response);
            })
    }

    render() {

        let render;

        if (this.props.currentView === 'player') {
            render = (
                <div>
                    <input onChange={this.handleInput} value={this.state.campaignName} name='campaignName' maxLength='144'/>
                    <input onChange={this.handleInput} value={this.state.text} name='text' maxLength='144'/>
                    <button onClick={this.createJoin}>Send</button>
                    <button onClick={this.clear}>Cancel</button>
                </div>
            )
        } else {
            render = (
                <div>
                    <input onChange={this.handleInput} value={this.state.campaignName} name='campaignName' maxLength='144'/>
                    <input onChange={this.handleInput} value={this.state.text} name='text'/>
                    <p>Racial Level Restriction</p>
                    <input onChange={() => this.handleCheckBoxes('levelLimits')} type="checkbox"/>
                    <textarea row='3' column='50' onChange={this.handleInput} value={this.state.description} name='description' maxLength='144'/>
                    <button onClick={this.createCampaign}>Create</button>
                    <button onClick={this.clear}>Cancel</button>
                </div>
            )
        }

        return (
            <div className={this.props.revealed ? 'InputBox RevealInputBox' : 'InputBox'}>
                {render}
            </div>
        )
    }
}

export default connect(null, { getCampaignList })(InputBox);