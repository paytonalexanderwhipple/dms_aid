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
            classRestrictions: false,
            levelLimits: false,
            description: '',
        }
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    clear = () => {
        this.setState({campaignName: '', text: '', img: '', classRestrictions: false, levelLimits: false, description: ''});
        this.props.toggleInput();
    }
    
    handleCheckBoxes = (name) => {
        if (name === 'classRestrictions' && this.state.classRestrictions) {
            this.setState({levelLimits: false});
        }
        this.setState({[name]: !this.state[name]});
    }

    createCampaign = () => {
        const { campaignName, text, classRestrictions, levelLimits, description } = this.state;
        axios.post('/api/campaign', { campaignName, text, classRestrictions, levelLimits, description })
            .then(res => {
                this.clear();
                this.props.getCampaignList();
            })
    }

    render() {

        let render;

        if (this.props.currentView === 'player') {
            render = (
                <div>
                    <input onChange={this.handleInput} value={this.state.campaignName} name='campaignName' maxLength='144'/>
                    <input onChange={this.handleInput} value={this.state.text} name='text' maxLength='144'/>
                    <button>Send</button>
                    <button onClick={this.clear}>Cancel</button>
                </div>
            )
        } else {
            render = (
                <div>
                    <input onChange={this.handleInput} value={this.state.campaignName} name='campaignName' maxLength='144'/>
                    <input onChange={this.handleInput} value={this.state.text} name='text'/>
                    <p>Racial Class Restriction</p><input onChange={() => this.handleCheckBoxes('classRestrictions')} type="checkbox"/>
                    <p>Racial Level Restriction</p>
                        {this.state.classRestrictions
                        ?  <input onChange={() => this.handleCheckBoxes('levelLimits')} type="checkbox"/>
                        :  <input type="checkbox" disabled/>
                        }
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