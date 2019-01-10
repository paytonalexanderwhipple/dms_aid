import React ,{ Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCampaignList } from '../../ducks/reducer/campaign_reducer.js';
import './InputBox.css';

class InputBox extends Component {
    constructor() {
        super()
        
        this.textarea = React.createRef();
        
        this.state = {
            campaignName: '',
            text: '',
            levelLimits: false,
            description: '',
            textSelectionStart: '',
            tab: false,
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

    handleTab = (event) => {
        let { value, name, selectionStart } = event.target;
        if (event.keyCode === 9) {
            event.preventDefault();
            value = value.slice(0, selectionStart) + '\t' + value.slice(selectionStart, );
            this.setState({[name]: value, textSelectionStart: selectionStart, tab: true, })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.description !== prevState.description && this.state.tab) {
            this.textarea.current.selectionStart = this.state.textSelectionStart + 1;
            this.textarea.current.selectionEnd = this.state.textSelectionStart + 1;
            this.setState({tab: false});
        }
    }

    render() {

        let render;

        if (this.props.currentView === 'player') {
            render = (
                <div className='inviteSend'>
                    <input className="campaignJoin input" placeholder='Campaign Name' onChange={this.handleInput} value={this.state.campaignName} name='campaignName' maxLength='144'/>
                    <input className="textJoin input" placeholder='Message' onChange={this.handleInput} value={this.state.text} name='text' maxLength='144'/>
                    <button className="sendJoin button" onClick={this.createJoin}>Send</button>
                    <button className="cancelJoin button" onClick={this.clear}>Cancel</button>
                </div>
            )
        } else {
            render = (
                <div className='newCampaign'>
                    <input className='input campaignNew' placeholder='Campaign Name' onChange={this.handleInput} value={this.state.campaignName} name='campaignName' maxLength='144'/>
                    <input className='input imgNew' placeholder='Img Url' onChange={this.handleInput} value={this.state.text} name='text'/>
                    <div className='levelNew'>
                        <p>Level Limits</p>
                        <input className='input' onChange={() => this.handleCheckBoxes('levelLimits')} type="checkbox"/>
                    </div>
                    <textarea className='paper textNew textarea' row='3' column='50' placeholder='Description' onKeyDown={this.handleTab} ref={this.textarea} onChange={this.handleInput} value={this.state.description} name='description' maxLength='144'/>
                    <button id='newCampaignButton' className='sendNew button' onClick={this.createCampaign}>Create</button>
                    <button id='newCampaignButton2' className='cancelNew button' onClick={this.clear}>Cancel</button>
                </div>
            )
        }

        return (
            <div className={this.props.revealed ? 'InputBox paper RevealInputBox' : 'paper InputBox'}>
                {render}
            </div>
        )
    }
}

export default connect(null, { getCampaignList })(InputBox);