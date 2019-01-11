import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
    import { toggle, rerenderCreation } from '../../ducks/reducer/character_reducer';
import './CharacterBlock.css';

function CharacterBlock(props) {
    const classes = props.character.classDetails.map((cLass, i) => {
        return (
            <h2 className='ChBclass' key={i}>Level {cLass.level} {cLass.class_name}</h2>
        )
    });
    const { name, stats, hp, savingThrows, race, img } = props.character;
    if (stats[0] > 19) {
        stats[0] = 18
    };

    let imageLoad = true;

    return (
    <div className='characterSheetRevealed CharacterCard paper'>
        <Link to={`/landing/campaign/${props.campaign_id}/${props.campaign_name}/sheet/${props.character.character_id}`}>
            <button className='eyeButton' onClick={event => {props.toggle(event, props.character.character_id); props.rerenderCreation()}} name='characterSheetRevealed'>
                <img className='eyeImg' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Eye_open_font_awesome.svg/2000px-Eye_open_font_awesome.svg.png" alt=""/>
            </button>
        </Link>
        <h1 className='text nameTextChB'>{name}</h1>
        <img className='ChBimage' src={img} onLoad={imageLoad = true} onError={imageLoad = false}/>
        {imageLoad 
            ? <div/>
            : <div className='ChBframe'/>
        }
        <p className='text ChBrace'>{race}</p>
        {classes}
        <div className='BreakChB'/>
        <p className='text ChBhp'>HP: {hp}</p>
        <div className='BreakChB'/>
        <div className='ChBstats'>
            <h1 className='statsChB' >STR <p>{stats[0]} {stats[6] && stats[0] === 18 ? `${stats[6]}%` : ''}</p></h1>
            <h1 className='statsChB' >INT <p>{stats[1]}</p></h1>
            <h1 className='statsChB' >WIS <p>{stats[2]}</p></h1>
            <h1 className='statsChB' >DEX <p>{stats[3]}</p></h1>
            <h1 className='statsChB' >CON <p>{stats[4]}</p></h1>
            <h1 className='statsChB' >CHA <p>{stats[5]}</p></h1>
        </div>
        <div className='BreakChB'/>        
        <div>
            <p>Rod, Staff, or Wand</p><p>{savingThrows[0] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
            <p>Breath Weapons</p><p>{savingThrows[1] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
            <p>Death, Paralysis, Poison</p><p>{savingThrows[2] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
            <p>Petrification, Polymorph</p><p>{savingThrows[3] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
            <p>Spells</p><p>{savingThrows[4] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p>
        </div>
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