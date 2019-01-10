import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { inputCharacterEdits } from '../../ducks/reducer/character_reducer';
import './Combat.css';

class Combat extends Component {
    constructor(props) {
        super(props)

        this.armorSelect = React.createRef();
        this.shieldSelect = React.createRef();
        
        this.state = {
            revealed: false,
            currentHP: this.props.character.hp,
        }
    }
    
    toggle = (event) => {
        const { name } = event.target;
        this.setState({[name]: !this.state[name]});
    }
    
    increment = (event) => {
        let { name, value } = event.target;
        let item = this.state[name];
        if (value === '+') {
            item += 1
        } else {
            item -= 1 
        }
        this.setState({[name]: item});
    }

    handleInputIncrement = (event, place) => {
        const { name, value } = event.target;
        let adj = this.props.characterChanges[place][name] === 0 ? 0 : this.props.characterChanges[place][name]|| this.props.character[name];
        if (value.includes('+')) adj += 1
        else adj -= 1
        this.props.inputCharacterEdits(place, name, adj);
    }

    handleInputAdj = (event, object, place) => {
        const { name, value } = event.target;
        let adjObj;
        let index;
        this.props.characterChanges.combat[place].forEach((obj, i) => {
            if (place === 'weapons') {
                if (object.character_weapon_id === obj.character_weapon_id) {
                    adjObj = obj;
                    index = i;
                }
            } else if (place === 'ammo'){
                if (object.character_weapon_ammo_id === obj.character_weapon_ammo_id) {
                    adjObj = obj;
                    index = i;
                }
            } else if (place === 'armor' || place === 'shield') {
                if (object.character_armor_id === obj.character_armor_id) {
                    adjObj = obj;
                }
            }
        });
        let adj = {...(adjObj || object)};
        if (value.includes('+')) {
            if (value.includes('*5')) {
                adj[name] += 4
            }
            adj[name] += 1
        } else {
            if (name === "quantity" && adj[name] - 1 <= 0) {
                adj[name] = 0
            } else {
                if (value.includes('*5')) {
                    adj[name] -= 4
                }
                adj[name] -= 1
            }
        }
        let arr = this.props.characterChanges.combat[place] || [];
        if (place === 'weapons') {
            if (arr[index]) {
                arr[index] = {...adj};
            } else {
                arr.push({...adj});
            }
        } else if (place === 'ammo') {
            if (arr[index]) {
                arr[index] = {...adj};
            } else {
                arr.push({...adj});
            }
        } else {
            arr[0] = {...adj}
        }
        this.props.inputCharacterEdits('combat', place, arr);
    
    }

    handleInputNew = (event, id) => {
        const { name, value } = event.target;
        let arr = this.props.characterChanges.combat[name] || [];
        if (name === 'newAmmo') {
            arr.push({type: value, character_weapon_id: id})
        } else if (name === 'newWeapon') {
            arr.push({weapon_name: value, character_id: id})
        } else if (name === 'newArmor' || name === 'newShield') {
            arr = {name: value, character_id: id}
        }
        this.props.inputCharacterEdits('combat', name, arr);
    }

    handleInputDelete = (event, id) => {
        const { name } = event.target
        let arr = this.props.characterChanges.combat[name];
        arr = [...arr, id]
        this.props.inputCharacterEdits('combat', name, arr);
    }

    render() {

        const { is_dm } = this.props.currentCampaign.campaignDetails;

        const { str, dex, weaponDetails, race, ac_bonus, classDetails, proficiencies, character_id, armorDetails, savingThrows, saving_throw_adj, special_attack, resistances } = this.props.character;

        let nonProficiencyPenalty = classDetails.reduce((acc, cLass) => {
            if(acc >= cLass.non_proficiency_penalty) {
                return cLass.non_proficiency_penalty;
            } else {
                return acc;
            }
        }, 10)
        const weapons = weaponDetails.map(weapon => {
            const { name, damage_large, damage_small_medium, ammoDetails } = weapon
            let weaponUpdate;
            this.props.characterChanges.combat.weapons.forEach(obj => {
                if (obj.character_weapon_id === weapon.character_weapon_id) {
                    weaponUpdate = obj;
                }
            })

            let weaponMagicAttackAdj = (is_dm ? ((weaponUpdate || {}).attack_adj === 0 ? 0 :( weaponUpdate || weapon ).attack_adj || weapon.attack_adj) : 0);
            let proficiencyAdj = (!proficiencies.includes(weapon.name) ? -nonProficiencyPenalty : 0);
            let toHit = str.toHit + proficiencyAdj + weaponMagicAttackAdj;
            if (race === 'Elf' && (weapon.name === 'Long-Sword' || weapon.name === 'Short-Sword' || weapon.name === 'Long-Bow' || weapon.name === 'Short-Bow' || weapon.name === 'Composite-Long-Bow' || weapon.name === 'Composite-Short-Bow')) {
                toHit += 1
            }
            let weaponMagicDamageAdj = (is_dm ? ((weaponUpdate || {}).damage_adj === 0 ? 0 : ( weaponUpdate || weapon ).damage_adj || weapon.damage_adj) : 0);
            let damage = str.damage + weaponMagicDamageAdj;
            let ammoOptions = weapon.ammo_types.map(ammo => {
                let ammoTypeData = {};
                this.props.characterData.ammo.forEach(ammoType => {
                    if (ammoType.type === ammo) {
                        ammoTypeData = ammoType
                    }
                });
                return (
                    <option value={ammo}>Add: {ammoTypeData.name}</option>
                )
            });
            let ammo = ammoDetails.map(ammo => {
                const { name, damage_large, damage_small_medium, rate_of_fire, range } = ammo
                let ammoUpdate;
                this.props.characterChanges.combat.ammo.forEach(obj => {
                    if (obj.character_weapon_ammo_id === ammo.character_weapon_ammo_id) {
                        ammoUpdate = obj;
                    }
                })
                let ammoMagicAttackAdj = (is_dm ? ((ammoUpdate || {}).attack_adj === 0 ? 0 : ( ammoUpdate || ammo ).attack_adj || ammo.attack_adj) : 0);
                let toHit = dex.missile + proficiencyAdj + ammoMagicAttackAdj + weaponMagicAttackAdj;
                if (race === 'Elf' && (weapon.name === 'Short-Bow' || weapon.name === 'Long-Bow' || weapon.name === 'Composite-Short-Bow' || weapon.name === 'Composite-Long-Bow')) {
                    toHit += 1
                }
                if (race === 'Halfling' && (weapon.name === 'Short-Bow' || weapon.name === 'Long-Bow' || weapon.name === 'Composite-Short-Bow' || weapon.name === 'Composite-Long-Bow' || weapon.name === 'Sling')) {
                    toHit += 3
                }
                let ammoMagicDamageAdj = (is_dm ? ((ammoUpdate || {}).damage_adj === 0 ? 0 : ( ammoUpdate || ammo ).damage_adj || ammo.damage_adj) : 0)
                let ammoStrAdj = (name === 'Hand-Axe' || name === 'Club' || name === 'Dagger' || name === 'Dart' || name === 'Hammer' || name === 'Javelin' || name === 'Spear' ? str.damage : 0);
                let damage = weaponMagicDamageAdj + ammoMagicDamageAdj + ammoStrAdj;
                let newQuantity = ( ammoUpdate || ammo ).quantity;
                let quantityDisplay = [];
                for (;newQuantity >= 100 && quantityDisplay.length < 20; newQuantity -= 100) {
                    quantityDisplay.push((
                        <div className='quantityMarker qm100'/>
                    ))
                }
                for (;newQuantity >= 20 && quantityDisplay.length < 20; newQuantity -= 20) {
                    quantityDisplay.push((
                        <div className='quantityMarker qm20'/>
                    ))
                }
                for(;newQuantity >= 5 && quantityDisplay.length < 20; newQuantity -= 5) {
                    quantityDisplay.push((
                        <div className='quantityMarker qm5'/>
                    ))
                }
                for (;newQuantity > 0 && quantityDisplay.length < 20; newQuantity -= 1) {
                    quantityDisplay.push((
                        <div className='quantityMarker'/>
                    ));
                }
                return (
                    <div
                        style={{display: this.props.characterChanges.combat.deleteAmmo.includes((ammoUpdate || ammo).character_weapon_ammo_id) ? 'none' : ''}}>
                        <h1>{name} <button name='deleteAmmo' onClick={event => this.handleInputDelete(event, ammo.character_weapon_ammo_id)} style={{display: this.props.edit && is_dm ? '' : 'none'}}>x</button>
                            (<button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, ammo, 'ammo')}
                                name='attack_adj'
                                value='-'>-</button>
                                <p>To Hit: {toHit > 0 ? '+' : ''}{toHit}</p>
                                <div
                                    style={{display: this.props.advanced ? '' : 'none'}}>
                                        <h1>Dexterity:</h1>
                                            <p>{dex.missile > 0 ? '+' : ''}{dex.missile}</p>
                                        <h1
                                            style={{display: !proficiencies.includes(weapon.name) ? '' : 'none'}}>Non-Proficiency:</h1>
                                        <p
                                            style={{display: !proficiencies.includes(weapon.name) ? '' : 'none'}}>-{nonProficiencyPenalty}</p>
                                        <h1
                                            style={{display: is_dm && ammoMagicAttackAdj ? '' : 'none'}}>Magic Adj(Ammo):</h1>
                                            <p
                                                style={{display: is_dm && ammoMagicAttackAdj ? '' : 'none'}}>{ammoMagicAttackAdj > 0 ? '+' : ''}{ammoMagicAttackAdj}</p>
                                        <h1
                                            style={{display: is_dm && ammoMagicAttackAdj ? '' : 'none'}}>Magic Adj(Weapon):</h1>
                                            <p
                                                style={{display: is_dm && ammoMagicAttackAdj ? '' : 'none'}}>{weaponMagicAttackAdj > 0 ? '+' : ''}{weaponMagicAttackAdj}</p>
                                        <h1
                                            style={{display: race === 'Elf' && (weapon.name === 'Short-Bow' || weapon.name === 'Long-Bow' || weapon.name === 'Composite-Short-Bow' || weapon.name === 'Composite-Long-Bow') ? '' : 'none'}}>Racial Adj(Elf):</h1>
                                            <p
                                                style={{display: race === 'Elf' && (weapon.name === 'Short-Bow' || weapon.name === 'Long-Bow' || weapon.name === 'Composite-Short-Bow' || weapon.name === 'Composite-Long-Bow') ? '' : 'none'}}>+1</p>
                                        <h1
                                            style={{display: race === 'Halfling' && (weapon.name === 'Short-Bow' || weapon.name === 'Long-Bow' || weapon.name === 'Composite-Short-Bow' || weapon.name === 'Composite-Long-Bow' || weapon.name === 'Sling') ? '' : 'none'}}>Racial Adj(Halfling):</h1>
                                            <p
                                                style={{display: race === 'Halfling' && (weapon.name === 'Short-Bow' || weapon.name === 'Long-Bow' || weapon.name === 'Composite-Short-Bow' || weapon.name === 'Composite-Long-Bow' || weapon.name === 'Sling') ? '' : 'none'}}>+3</p>
                                </div>
                                {' '}
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, ammo, 'ammo')}
                                name='attack_adj'
                                value='+'>+</button>
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, ammo, 'ammo')}
                                name='damage_adj'
                                value='-'>-</button>
                            <p>Damage: {damage > 0 ? '+' : ''}{damage}</p>
                            <div
                                style={{display: this.props.advanced ? '' : 'none'}}>
                                <h1
                                    style={{display: name === 'Hand-Axe' || name === 'Club' || name === 'Dagger' || name === 'Dart' || name === 'Hammer' || name === 'Javelin' || name === 'Spear' ? '' : 'none'}}>Strength:</h1>
                                    <p
                                        style={{display: name === 'Hand-Axe' || name === 'Club' || name === 'Dagger' || name === 'Dart' || name === 'Hammer' || name === 'Javelin' || name === 'Spear' ? '' : 'none'}}>{ammoStrAdj > 0 ? '+' : ''}{ammoStrAdj}</p>
                                <h1
                                    style={{display: is_dm && ammoMagicDamageAdj ? '' : 'none'}}>Magic Adj(Ammo):</h1>
                                    <p
                                        style={{display: is_dm && ammoMagicDamageAdj ? '' : 'none'}}>{ammoMagicDamageAdj > 0 ? '+' : ''}{ammoMagicDamageAdj}</p>
                                <h1
                                    style={{display: is_dm && weaponMagicDamageAdj ? '' : 'none'}}>Magic Adj(Weapon):</h1>
                                    <p
                                        style={{display: is_dm && weaponMagicDamageAdj? '' : 'none'}}>{weaponMagicDamageAdj > 0 ? '+' : ''}{weaponMagicDamageAdj}</p>
                            </div>
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, ammo, 'ammo')}
                                name='damage_adj'
                                value='+'>+</button>)
                        </h1>
                        <p>Damage S/M: {damage_small_medium} Damage L: {damage_large}</p>
                        <p>Range: {range}' Fire-Rate: {rate_of_fire}</p>
                        <div>Quantity: 
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, ammo, 'ammo')}
                                name='quantity'
                                value='-*5'
                                >-5</button>
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, ammo, 'ammo')}
                                name='quantity'
                                value="-">
                                -</button>
                            <span className="quantityBox">
                                {quantityDisplay}
                            </span>
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, ammo, 'ammo')}
                                name='quantity'
                                value="+">
                                +</button>
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, ammo, 'ammo')}
                                name='quantity'
                                value='+*5'
                                >+5</button>
                        </div>
                    </div>
                )
            })
            return (
                <div
                    style={{display: this.props.characterChanges.combat.deleteWeapon.includes((weaponUpdate || weapon).character_weapon_id) ? 'none' : ''}}>
                    <h1>{name} <button name='deleteWeapon' onClick={event => this.handleInputDelete(event, weapon.character_weapon_id)} style={{display: this.props.edit && is_dm ? '' : 'none'}}>x</button>
                        <div
                            style={{display: damage_large !== 'N/A' || is_dm
                                ? ''
                                : 'none'
                            }}>
                            (<button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, weapon, 'weapons')}
                                name='attack_adj'
                                value='-'>-</button>
                                <p>To Hit: { (damage_large === 'N/A' ? toHit + dex.missile - str.toHit : toHit) > 0 ? '+' : '' }{ (damage_large === 'N/A' ? toHit + dex.missile - str.toHit : toHit) }</p>
                                <div
                                    style={{display: this.props.advanced ? '' : 'none'}}>
                                    <h1
                                        style={{display: damage_large !== 'N/A' ? '' : 'none'}}>Strength:</h1>
                                        <p
                                            style={{display: damage_large !== 'N/A' ? '' : 'none'}}>{str.toHit > 0 ? '+' : ''}{str.toHit}</p>
                                    <h1
                                        style={{display: damage_large !== 'N/A' ? 'none' : ''}}>Dexterity:</h1>
                                        <p
                                            style={{display: damage_large !== 'N/A' ? 'none' : ''}}>{dex.missile > 0 ? '+' : ''}{dex.missile}</p>
                                    <h1
                                        style={{display: !proficiencies.includes(weapon.name) ? '' : 'none'}}>Non-Proficiency:</h1>
                                        <p
                                            style={{display: !proficiencies.includes(weapon.name) ? '' : 'none'}}>-{nonProficiencyPenalty}</p>
                                    <h1
                                        style={{display: is_dm && weaponMagicAttackAdj ? '' : 'none'}}>Magic Adj:</h1>
                                        <p
                                             style={{display: is_dm && weaponMagicAttackAdj ? '' : 'none'}}>{weaponMagicAttackAdj > 0 ? '+' : ''}{weaponMagicAttackAdj}</p>
                                    <h1
                                        style={{display: race === 'Elf' && (weapon.name === 'Short-Sword' || weapon.name === 'Long-Bow' || weapon.name === 'Short-Bow' || weapon.name === 'Composite-Long-Bow' || weapon.name === 'Composite-Short-Bow' || weapon.name === 'Long-Sword') ? '' : 'none'}}>Racial Adj(Elf):</h1>
                                        <p
                                            style={{display: race === 'Elf' && (weapon.name === 'Short-Sword' || weapon.name === 'Long-Bow' || weapon.name === 'Short-Bow' || weapon.name === 'Composite-Long-Bow' || weapon.name === 'Composite-Short-Bow' || weapon.name === 'Long-Sword') ? '' : 'none'}}>+1</p>
                                </div>{' '}
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, weapon, 'weapons')}
                                name='attack_adj'
                                value='+'>+</button>
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, weapon, 'weapons')}
                                name='damage_adj'
                                value='-'>-</button>
                                <p>Damage: { (damage_large !== 'N/A' && (name === 'Hand-Axe' || name === 'Club' || name === 'Dagger' || name === 'Dart' || name === 'Hammer' || name === 'Javelin' || name === 'Spear') ? damage : damage - str.damage) > 0 ? '+' : '' }{ (damage_large !== 'N/A' && (name === 'Hand-Axe' || name === 'Club' || name === 'Dagger' || name === 'Dart' || name === 'Hammer' || name === 'Javelin' || name === 'Spear') ? damage : damage - str.damage) }</p>
                                <div
                                    style={{display: this.props.advanced ? '' : 'none'}}>
                                    <h1
                                        style={{display: damage_large !== 'N/A' && (name === 'Hand-Axe' || name === 'Club' || name === 'Dagger' || name === 'Dart' || name === 'Hammer' || name === 'Javelin' || name === 'Spear') ? '' : 'none'}}>Strength:</h1>
                                        <p
                                            style={{display: damage_large !== 'N/A' && (name === 'Hand-Axe' || name === 'Club' || name === 'Dagger' || name === 'Dart' || name === 'Hammer' || name === 'Javelin' || name === 'Spear') ? '' : 'none'}}>{str.damage > 0 ? '+' : ''}{str.damage}</p>
                                    <h1
                                        style={{display: is_dm && weaponMagicDamageAdj ? '' : 'none'}}>Magic Adj:</h1>
                                        <p
                                            style={{display: is_dm && weaponMagicDamageAdj ? '' : 'none'}}>{weaponMagicDamageAdj > 0 ? '+' : ''}{weaponMagicDamageAdj}</p>
                                </div>
                            <button
                                style={{display: this.props.edit && is_dm ? '' : 'none'}}
                                onClick={event => this.handleInputAdj(event, weapon, 'weapons')}
                                name='damage_adj'
                                value='+'>+</button>)
                        </div>
                    </h1>
                    <p
                        style={{display: damage_large === 'N/A'
                            ? 'none'
                            : ''
                        }}>
                        Damage S/M: {damage_small_medium} Damage L: {damage_large}
                    </p>
                    <p
                        style={{display: ammoDetails.length >= 1
                            ? ''
                            : 'none'
                        }}>
                        Ammo:{ammo}
                    </p>
                    <div
                        style={{display: this.props.edit && ammoOptions.length > 0 && is_dm ? '' : 'none'}}>
                            <select name="newAmmo" value="" onChange={event => this.handleInputNew(event, weapon.character_weapon_id)}>
                                <option value="">--Add new ammo--</option>
                                {ammoOptions}
                            </select>
                        </div>
                </div>
            )
        })

        let weaponOptions = this.props.characterData.weapons.map(weapon => {
            return (
                <option value={weapon.name}>Add: {weapon.name}</option>
            )
        })

        let armor;
        let shield;

        armorDetails.forEach(piece => {
            if (piece.name.includes('Shield')) {
                shield = piece;
            } else {
                armor = piece;
            }
        })


        let armorOptions = [];
        let shieldOptions = [];

        this.props.characterData.armor.forEach(aRmor => {
            if (!aRmor.name.includes('Shield') && aRmor.name !== (armor || {}).name) {
                armorOptions.push(<option value={aRmor.name}>{aRmor.name}</option>);
            } else if (aRmor.name !== (shield || {}).name && aRmor.name.includes('Shield')){
                shieldOptions.push(<option value={aRmor.name}>{aRmor.name}</option>);
            }
        })

        let thac = classDetails.reduce((acc, cLass) => {
            if (acc[0] > cLass.thac[0]) {
                return cLass.thac;
            } else {
                return acc;
            }
        }, [15])

        let specialAttacks = special_attack.split('&').map(entry => {
            return (
                <p>{entry}</p>
            )
        })

        let rEsistances = resistances.split('&').map(entry => {
            return (
                <p>{entry}</p>
            )
        })

    return (
        <div>
            <h1>Combat:</h1>
            <button onClick={this.toggle} name='revealed'>{this.state.revealed ? 'v' : '>'}</button>
            <div
                style={{display: this.state.revealed ? '' : 'none'}}>
                <h1>HP:</h1>
                <p>{this.state.currentHP}</p>
                <button onClick={this.increment} value='-' name="currentHP">-</button>
                <button onClick={this.increment} value='+' name="currentHP">+</button>
                <div>
                    <h1>Weapons:</h1>
                    {weapons}
                    <div
                        style={{display: this.props.edit && is_dm ? '' : 'none'}}>
                        <select name="newWeapon" value="" onChange={event => this.handleInputNew(event, character_id)}>
                            <option value="">--Choose new Weapon--</option>
                            {weaponOptions}
                        </select>
                    </div>
                </div>
                <div>
                    <h1>THAC:</h1>
                    <div>
                        <p>ac</p>
                        <p>10</p>
                        <p>9</p>
                        <p>8</p>
                        <p>7</p>
                        <p>6</p>
                        <p>5</p>
                        <p>4</p>
                        <p>3</p>
                        <p>2</p>
                        <p>1</p>
                        <p>0</p>
                        <p>-1</p>
                        <p>-2</p>
                        <p>-3</p>
                        <p>-4</p>
                        <p>-5</p>
                        <p>-6</p>
                        <p>-7</p>
                        <p>-8</p>
                        <p>-9</p>
                        <p>-10</p>
                        <p>To Hit</p>
                        <p>{thac[0]}</p>
                        <p>{thac[1]}</p>
                        <p>{thac[2]}</p>
                        <p>{thac[3]}</p>
                        <p>{thac[4]}</p>
                        <p>{thac[5]}</p>
                        <p>{thac[6]}</p>
                        <p>{thac[7]}</p>
                        <p>{thac[8]}</p>
                        <p>{thac[9]}</p>
                        <p>{thac[10]}</p>
                        <p>{thac[11]}</p>
                        <p>{thac[12]}</p>
                        <p>{thac[13]}</p>
                        <p>{thac[14]}</p>
                        <p>{thac[15]}</p>
                        <p>{thac[16]}</p>
                        <p>{thac[17]}</p>
                        <p>{thac[18]}</p>
                        <p>{thac[19]}</p>
                        <p>{thac[20]}</p>
                        <p>{thac[21]}</p>
                    </div>
                </div>
                <div
                    style={{display: !this.props.edit}}>
                    <h1>AC: {10 + armor.ac_mod + shield.ac_mod  + dex.ac - (is_dm ? (ac_bonus + shield.ac_adj + armor.ac_adj) : 0)}</h1>
                    <h1>Shieldless: {10 + armor.ac_mod + dex.ac - (is_dm ? (ac_bonus + armor.ac_adj) : 0)}</h1>
                    <h1>Rear: {10 + armor.ac_mod - (is_dm ? (ac_bonus + armor.ac_adj) : 0)}</h1>
                    <div
                        style={{display: this.props.edit && is_dm ? '' : 'none'}}>
                        <button
                            onClick={event => this.handleInputIncrement(event, 'personalDetails')} name='ac_bonus' value='-'>-</button>
                        <h1>{(this.props.characterChanges.personalDetails.ac_bonus === 0 ? 0 :(this.props.characterChanges.personalDetails.ac_bonus || ac_bonus)) > 0 ? '+' : ''}{this.props.characterChanges.personalDetails.ac_bonus === 0 ? 0 :(this.props.characterChanges.personalDetails.ac_bonus || ac_bonus)}</h1>
                        <button
                            onClick={event => this.handleInputIncrement(event, 'personalDetails')} name='ac_bonus' value='+'>+</button>
                     </div>
                        <div
                            style={{display: this.props.advanced ? '' : 'none'}}>
                                <h1>Dexterity:</h1>
                                    <p>{dex.ac > 0 ? '+' : ''}{dex.ac}</p>
                                <h1
                                        style={{display: armor ? '' : 'none'}}>Armor: {armor.name}{is_dm && armor.ac_adj ? ` ${armor.ac_adj > 0 ? "+" : ''}${armor.ac_adj}` : ''}</h1>
                                    <p>{armor.ac_mod - (is_dm ? armor.ac_adj : 0) > 0 ? '+' : ''}{armor.ac_mod - (is_dm ? armor.ac_adj : 0)}</p>
                                <h1
                                    style={{display: shield ? '' : 'none'}}>Shield: {shield.name}{is_dm && shield.ac_adj ? ` ${shield.ac_adj > 0 ? "+" : ''}${shield.ac_adj}` : ''}</h1>
                                    <p>{shield.ac_mod - (is_dm ? shield.ac_adj : 0) > 0 ? '+' : ''}{shield.ac_mod - (is_dm ? shield.ac_adj : 0)}</p>
                                <h1
                                    style={{display: is_dm && ac_bonus ? '' : 'none'}}>Magic Adj:</h1>
                                    <p
                                        style={{display: is_dm && ac_bonus ? '' : 'none'}}>{ac_bonus < 0 ? '+' : (ac_bonus > 0 ? '-' : '')}{Math.abs(ac_bonus)} </p>
                        </div>
                    </div>
                    <div
                        style={{display: armor.name === 'None' ? 'none' : ''}}>
                        <h1>Armor:</h1>
                        <p>
                            {this.props.characterChanges.combat.newArmor.name || `${armor.name} ${is_dm ? (armor.ac_adj > 0 ? "+" : '') : ''}${is_dm && armor.ac_adj ? armor.ac_adj : ''}`}
                            <div
                                style={{display: this.props.edit && !this.armorSelect.current.value && is_dm ? '' : 'none'}}>
                                <button
                                    onClick={event => this.handleInputAdj(event, armor, 'armor')}
                                    name='ac_adj'
                                    value='-'>-</button>
                                {this.props.characterChanges.combat.newArmor.name 
                                    ? (( this.props.characterChanges.combat.newArmor[0] || armor ).ac_adj > 0 ? '+' : '' ) + ( this.props.characterChanges.combat.newArmor[0] || armor ).ac_adj || 0 
                                    : (( this.props.characterChanges.combat.armor[0] || armor ).ac_adj > 0 ? '+' : '' ) + ( this.props.characterChanges.combat.armor[0] || armor ).ac_adj || 0 
                                }
                                <button
                                    onClick={event => this.handleInputAdj(event, armor, 'armor')}
                                    name='ac_adj'
                                    value='+'>+</button>
                            </div>
                        </p>
                        <div
                            style={{display: this.props.edit && is_dm ? '' : 'none'}}>
                            <select name="newArmor" ref={this.armorSelect} value={ this.props.characterChanges.combat.newArmor.name || '' } onChange={event => this.handleInputNew(event, character_id)}>
                                <option value="">--Choose Armor--</option>
                                <option value=''>-Reset-</option>
                                {armorOptions}
                            </select>
                        </div>
                    </div>
                    <div
                        style={{display: shield ? '' : 'none'}}>
                        <h1>Shield:</h1>
                        <p>
                            {this.props.characterChanges.combat.newShield.name || `${shield.name} ${is_dm ? (shield.ac_adj > 0 ? "+" : '') : ''}${is_dm && shield.ac_adj ? shield.ac_adj : ''}`}
                            <div
                                style={{display: this.props.edit && !this.shieldSelect.current.value && is_dm ? '' : 'none'}}>
                                <button
                                    onClick={event => this.handleInputAdj(event, shield, 'shield')}
                                    name='ac_adj'
                                    value='-'>-</button>
                                {( this.props.characterChanges.combat.shield[0] || shield ).ac_adj > 0 ? '+' : ''}{( this.props.characterChanges.combat.shield[0] || shield ).ac_adj || 0}
                                <button
                                    onClick={event => this.handleInputAdj(event, shield, 'shield')}
                                    name='ac_adj'
                                    value='+'>+</button>
                            </div>
                        </p>
                        <div
                            style={{display: this.props.edit && is_dm ? '' : 'none'}}>
                            <select name="newShield" ref={this.shieldSelect} value={ this.props.characterChanges.combat.newShield.name || ''} onChange={event => this.handleInputNew(event, character_id)}>
                                <option value="">--Choose Shield--</option>
                                <option value="">-Reset-</option>
                                {shieldOptions}
                            </select>
                        </div>
                    </div>
                    <h1>Saving Throws:</h1>
                    <div>
                        <p>Rod, Staff, or Wand</p><p>{savingThrows[0] + (is_dm ? 0 : saving_throw_adj)}</p>
                        <p>Breath Weapons</p><p>{savingThrows[1] + (is_dm ? 0 : saving_throw_adj)}</p>
                        <p>Death, Paralysis, Poison</p><p>{savingThrows[2] + (is_dm ? 0 : saving_throw_adj)}</p>
                        <p>Petrification, Polymorph</p><p>{savingThrows[3] + (is_dm ? 0 : saving_throw_adj)}</p>
                        <p>Spells</p><p>{savingThrows[4] + (is_dm ? 0 : saving_throw_adj)}</p>
                        <div
                            style={{display: this.props.advanced && is_dm ? '' : 'none'}}>
                            <h1>Magic Adj: </h1>
                        </div>
                        <div
                            style={{display: this.props.edit && is_dm ? '' : 'none'}}>
                            <button
                                onClick={event => this.handleInputIncrement(event, 'personalDetails')} name='saving_throw_adj' value='-'>-</button>
                            <h1>{(this.props.characterChanges.personalDetails.saving_throw_adj === 0 ? 0 :(this.props.characterChanges.personalDetails.saving_throw_adj || saving_throw_adj)) > 0 ? '+' : ''}{this.props.characterChanges.personalDetails.saving_throw_adj === 0 ? 0 :(this.props.characterChanges.personalDetails.saving_throw_adj || saving_throw_adj)}</h1>
                            <button
                                onClick={event => this.handleInputIncrement(event, 'personalDetails')} name='saving_throw_adj' value='+'>+</button>
                        </div>
                    </div>
                    <div
                        style={{display: resistances.length > 0 || special_attack.length > 0 ? '' : 'none'}}>
                        <h1>Special Abilities:</h1>
                        <div>
                            {rEsistances}
                            {specialAttacks}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { characterChanges, rerenderCreation, characterData } = state.character;
    const { currentCampaign } = state.campaign;
    return { 
        characterChanges,
        rerenderCreation,
        characterData,
        currentCampaign,
    }
}

export default connect(mapStateToProps, { inputCharacterEdits })(Combat);