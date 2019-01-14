import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { inputCharacterEdits } from '../../ducks/reducer/character_reducer.js';
import './PersonalDetails.css';
import { userInfo } from 'os';

class PersonalDetails extends Component {
    constructor(props) {
        super(props)

        this.textarea = React.createRef();

        this.state = {
            revealed: false,
        }
    }
    
    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    toggle = (event) => {
        const { name } =  event.target;
        this.setState({[name]: !this.state[name]});
    }

    handleInputPersonal = (event) => {
        let { name, value } = event.target;
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

    handleInputIncrement = (event) => {
        const { name, value } = event.target;
        let adj = this.props.characterChanges.personalDetails[name] === 0 ? 0 : this.props.characterChanges.personalDetails[name]|| this.props.character[name];
        if (value.includes('+')) {
            adj += 1;
            if (value.includes('7')) adj += 6;
            if (value.includes('10')) adj += 9;
            if (value.includes('12')) adj += 11;
            if (value.includes('30')) adj += 29;
            if (value.includes('100')) adj += 90;
            if (value.includes('365')) adj += 364;
            if (value.includes('36500')) adj += 36135;
        } else {
            adj -= 1;
            if (value.includes('7')) adj -= 6;
            if (value.includes('10')) adj -= 9;
            if (value.includes('12')) adj -= 11;
            if (value.includes('30')) adj -= 29;
            if (value.includes('100')) adj -= 90;
            if (value.includes('365')) adj -= 364;
            if (value.includes('36500')) adj -= 36135;
        }
        if (adj < 0) {
            adj = 0;
        }
        this.props.inputCharacterEdits('personalDetails', name, adj);
    }
    
    
    render() {

        const { description, eyes, hair, sex, img, height, weight, age, user_id } = this.props.character;
        const { is_dm } = this.props.currentCampaign.campaignDetails

        let heightDisplay = (<p>
            {Math.floor((this.props.characterChanges.personalDetails.height === 0 ? 0 : this.props.characterChanges.personalDetails.height || height || 0)/12)}'
            {(this.props.characterChanges.personalDetails.height === 0 ? 0 : this.props.characterChanges.personalDetails.height || height || 0)%12}"
        </p>
        )
        let ageDisplay = (<p>
            {Math.floor((this.props.characterChanges.personalDetails.age === 0 ? 0 : this.props.characterChanges.personalDetails.age || age || 0)/365)} Years {' '}
            {(this.props.characterChanges.personalDetails.age === 0 ? 0 : this.props.characterChanges.personalDetails.age || age || 0)%365} Days
        </p>
        )

        let user = this.props.currentCampaign.users.filter(user => user.user_id === user_id);

        let render;
        if (this.state.revealed) {
            render = (<div>
                <div className='SectionTitleBox'>
                    <h1 className='SectionTitle text'>Personal Details:</h1>
                    <button className='button' id='SectionButton' onClick={this.toggle} name='revealed'>v</button>
                </div>
                <hr/>
                <div>
                    <h1
                        className='Header text'
                        style={{display: description || this.props.edit ? '' : 'none'}}>Description:</h1>
                    <div
                        style={{display: description || this.props.edit ? '' : 'none'}}>
                         <p
                            className='MultilineDisplay text Text paper TextBackground'
                            style={{display: this.props.edit ? 'none' : '', width: 200, marginLeft: 5}}>{description}</p>
                        <textarea className='textarea paper' name="description" ref={this.textarea} onKeyDown={this.handleTab} onChange={this.handleInputPersonal} cols="30" rows="5" value={this.props.characterChanges.personalDetails.description
                            ? this.props.characterChanges.personalDetails.description
                            : this.props.characterChanges.personalDetails.description === ''
                                ? this.props.characterChanges.personalDetails.description
                                : description}
                            style={{display: this.props.edit ? '' : 'none' ,marginBottom: 10}}
                            maxLength='144'/>
                    </div>
                    <div
                        className='Container'>
                        <h1
                            className='Header text'
                            style={{display: eyes || this.props.edit ? '' : 'none'}}>Eyes:</h1>
                        <p
                            className='Text text'
                            style={{display: this.props.edit ? 'none' : ''}}>{eyes}</p>
                        <input className='input' name='eyes' onChange={this.handleInputPersonal} maxLength='25'
                            style={{display: this.props.edit ? '' : 'none'}}/>
                    </div>
                    <div
                        className='Container'>
                        <h1
                            className='Header text'
                            style={{display: hair || this.props.edit ? '' : 'none'}}>Hair:</h1>
                        <p
                            className='Text text'
                            style={{display: this.props.edit ? 'none' : ''}}>{hair}</p>
                        <input className='input' name='hair' onChange={this.handleInputPersonal} maxLength='25'
                            style={{display: this.props.edit ? '' : 'none'}}/>
                    </div>
                    <div>
                        <h1
                            className='Header text'
                            style={{display: sex && !this.props.edit ? '' : 'none'}}>{this.props.edit ? this.props.characterChanges.personalDetails.sex || sex : sex}</h1>
                        <div
                            className='alignmentSelect'
                            style={{marginTop: 2, width: 135, display: this.props.edit && is_dm ? '' : 'none'}}>
                            <select name="sex" onChange={this.handleInputPersonal}>
                                <option value="">--Select a gender--</option>
                                <option value="Male">Male ♂</option>
                                <option value="Female">Female ♀</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h1
                            className='Header text'
                            style={{display: height || (this.props.edit && is_dm) ? '' : 'none'}}>Height{this.props.edit ? '(In Inches)' : ''}:</h1>
                            <div
                                className='Container'>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 13, width: 13}} name='height' value='-12' onClick={this.handleInputIncrement}>-1'</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 13, width: 13}} name='height' value='-' onClick={this.handleInputIncrement}>-1"</button>
                                <p className='Text text'>{heightDisplay}</p>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 13, width: 13}} name='height' value='+' onClick={this.handleInputIncrement}>+1"</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 13, width: 13}} name='height' value='+12' onClick={this.handleInputIncrement}>+1'</button>
                            </div>
                    </div>
                    <div>
                        <h1
                            className='Header text'
                            style={{display: weight || (this.props.edit && is_dm)? '' : 'none'}}>Weight{this.props.edit ? '(In Gp.)' : ''}:</h1>
                            <div
                                className='Container'>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 17, width: 32, borderRadius: 5}} name='weight' value='-100' onClick={this.handleInputIncrement}>-100Gp.</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 15, width: 27, borderRadius: 5}} name='weight' value='-10' onClick={this.handleInputIncrement}>-10Gp.</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 13, width: 23, borderRadius: 5}} name='weight' value='-' onClick={this.handleInputIncrement}>-1Gp.</button>
                                <p className='text Text'>{this.props.characterChanges.personalDetails.weight === 0 ? 0 : this.props.characterChanges.personalDetails.weight || weight || 0} Gp.</p>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 13, width: 23, borderRadius: 5}} name='weight' value='+' onClick={this.handleInputIncrement}>+1Gp.</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 15, width: 27, borderRadius: 5}} name='weight' value='+10' onClick={this.handleInputIncrement}>+10Gp.</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 17, width: 34, borderRadius: 5}} name='weight' value='+100' onClick={this.handleInputIncrement}>+100Gp.</button>
                            </div>
                    </div>
                    <div>
                        <h1
                            className='Header text'
                            style={{display: age || (this.props.edit && is_dm) ? '' : 'none'}}>Age:</h1>
                            <div>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 17, width: 50, borderRadius: 7}} name='age' value='-36500' onClick={this.handleInputIncrement}>-100 Years</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 16, width: 50, borderRadius: 7}} name='age' value='-365' onClick={this.handleInputIncrement}>-1 Year</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 15, width: 42, borderRadius: 7}} name='age' value='-30' onClick={this.handleInputIncrement}>-1 Month</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 14, width: 38, borderRadius: 7}} name='age' value='-7' onClick={this.handleInputIncrement}>-1 Week</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 13, width: 32, borderRadius: 7}} name='age' value='-1' onClick={this.handleInputIncrement}>-1 Day</button>
                                <p className='Text text'>{ageDisplay}</p>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 13, width: 32, borderRadius: 7}} name='age' value='+1' onClick={this.handleInputIncrement}>+1 Day</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 14, width: 38, borderRadius: 7}} name='age' value='+7' onClick={this.handleInputIncrement}>+1 Week</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 15, width: 42, borderRadius: 7}} name='age' value='+30' onClick={this.handleInputIncrement}>+1 Month</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 16, width: 50, borderRadius: 7}} name='age' value='+365' onClick={this.handleInputIncrement}>+1 Year</button>
                                <button className='button' id='IncrementButton' style={{display: this.props.edit && is_dm ? '' : 'none', height: 17, width: 50, borderRadius: 7}} name='age' value='+36500' onClick={this.handleInputIncrement}>+100 Years</button>
                            </div>
                    </div>
                    <div
                        className='Container'>
                        <h1
                            className='Header text'
                            style={{display: this.props.edit ? '' : 'none'}}>Image URL:</h1>
                        <input className='input' name='img' onChange={this.handleInputPersonal} value={this.props.characterChanges.personalDetails.img}
                            style={{display: this.props.edit ? '' : 'none'}}/>
                    </div>
                    <div
                        style={{display: this.props.edit ? 'none' : ''}}
                        className='Container'>
                        <h1
                            className='Header text'>User:</h1>
                        <p
                            className='Text text'>{user.username}</p>
                    </div>
                </div>
            </div>)
        } else {
            render = (<div>
                <div className='SectionTitleBox'>
                    <h1 className='SectionTitle text'>Personal Details:</h1>
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

export default connect(mapStateToProps, { inputCharacterEdits })(PersonalDetails);