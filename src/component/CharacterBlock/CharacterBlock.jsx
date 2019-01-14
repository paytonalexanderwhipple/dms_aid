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
    const { name, stats, hp, savingThrows, race, img, alignment, title } = props.character;
    if (stats[0] > 19) {
        stats[0] = 18
    };

    let imageLoad = true;

    return (
    <div className='characterSheetRevealed CharacterCard paper'>
        <Link to={`/landing/campaign/${props.campaign_id}/${props.campaign_name}/sheet/${props.character.character_id}`}>
            <button className='eyeButton' onClick={event => {props.toggle(event, props.character.character_id); props.rerenderCreation()}} name='characterSheetRevealed'>
                View
            </button>
        </Link>
        <div className='nameTextChBBox'>
            <h1 className='text nameTextChB'>{name}</h1>
        </div>
        <p className='text Smalltext' style={{marginLeft: 5, marginTop: -3}}>{title}</p>
        <div
            className='ChBframe paper'>
            <img className='ChBimage' src={img} onLoad={imageLoad = true} onError={imageLoad = false}/>

        </div>
        <p className='text ChBrace'>{race} - {alignment}</p>
        {classes}
        <div className='BreakChB'/>
        <p className='text ChBhp'>HP: {hp}</p>
        <div className='BreakChB'/>
        <div className='ChBstats'>
            <h1 className='statsChB text' >STR <p className='text statsChBnums'>{stats[0]} {stats[6] && stats[0] === 18 ? `(${stats[6]}%)` : ''}</p></h1>
            <h1 className='statsChB text' >INT <p className='text statsChBnums'>{stats[1]}</p></h1>
            <h1 className='statsChB text' >WIS <p className='text statsChBnums'>{stats[2]}</p></h1>
            <h1 className='statsChB text' >DEX <p className='text statsChBnums'>{stats[3]}</p></h1>
            <h1 className='statsChB text' >CON <p className='text statsChBnums'>{stats[4]}</p></h1>
            <h1 className='statsChB text' >CHA <p className='text statsChBnums'>{stats[5]}</p></h1>
        </div>
        <div className='BreakChB'/>        
        <div className='ChBsavesBox'>
            <p className='text ChBsaves' >Rod, Staff, or Wand:{' '}<p className='text ChBsavesNums'>{savingThrows[0] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p></p>
            <p className='text ChBsaves' >Breath Weapons:{' '}<p className='text ChBsavesNums'>{savingThrows[1] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p></p>
            <p className='text ChBsaves' >Death, Paralysis, Poison:{' '}<p className='text ChBsavesNums'>{savingThrows[2] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p></p>
            <p className='text ChBsaves' >Petrification, Polymorph:{' '}<p className='text ChBsavesNums'>{savingThrows[3] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p></p>
            <p className='text ChBsaves' >Spells:{' '}<p className='text ChBsavesNums'>{savingThrows[4] + (props.currentCampaign.campaignDetails.is_dm ? 0 : props.character.saving_throw_adj)}</p></p>
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