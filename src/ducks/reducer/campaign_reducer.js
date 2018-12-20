import axios from 'axios';

const initialState = {
    currentCampaign: {},
    dmCampaignArray: [],
    playerCampaignArray: [],
};

// *** ACTION TYPES *** //

const GET_CAMPAIGN_LIST = 'GET_CAMPAIGN_LIST';
const GET_CAMPAIGN_LIST_FULFILLED = 'GET_CAMPAIGN_LIST_FULFILLED';

// *** REDUCER *** //

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_CAMPAIGN_LIST_FULFILLED:
            const dmCampaignArray = [];
            const playerCampaignArray = [];
            action.payload.data.forEach(campaign => {
                if (campaign.is_dm) dmCampaignArray.push(campaign);
                else playerCampaignArray.push(campaign);
            });
            return {...state, dmCampaignArray, playerCampaignArray};
        default: 
            return {...state};
    }
};

// *** ACTION CREATORS *** //

export function getCampaignList() {
    return {
        type: GET_CAMPAIGN_LIST,
        payload: axios.get('/api/campaign')
    }
};
