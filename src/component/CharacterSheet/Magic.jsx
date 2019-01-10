import React ,{ Component } from 'react';
import { connect } from 'react-redux';

class Magic extends Component {
    constructor() {
        super()
        
        this.state = {
            revealed: false,
        }
    }

    toggle = (event) => {
        const { name } = event.target;
        this.setState({[name]: !this.state[name]});
    }
    
    render() {

        const { is_dm } = this.props.currentCampaign.campaignDetails
        const { classDetails, wis } = this.props.character;
        const classes = classDetails.map(cLass => {
            return cLass.class_name
        })

        let magic_userSpells = classDetails.reduce((acc, cLass) => {
            return acc.map((spells, i) => spells + cLass.magic_user_spells[i] || 0);
        }, [0, 0, 0, 0, 0, 0, 0, 0, 0]);

        let illusionistSpells = classDetails.reduce((acc, cLass) => {
            return acc.map((spells, i) => spells + cLass.illusionist_spells[i] || 0);
        }, [0, 0, 0, 0, 0, 0, 0]);

        let clericSpells = classDetails.reduce((acc, cLass) => {
            return acc.map((spells, i) => spells + cLass.cleric_spells[i] || 0);
        }, [0, 0, 0, 0, 0, 0, 0]);

        let druidSpells = classDetails.reduce((acc, cLass) => {
            return acc.map((spells, i) => spells + cLass.druid_spells[i] || 0);
        }, [0, 0, 0, 0, 0, 0, 0]);

        let turnClass = classDetails.reduce((acc, cLass) => {
            let level = 0;
            if (cLass.class_name === 'Cleric') {
                level = cLass.level;
            } else if (cLass.class_name === 'Paladin') {
                level = cLass.level - 2;
            } 
            if (acc.level <= level) {
                return cLass;
            } else {
                return acc;
            }
        }, {level: 0, turn_undead: []});

        let render;
        if (this.state.revealed) {
            render = (<div>
                <h1>Magic:</h1>
                <button onClick={this.toggle} name='revealed'>v</button>
                <div
                    style={{display: (classes.includes('Magic-User') || classes.includes('Ranger')) && magic_userSpells[0] ? '' : 'none'}}>
                    <h1>Arcane Spells:</h1>
                    <div
                        style={{display: magic_userSpells[0] ? '' : 'none'}}>
                        <p>1<p className='sup'>st</p></p>
                        <p>{magic_userSpells[0]}</p>
                    </div>
                    <div
                        style={{display: magic_userSpells[1] ? '' : 'none'}}>
                        <p>2<p className='sup'>nd</p></p>
                        <p>{magic_userSpells[1]}</p>
                    </div>
                    <div
                        style={{display: magic_userSpells[2] ? '' : 'none'}}>
                        <p>3<p className='sup'>rd</p></p>
                        <p>{magic_userSpells[2]}</p>
                    </div>
                    <div
                        style={{display: magic_userSpells[3] ? '' : 'none'}}>
                        <p>4<p className='sup'>th</p></p>
                        <p>{magic_userSpells[3]}</p>
                    </div>
                    <div
                        style={{display: magic_userSpells[4] ? '' : 'none'}}>
                        <p>5<p className='sup'>th</p></p>
                        <p>{magic_userSpells[4]}</p>
                    </div>
                    <div
                        style={{display: magic_userSpells[5] ? '' : 'none'}}>
                        <p>6<p className='sup'>th</p></p>
                        <p>{magic_userSpells[5]}</p>
                    </div>
                    <div
                        style={{display: magic_userSpells[6] ? '' : 'none'}}>
                        <p>7<p className='sup'>th</p></p>
                        <p>{magic_userSpells[6]}</p>
                    </div>
                    <div
                        style={{display: magic_userSpells[7] ? '' : 'none'}}>
                        <p>8<p className='sup'>th</p></p>
                        <p>{magic_userSpells[7]}</p>
                    </div>
                    <div
                        style={{display: magic_userSpells[8] ? '' : 'none'}}>
                        <p>9<p className='sup'>th</p></p>
                        <p>{magic_userSpells[8]}</p>
                    </div>
                </div>
                <div
                    style={{display: classes.includes('Illusionist') ? '' : 'none'}}>
                    <h1>Illusion Spells:</h1>
                    <div
                        style={{display: illusionistSpells[0] ? '' : 'none'}}>
                        <p>1<p className='sup'>st</p></p>
                        <p>{illusionistSpells[0]}</p>
                    </div>
                    <div
                        style={{display: illusionistSpells[1] ? '' : 'none'}}>
                        <p>2<p className='sup'>nd</p></p>
                        <p>{illusionistSpells[1]}</p>
                    </div>
                    <div
                        style={{display: illusionistSpells[2] ? '' : 'none'}}>
                        <p>3<p className='sup'>rd</p></p>
                        <p>{illusionistSpells[2]}</p>
                    </div>
                    <div
                        style={{display: illusionistSpells[3] ? '' : 'none'}}>
                        <p>4<p className='sup'>th</p></p>
                        <p>{illusionistSpells[3]}</p>
                    </div>
                    <div
                        style={{display: illusionistSpells[4] ? '' : 'none'}}>
                        <p>5<p className='sup'>th</p></p>
                        <p>{illusionistSpells[4]}</p>
                    </div>
                    <div
                        style={{display: illusionistSpells[5] ? '' : 'none'}}>
                        <p>6<p className='sup'>th</p></p>
                        <p>{illusionistSpells[5]}</p>
                    </div>
                    <div
                        style={{display: illusionistSpells[6] ? '' : 'none'}}>
                        <p>7<p className='sup'>th</p></p>
                        <p>{illusionistSpells[6]}</p>
                    </div>
                </div>
                <div
                    style={{display: classes.includes('Cleric') || classes.includes('Paladin') ? '' : 'none'}}>
                    <h1>Clerical Spells:</h1>
                    <div
                        style={{display: clericSpells[0] ? '' : 'none'}}>
                        <p>1<p className='sup'>st</p></p>
                        <p>{clericSpells[0]}</p>
                    </div>
                    <div
                        style={{display: clericSpells[1] ? '' : 'none'}}>
                        <p>2<p className='sup'>nd</p></p>
                        <p>{clericSpells[1]}</p>
                    </div>
                    <div
                        style={{display: clericSpells[2] ? '' : 'none'}}>
                        <p>3<p className='sup'>rd</p></p>
                        <p>{clericSpells[2]}</p>
                    </div>
                    <div
                        style={{display: clericSpells[3] ? '' : 'none'}}>
                        <p>4<p className='sup'>th</p></p>
                        <p>{clericSpells[3]}</p>
                    </div>
                    <div
                        style={{display: clericSpells[4] ? '' : 'none'}}>
                        <p>5<p className='sup'>th</p></p>
                        <p>{clericSpells[4]}</p>
                    </div>
                    <div
                        style={{display: clericSpells[5] ? '' : 'none'}}>
                        <p>6<p className='sup'>th</p></p>
                        <p>{clericSpells[5]}</p>
                    </div>
                    <div
                        style={{display: clericSpells[6] ? '' : 'none'}}>
                        <p>7<p className='sup'>th</p></p>
                        <p>{clericSpells[6]}</p>
                    </div>
                </div>
                <div
                    style={{display: classes.includes('Druid') || classes.includes('Ranger') ? '' : 'none'}}>
                    <h1>Druidic Spells:</h1>
                    <div
                        style={{display: druidSpells[0] ? '' : 'none'}}>
                        <p>1<p className='sup'>st</p></p>
                        <p>{druidSpells[0]}</p>
                    </div>
                    <div
                        style={{display: druidSpells[1] ? '' : 'none'}}>
                        <p>2<p className='sup'>nd</p></p>
                        <p>{druidSpells[1]}</p>
                    </div>
                    <div
                        style={{display: druidSpells[2] ? '' : 'none'}}>
                        <p>3<p className='sup'>rd</p></p>
                        <p>{druidSpells[2]}</p>
                    </div>
                    <div
                        style={{display: druidSpells[3] ? '' : 'none'}}>
                        <p>4<p className='sup'>th</p></p>
                        <p>{druidSpells[3]}</p>
                    </div>
                    <div
                        style={{display: druidSpells[4] ? '' : 'none'}}>
                        <p>5<p className='sup'>th</p></p>
                        <p>{druidSpells[4]}</p>
                    </div>
                    <div
                        style={{display: druidSpells[5] ? '' : 'none'}}>
                        <p>6<p className='sup'>th</p></p>
                        <p>{druidSpells[5]}</p>
                    </div>
                    <div
                        style={{display: druidSpells[6] ? '' : 'none'}}>
                        <p>7<p className='sup'>th</p></p>
                        <p>{druidSpells}</p>
                    </div>
                </div>
                <div
                    style={{display: classes.includes('Cleric') || classes.includes('Paladin') && is_dm ? '' : 'none'}}>
                    <h1>Turn Undead:</h1>
                    <div>Skeleton: {turnClass.turn_undead[0]}</div>
                    <div>Zombie: {turnClass.turn_undead[1]}</div>
                    <div>Ghoul: {turnClass.turn_undead[2]}</div>
                    <div>Shadow: {turnClass.turn_undead[3]}</div>
                    <div>Wight: {turnClass.turn_undead[4]}</div>
                    <div>Ghast: {turnClass.turn_undead[5]}</div>
                    <div>Wraith: {turnClass.turn_undead[6]}</div>
                    <div>Mummy: {turnClass.turn_undead[7]}</div>
                    <div>Spectre: {turnClass.turn_undead[8]}</div>
                    <div>Vampire: {turnClass.turn_undead[9]}</div>
                    <div>Ghost: {turnClass.turn_undead[10]}</div>
                    <div>Lich: {turnClass.turn_undead[11]}</div>
                    <div>Fiend: {turnClass.turn_undead[12]}</div>
                </div>
            </div>)
        } else {
            render = (<div>
                <h1>Magic:</h1>
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
    const { currentCampaign } = state.campaign;
    return {
        currentCampaign,
    }
}

export default connect(mapStateToProps)(Magic);