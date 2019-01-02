import axios from 'axios';

const initialState = {
    currentCampaign: {
        user_id: 0,
        campaignDetails: {

        },
        characterDetails: [],
        inviteJoin: [],
        messages: []
,    },
    dmCampaignArray: [],
    playerCampaignArray: [],
    loading: false,
    loadingName: '',
};

// *** ACTION TYPES *** //

const GET_CAMPAIGN_LIST = 'GET_CAMPAIGN_LIST';
const GET_CAMPAIGN_LIST_FULFILLED = 'GET_CAMPAIGN_LIST_FULFILLED';
const SET_CURRENT_CAMPAIGN = 'SET_CURRENT_CAMPAIGN';
const SET_CURRENT_CAMPAIGN_PENDING = 'SET_CURRENT_CAMPAIGN_PENDING';
const SET_CURRENT_CAMPAIGN_FULFILLED = 'SET_CURRENT_CAMPAIGN_FULFILLED';

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
        case SET_CURRENT_CAMPAIGN_PENDING:
            return { ...state, loading: true, loadingName: action.meta.name};
        case SET_CURRENT_CAMPAIGN_FULFILLED:
            return {...state, currentCampaign: action.payload.data, loading: false, loadingName: ''};
        case SET_CURRENT_CAMPAIGN:
            return {...state, currentCampaign: action.payload}
        default: 
            return {...state};
    }
};

// *** ACTION CREATORS *** //

export function getCampaignList() {
    return {
        type: GET_CAMPAIGN_LIST,
        payload: axios.get('/api/campaign/list')
    }
};

// export function setCurrentCampaign(campaign_id, name) {
//     return {
//         type: SET_CURRENT_CAMPAIGN,
//         payload: axios.get(`/api/campaign?campaign_id=${campaign_id}`),
//         meta: {
//             name,
//         }
//     }
// }
export function setCurrentCampaign(campaign) {
    return {
        type: SET_CURRENT_CAMPAIGN,
        payload: campaign,
    }
}