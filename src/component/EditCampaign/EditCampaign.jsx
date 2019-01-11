import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { setCurrentCampaign } from '../../ducks/reducer/campaign_reducer.js';
import axios from 'axios';
import './EditCampaign.css';

class EditCampaign extends Component {
    constructor(props) {
        super(props);
        
        this.textarea = React.createRef();

        this.state = {
            name: this.props.currentCampaign.campaignDetails.name,
            img: this.props.currentCampaign.campaignDetails.img,
            level_limits: this.props.currentCampaign.campaignDetails.level_limits,
            description: this.props.currentCampaign.campaignDetails.description,
            textSelectionStart: '',
            tab: false,
            edit: false,
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
            edit: false,
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

    toggleEdit = () => {
        this.setState({edit: !this.state.edit});
    }

    render() {

        const { name, img, description } = this.props.currentCampaign.campaignDetails;

        let render;

        if (this.state.edit) {
            render = (<div className='EditCampaignComponent'>
                    <div>
                        <p className="nameEdit text editText">Name:</p>{' '}
                        <input id='editInput' className='nameEditInput input' type="text" name="name" onChange={this.handleInput} value={this.state.name} placeholder='Name'/>
                    </div>
                    <div>
                        <p className='imgEdit text editText'>Image Url:</p>{' '}
                        <input id='editInput' className='imgEditInput input' type="text" name="img" onChange={this.handleInput} value={this.state.img} placeholder='Image Url'/>
                    </div>
                    <div className='levelEdit EditLevelRestrictions'>
                        <p className='text editText'>Level Restrictions:</p>
                        { !this.state.level_limits 
                            ? <input onClick={this.handleCheckbox} name="level_limits" type="checkbox" unchecked/>
                            : <input onClick={this.handleCheckbox} name="level_limits" type="checkbox" checked/>
                        }
                    </div>
                    <div className='EditDescContainer'>
                        <p className='descEdit text editText'>Description:</p>
                        <textarea id='textareaEdit' className='descEditInput textarea paper' name="description" ref={this.textarea} onKeyDown={this.handleTab} onChange={this.handleInput} value={this.state.description} cols="20" rows="2"></textarea>
                    </div>
                    <div>
                        <button className='submitEdit button' id='EditButton' onClick={this.submitEdit}>Submit</button>
                        <button className='resetEdit button' id='EditButton' onClick={this.reset}>Cancel</button>
                    </div>
                </div>
        )
        } else {
            render = (<div className='EditCampaignComponent'>
                <button className='button paper' onClick={this.toggleEdit}>Edit Campaign</button>
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

export default connect(mapStateToProps, { setCurrentCampaign })(EditCampaign);