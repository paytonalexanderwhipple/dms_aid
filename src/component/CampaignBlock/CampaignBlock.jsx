import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import CBPlayerDisplay from '../CBPlayerDisplay/CBPlayerDisplay.jsx';
import './CampaignBlock.css';

class CampaignBlock extends Component {

    render() {

        let roster = this.props.campaign.characters.map((character, i) => {
            return (
                <CBPlayerDisplay character={character} key={i}/>
            )
        })

        const { img, name, description, campaign_id } = this.props.campaign; 

        return (
            <div className='CampaignBlock paper'>
                <p className='CB-name text'>{name}</p>
                <div className='campaignImgFrame'>
                    <img src={img} alt="" className='campaignImg'/>
                </div>
                <p className='CB-description MultilineDisplay'>{description}</p>
                {roster}
                <Link to={`/landing/campaign/${campaign_id}/${name}`} id='CBbutton'>
                    <button className='button' id='CBbutton'>Load</button>
                </Link>
            </div>
        )
    }
}

export default CampaignBlock;