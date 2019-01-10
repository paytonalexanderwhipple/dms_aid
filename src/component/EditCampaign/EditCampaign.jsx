import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { setCurrentCampaign } from '../../ducks/reducer/campaign_reducer.js';
import axios from 'axios';

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
                <textarea name="description" ref={this.textarea} onKeyDown={this.handleTab} onChange={this.handleInput} value={this.state.description} id="" cols="20" rows="3"></textarea>
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