import axios from "axios";

const initialState = {
    characterData: {},
    characterCreation: {
        str: 10,
        int: 10,
        wis: 10,
        dex: 10,
        con: 10,
        cha: 10,
        proficiencies: [],
    },
    characterChanges: {
            personalDetails: {},
            combat: {},
            Magic: {},
            Inventory: {},
            Notes: {},
            abilities: {},
    },
    loading: false,
    rerenderCreation: false,
};

// *** ACTION TYPES *** //
const GET_CHARACTER_DATA = 'GET_CHARACTER_DATA';
const HANDLE_CREATION_INPUT = 'HANDLE_CREATION_INPUT';
const CLEAR_CREATION = 'CLEAR_CREATION';
const RERENDER_CREATION = 'RERENDER_CREATION';
const CLEAR_CLASS_DATA = 'CLEAR_CLASS_DATA';
const SUBMIT_CHARACTER = 'SUBMIT_CHARACTER';
const SUBMIT_CHARACTER_PENDING = 'SUBMIT_CHARACTER_PENDING';
const SUBMIT_CHARACTER_FULFILLED = 'SUBMIT_CHARACTER_FULFILLED';
const SUBMIT_CHARACTER_REJECTED = 'SUBMIT_CHARACTER_REJECTED';
const INPUT_CHARACTER_EDITS = 'INPUT_CHARACTER_EDITS';
const CLEAR_CHARACTER_EDITS = 'CLEAR_CHARACTER_EDITS';


// *** REDUCER *** //

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_CHARACTER_DATA:
            return { ...state, characterData: action.payload };
        case CLEAR_CREATION:
            return { ...state, characterCreation: initialState.characterCreation, loading: false };
        case HANDLE_CREATION_INPUT:
            return { ...state, characterCreation: {...state.characterCreation, [action.payload.key]: action.payload.data}};
        case RERENDER_CREATION:
            return { ...state, rerenderCreation: !state.rerenderCreation};
        case CLEAR_CLASS_DATA:
            return { ...state, characterCreation: { ...state.characterCreation, proficiencies: [], startingGold: 0, exeptionalStrength: 0}};
        case SUBMIT_CHARACTER_PENDING:
            return { ...state, loading: true };
        case SUBMIT_CHARACTER_FULFILLED:
            return { ...initialState };
        case SUBMIT_CHARACTER_REJECTED:
            alert(action.payload.response.request.response);
            return { ...state, loading: false };
        case INPUT_CHARACTER_EDITS:
            return { ...state, characterChanges: { ...state.characterChanges, [action.payload.group]: {...state.characterChanges[action.payload.group], [action.payload.key]: action.payload.data }}};           
        case CLEAR_CHARACTER_EDITS:
            return { ...state, characterChanges: { ...initialState.characterChanges }};
        default: 
            return {...state};
    }
}

// *** ACTION CREATORS *** //

export function saveCharacterData(data) {
    return {
        type: GET_CHARACTER_DATA,
        payload: data
    }
}

export function clearCreation() {
    return {
        type: CLEAR_CREATION,
        payload: '',
    }
}

export function handleCreationInput(key, data) {
    return {
        type: HANDLE_CREATION_INPUT,
        payload: {key, data},
    }
}

export function rerenderCreation() {
    return {
        type: RERENDER_CREATION,
        payload: '',
    }
}

export function clearClassData() {
    return {
        type: CLEAR_CLASS_DATA,
        payload: '',
    }
}

export function submitCharacter(body, campaign_id) {
    return {
        type: SUBMIT_CHARACTER,
        payload: axios.post('/api/character', { ...body, campaign_id}),
    }
}

export function inputCharacterEdits(group, key, data) {
    return {
        type: INPUT_CHARACTER_EDITS,
        payload: {group, key, data}
    }
}

export function clearCharacterEdits() {
    return {
        type: CLEAR_CHARACTER_EDITS,
        payload: '',
    }
}