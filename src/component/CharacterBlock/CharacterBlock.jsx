import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
    import { toggle, rerenderCreation } from '../../ducks/reducer/character_reducer';

function CharacterBlock(props) {
    const classes = props.character.classDetails.map((cLass, i) => {
        return (
            <h2 key={i}>Level {cLass.level} {cLass.class_name}</h2>
        )
    });
    const { name, stats, hp, savingThrows, race } = props.character;
    if (stats[0] > 19) {
        stats[0] = 18
    };
    return (
    <div className='characterSheetRevealed Box'>
        <Link to={`/landing/campaign/${props.campaign_id}/${props.campaign_name}/sheet/${props.character.character_id}`}>
            <button onClick={event => {props.toggle(event, props.character.character_id); props.rerenderCreation()}} name='characterSheetRevealed'>👁️</button>
        </Link>
        <h1>{name}</h1>
        <p>{race}</p>
        {classes}
        <p>HP: {hp}</p>
        <span>
            <h1>STR <p>{stats[0]} {stats[6] && stats[0] === 18 ? `${stats[6]}%` : ''}</p></h1>
            <h1>INT <p>{stats[1]}</p></h1>
            <h1>WIS <p>{stats[2]}</p></h1>
            <h1>DEX <p>{stats[3]}</p></h1>
            <h1>CON <p>{stats[4]}</p></h1>
            <h1>CHA <p>{stats[5]}</p></h1>
        </span>
        <span>
            <p>Rod, Staff, or Wand</p><p>{savingThrows[0] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
            <p>Breath Weapons</p><p>{savingThrows[1] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
            <p>Death, Paralysis, Poison</p><p>{savingThrows[2] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
            <p>Petrification, Polymorph</p><p>{savingThrows[3] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
            <p>Spells</p><p>{savingThrows[4] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
        </span>
    </div>
    )
}

function mapStateToProps(state) {
    const { currentCampaign } = state.campaign;
    return {
        currentCampaign,
    }
}

export default connect(mapStateToProps, { toggle, rerenderCreation })(CharacterBlock);