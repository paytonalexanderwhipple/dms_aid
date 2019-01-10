import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { inputCharacterEdits } from '../../ducks/reducer/character_reducer.js';

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

        const { description, eyes, hair, sex, img, height, weight, age } = this.props.character;
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

        let render;
        if (this.state.revealed) {
            render = (<div>
                <h1>Personal Details:</h1>
                <button onClick={this.toggle} name='revealed'>v</button>
                <div>
                    <h1
                        style={{display: description || this.props.edit ? '' : 'none'}}>Description:</h1>
                    <div
                        style={{display: description || this.props.edit ? '' : 'none'}}>
                         <p
                        className='MultilineDisplay'
                        style={{display: this.props.edit ? 'none' : ''}}>{description}</p>
                        <textarea name="description" ref={this.textarea} onKeyDown={this.handleTab} onChange={this.handleInputPersonal} cols="30" rows="5" value={this.props.characterChanges.personalDetails.description
                            ? this.props.characterChanges.personalDetails.description
                            : this.props.characterChanges.personalDetails.description === ''
                                ? this.props.characterChanges.personalDetails.description
                                : description}
                            style={{display: this.props.edit ? '' : 'none'}}
                            maxLength='144'/>
                    </div>
                    <div>
                        <h1
                            style={{display: eyes || this.props.edit ? '' : 'none'}}>Eyes:</h1>
                        <p
                            style={{display: this.props.edit ? 'none' : ''}}>{eyes}</p>
                        <input name='eyes' onChange={this.handleInputPersonal} maxLength='25'
                            style={{display: this.props.edit ? '' : 'none'}}/>
                    </div>
                    <div>
                        <h1
                            style={{display: hair || this.props.edit ? '' : 'none'}}>Hair:</h1>
                        <p
                            style={{display: this.props.edit ? 'none' : ''}}>{hair}</p>
                        <input name='hair' onChange={this.handleInputPersonal} maxLength='25'
                            style={{display: this.props.edit ? '' : 'none'}}/>
                    </div>
                    <div>
                        <h1
                            style={{display: sex || (this.props.edit && is_dm) ? '' : 'none'}}>Gender: {this.props.edit ? this.props.characterChanges.personalDetails.sex || sex : sex}</h1>
                        <select name="sex" onChange={this.handleInputPersonal} style={{display: this.props.edit && is_dm ? '' : 'none'}}>
                            <option value="">--Select a gender--</option>
                            <option value="Male">Male ♂</option>
                            <option value="Female">Female ♀</option>
                        </select>
                    </div>
                    <div>
                        <h1
                            style={{display: height || (this.props.edit && is_dm) ? '' : 'none'}}>Height{this.props.edit ? '(In Inches)' : ''}:</h1>
                            <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='height' value='-12' onClick={this.handleInputIncrement}>-12"</button>
                            <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='height' value='-' onClick={this.handleInputIncrement}>-1"</button>
                            <p>{heightDisplay}</p>
                            <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='height' value='+' onClick={this.handleInputIncrement}>+1"</button>
                            <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='height' value='+12' onClick={this.handleInputIncrement}>+12"</button>
                    </div>
                    <div>
                        <h1
                            style={{display: weight || (this.props.edit && is_dm)? '' : 'none'}}>Weight{this.props.edit ? '(In Gp.)' : ''}:</h1>
                            <div>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='weight' value='-100' onClick={this.handleInputIncrement}>-100Gp.</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='weight' value='-10' onClick={this.handleInputIncrement}>-10Gp.</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='weight' value='-' onClick={this.handleInputIncrement}>-1Gp.</button>
                                <p>{this.props.characterChanges.personalDetails.weight === 0 ? 0 : this.props.characterChanges.personalDetails.weight || weight || 0} Gp.</p>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='weight' value='+' onClick={this.handleInputIncrement}>+1Gp.</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='weight' value='+10' onClick={this.handleInputIncrement}>+10Gp.</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='weight' value='+100' onClick={this.handleInputIncrement}>+100Gp.</button>
                            </div>
                    </div>
                    <div>
                        <h1
                            style={{display: age || (this.props.edit && is_dm) ? '' : 'none'}}>Age:</h1>
                            <div>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='-36500' onClick={this.handleInputIncrement}>-100 Years</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='-365' onClick={this.handleInputIncrement}>-1 Year</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='-30' onClick={this.handleInputIncrement}>-1 Month</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='-7' onClick={this.handleInputIncrement}>-1 Week</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='-1' onClick={this.handleInputIncrement}>-1 Day</button>
                                <p>{ageDisplay}</p>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='+1' onClick={this.handleInputIncrement}>+1 Day</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='+7' onClick={this.handleInputIncrement}>+1 Week</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='+30' onClick={this.handleInputIncrement}>+1 Month</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='+365' onClick={this.handleInputIncrement}>+1 Year</button>
                                <button style={{display: this.props.edit && is_dm ? '' : 'none'}} name='age' value='+36500' onClick={this.handleInputIncrement}>+100 Years</button>
                            </div>
                    </div>
                    <div>
                        <img src={img} alt={description} style={{display: this.props.edit ? 'none' : ''}}/>
                        <h1
                            style={{display: this.props.edit ? '' : 'none'}}>Image URL:</h1>
                        <input name='img' onChange={this.handleInputPersonal} value={this.props.characterChanges.personalDetails.img || img} placeholder={img}
                            style={{display: this.props.edit ? '' : 'none'}}/>
                    </div>
                </div>
            </div>)
        } else {
            render = (<div>
                <h1>Personal Details:</h1>
                <button onClick={this.toggle} name='revealed'>></button>
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