import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { inputCharacterEdits } from '../../ducks/reducer/character_reducer.js';


class Inventory extends Component {
    constructor(props) {
        super(props)

        this.textarea = React.createRef();
        
        this.state = {
            revealed: false,
            tab: false,
            textSelectionStart: '',
            name: '',
            encumbrance: 0,
        }
    }

    toggle = (event) => {
        const { name } = event.target;
        this.setState({[name]: !this.state[name]});
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    increment = (event) => {
        const { value, name } = event.target;
        let adj = this.state[name]
        if (value.includes('+')) {
            adj += 1;
            if (value.includes('10')) adj += 9;
            if (value.includes('100')) adj += 90;
            if (value.includes('1000')) adj += 900;
        } else {
            adj -= 1;
            if (value.includes('10')) adj -= 9;
            if (value.includes('100')) adj -= 90;
            if (value.includes('1000')) adj -= 900;
        }
        this.setState({[name]: adj});
    }

    handleItem = (event, item) => {
        const { name } = event.target;
        const arr = [...this.props.characterChanges.Inventory[name]];
        arr.push(item);
        if (name === 'createItem') {
            this.setState({name: '', encumbrance: 0});
        }
        this.props.inputCharacterEdits('Inventory', name, arr);
    }
    
    handleInputPersonal = (event) => {
        const { name, value } = event.target;
        this.props.inputCharacterEdits('personalDetails', name, value);
    } 

    handleTab = (event) => {
        let { value, name, selectionStart } = event.target;
        if (event.keyCode === 9) {
            event.preventDefault();
            value = value.slice(0, selectionStart) + '\t' + value.slice(selectionStart, );
            this.setState({textSelectionStart: selectionStart, tab: true});
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

    handleCoins = (event, i) => {
        const { value } = event.target;
        let arr = this.props.characterChanges.personalDetails.coinage || this.props.character.coinage;
        if (value.includes('+')) {
            arr[i] += 1;
            if (value.includes('10')) arr[i] += 9;
            if (value.includes('100')) arr[i] += 90;
            if (value.includes('1000')) arr[i] += 900;
        } else {
            arr[i] -= 1;
            if (value.includes('10')) arr[i] -= 9;
            if (value.includes('100')) arr[i] -= 90;
            if (value.includes('1000')) arr[i] -= 900;
        }
        if (arr[i] < 0) {
            arr[i] = 0;
        }
        this.props.inputCharacterEdits('personalDetails', 'coinage', arr);
    }

    render() {

        const { itemList, inventory, character_id, str, weaponDetails, armorDetails, coinage, base_movement } = this.props.character;
        const { is_dm, campaign_id } = this.props.currentCampaign.campaignDetails;
        
        let items = itemList.map((item, i)=> {
            let isDeleted = false;
            this.props.characterChanges.Inventory.deleteItem.forEach(iTem => {
                if (iTem.item_id === item.item_id) {
                    isDeleted = true
                }
            })
            return (
                <div
                    style={{display: isDeleted ? 'none' : ''}}>
                    <p>{item.name}</p>
                    <p
                        style={{display: item.encumbrance ? '' : 'none'}}>{item.encumbrance} Gp.</p>
                    <button name='deleteItem' onClick={event => this.handleItem(event, item)}
                        style={{display: this.props.edit && is_dm ? '' : 'none'}}>x</button>
                </div>
            )
        });

        let coins = coinage.map((coin, i) => {
            return (
                <div>
                    <button style={{display: this.props.edit ? '' : 'none'}} value='-1000' onClick={event => this.handleCoins(event, i)} >-1000</button>
                    <button style={{display: this.props.edit ? '' : 'none'}} value='-100' onClick={event => this.handleCoins(event, i)} >-100</button>
                    <button style={{display: this.props.edit ? '' : 'none'}} value='-10' onClick={event => this.handleCoins(event, i)} >-10</button>
                    <button style={{display: this.props.edit ? '' : 'none'}} value='-1' onClick={event => this.handleCoins(event, i)} >-1</button>
                    <p>{(this.props.characterChanges.personalDetails.coinage || [])[i] === 0 ? 0 : ((this.props.characterChanges.personalDetails.coinage || [])[i] || coinage[i])}</p>
                    <button style={{display: this.props.edit ? '' : 'none'}} value='+1' onClick={event => this.handleCoins(event, i)} >+1</button>
                    <button style={{display: this.props.edit ? '' : 'none'}} value='+10' onClick={event => this.handleCoins(event, i)} >+10</button>
                    <button style={{display: this.props.edit ? '' : 'none'}} value='+100' onClick={event => this.handleCoins(event, i)} >+100</button>
                    <button style={{display: this.props.edit ? '' : 'none'}} value='+1000' onClick={event => this.handleCoins(event, i)} >+1000</button>
                </div>
            )
        })

        let armorMovement; 
        armorDetails.forEach(armor => {
            if (!armor.name.includes('Shield')) {
                armorMovement = armor.max_move + (armor.ac_adj > 0 && armor.max_move < 120 ? 30 : 0);
            }
        })

        let armorEncumbrance = armorDetails.reduce((acc, armor) => {return acc + (armor.ac_adj > 0 && !armor.name.includes('Shield') ? 0 : armor.encumbrance)}, 0);
        let weaponEncumbrance = weaponDetails.reduce((acc, weapon) => {
            return acc + weapon.encumbrance + weapon.ammoDetails.reduce((acc, ammo) => {
                return acc + (ammo.encumbrance * ammo.quanity)
            }, 0);
        }, 0);
        let itemEncumbrance = itemList.reduce((acc, item) => {
            return acc + item.encumbrance;
        }, 0);
        let coinEncumbrance = coinage.reduce((acc, coin) => {
            return acc + coin;
        }, 0);
        let encumbrance = armorEncumbrance + weaponEncumbrance + itemEncumbrance + coinEncumbrance;
        let encumbranceText;
        let movement = base_movement;
        let surprise = '';

        if (encumbrance - str.encumbranceAdj > 1500) {
            movement -= 120;
            surprise = 'None';
            encumbranceText = 'Overwhelming';
        } else if (encumbrance - str.encumbranceAdj > 1050 || armorMovement === 30) {
            movement -= (base_movement === 90 ? 60 :90);
            surprise = '-1(No Bonuses)';
            encumbranceText = 'Heavy';
        } else if (encumbrance - str.encumbranceAdj > 700 || armorMovement === 60) {
            movement -= 60;
            surprise = '0(No Bonuses)';
            encumbranceText = 'Moderate';
        } else if (encumbrance - str.encumbranceAdj > 350 || armorMovement === 90) {
            movement -= 30;
            encumbranceText = 'Light';
        } else {
            surprise = '+1';
            encumbranceText = 'None';
        }


        let render;
        if (this.state.revealed) {
            render = (<div>
                <h1>Inventory:</h1>
                <button onClick={this.toggle} name='revealed'>v</button>
                <h1>Carrying:</h1>
                <div>
                    {items}
                    <div
                        style={{display: this.props.edit && is_dm ? '' : 'none'}}>
                        <input placeholder='Name' name='name' value={this.state.name} onChange={this.handleInput} maxLength='30'/>
                        <div>
                            <button name='encumbrance' value='-1000' onClick={this.increment}>-1000</button>
                            <button name='encumbrance' value='-100' onClick={this.increment}>-100</button>
                            <button name='encumbrance' value='-10' onClick={this.increment}>-10</button>
                            <button name='encumbrance' value='-1' onClick={this.increment}>-1</button>
                            <p>{this.state.encumbrance}</p>
                            <button name='encumbrance' value='+1' onClick={this.increment}>+1</button>
                            <button name='encumbrance' value='+10' onClick={this.increment}>+10</button>
                            <button name='encumbrance' value='+100' onClick={this.increment}>+100</button>
                            <button name='encumbrance' value='+1000' onClick={this.increment}>+1000</button>
                        </div>
                        <button
                            name='createItem' onClick={event => this.handleItem(event, {name: this.state.name, encumbrance: this.state.encumbrance, character_id, campaign_id})}>+</button>
                    </div>
                </div>
                <div>
                    <h1 style={{display: this.props.edit || inventory ? '' : 'none'}}></h1>
                    <p
                        className='MultilineDisplay'
                        style={{display: this.props.edit ? 'none' : ''}}>{inventory}</p>
                    <textarea name="inventory" ref={this.textarea} onKeyDown={this.handleTab} onChange={this.handleInputPersonal} cols="30" rows="10" value={this.props.characterChanges.personalDetails.inventory
                        ? this.props.characterChanges.personalDetails.inventory
                        : this.props.characterChanges.personalDetails.inventory === ''
                            ? this.props.characterChanges.personalDetails.inventory
                            : inventory}
                        style={{display: this.props.edit ? '' : 'none'}}/>
                </div>
                <div>
                    <p>Cp: {coins[0]}</p>
                    <p>Sp: {coins[1]}</p>
                    <p>Ep: {coins[2]}</p>
                    <p>Gp: {coins[3]}</p>
                    <p>Pp: {coins[4]}</p>
                </div>
                <div>
                    <h1>Encumbrance: {encumbranceText}-{encumbrance}Gp.</h1>
                    <p>Movement: {movement}'</p>
                    <p
                        style={{display: surprise ? '' : 'none'}}>Surprise: {surprise}</p>
                </div>
            </div>)
        } else {
            render = (<div>
                <h1>Inventory:</h1>
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

export default connect(mapStateToProps, { inputCharacterEdits })(Inventory);