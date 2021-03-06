import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { inputCharacterEdits } from '../../ducks/reducer/character_reducer.js';

class Notes extends Component {
    constructor(props) {
        super(props)
        
        this.textarea = React.createRef();

        this.state = {
            revealed: false,
            textSelectionStart: '',
            tab: false,
        }
    }

    toggle = (event) => {
        const { name } = event.target;
        this.setState({[name]: !this.state[name]});
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.props.inputCharacterEdits('personalDetails', name, value);
    } 

    handleTab = (event) => {
        let { value, name, selectionStart } = event.target;
        if (event.keyCode === 9) {
            event.preventDefault();
            value = value.slice(0, selectionStart) + '\t' + value.slice(selectionStart, );
            this.setState({textSelectionStart: selectionStart, tab: true})
            this.props.inputCharacterEdits('personalDetails', name, value);
        }
    }
    
    componentDidUpdate = (prevProps) => {
        if (this.props.characterChanges.abilities.special_abilities !== prevProps.characterChanges.abilities.special_abilities && this.state.tab) {
            this.textarea.current.selectionStart = this.state.textSelectionStart + 1;
            this.textarea.current.selectionEnd = this.state.textSelectionStart + 1;
            this.setState({tab: false});
        }
    }
    
    render() {

        const { notes, dm_notes } = this.props.character;
        const { is_dm } = this.props.currentCampaign.campaignDetails;

        let render;
        if (this.state.revealed) {
            render = (<div>
                <div className='SectionTitleBox'>
                    <h1 className='SectionTitle text'>Notes:</h1>
                    <button className='button' id='SectionButton' onClick={this.toggle} name='revealed'>v</button>
                </div>
                <hr/>
                <div
                    style={{display: is_dm ? 'none' : ''}}>
                    <p
                        className='text Text MultilinDisplay paper'
                        style={{display: this.props.edit ? 'none' : '', width: 200, marginLeft: 5}}>{notes}</p>
                    <textarea className='textarea paper' name="notes" ref={this.textarea} onKeyDown={this.handleTab} onChange={this.handleInput} cols="30" rows="10" value={this.props.characterChanges.personalDetails.notes
                        ? this.props.characterChanges.personalDetails.notes
                        : this.props.characterChanges.personalDetails.notes === ''
                            ? this.props.characterChanges.personalDetails.notes
                            : notes} 
                            style={{display: this.props.edit ? '' : 'none'}}/>
                </div>
                <div    
                    style={{display: is_dm ? '' : 'none'}}>
                    <p
                        className='text Text MultilineDisplay paper TextBackground'
                        style={{display: this.props.edit ? 'none' : '', width: 200, marginLeft: 5}}>{dm_notes}</p>
                    <textarea className='textarea paper' name="dm_notes" ref={this.textarea} onKeyDown={this.handleTab} onChange={this.handleInput} cols="30" rows="10" value={this.props.characterChanges.personalDetails.dm_notes
                        ? this.props.characterChanges.personalDetails.dm_notes
                        : this.props.characterChanges.personalDetails.dm_notes === ''
                            ? this.props.characterChanges.personalDetails.dm_notes
                            : dm_notes}
                        style={{display: this.props.edit ? '' : 'none'}}/>
                </div>
            </div>)
        } else {
            render = (<div>
                <div className='SectionTitleBox'>
                    <h1 className='SectionTitle text'>Notes:</h1>
                    <button className='button' id='SectionButton' onClick={this.toggle} name='revealed'>></button>
                </div>
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
    const { characterChanges } = state.character;
    const { currentCampaign } = state.campaign;
    return {
        characterChanges,
        currentCampaign,
    }
}

export default connect(mapStateToProps, { inputCharacterEdits })(Notes);