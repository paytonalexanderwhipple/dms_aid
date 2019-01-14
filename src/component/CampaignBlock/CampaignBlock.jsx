import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import CBPlayerDisplay from '../CBPlayerDisplay/CBPlayerDisplay.jsx';
import './CampaignBlock.css';

class CampaignBlock extends Component {
    constructor() {
        super()

        this.state = {
            imgExists: true,
        }
    }

    imageLoad = (result) => {
        if (this.state.imgExists !== result) {
            this.setState({imgExists: result});
        }
    }

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
                    {this.state.imgExists 
                        ?<img src={img} onLoad={() => this.imageLoad(true)} onError={() => this.imageLoad(false)} className='campaignImg'/>
                        :<div className='frame'/>
                    }
                    <img src={img} alt="" className='campaignImg'/>
                </div>
                <p className='text Smalltext MultilineDisplay'>{description}</p>
                <p className='Header text'>Roster:</p>
                {roster}
                <Link to={`/landing/campaign/${campaign_id}/${name}`} id='CBbutton'>
                    <button className='button' id='CBbutton'>Load</button>
                </Link>
            </div>
        )
    }
}

export default CampaignBlock;