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
            combat: {
                weapons: [],
                ammo: [],
                newAmmo: [],
                newWeapon: [],
                newArmor: {},
                newShield: {},
                armor: [],
                shield: [],
                deleteAmmo: [],
                deleteWeapon: [],
            },
            Magic: {},
            Inventory: {
                deleteItem: [],
                createItem: [],
            },
            abilities: {},
            dualClass: {},
            XP: {
                xp: {},
                hp: [],
            },
    },
    loading: false,
    rerenderCreation: false,
    characterCreateRevealed: false,
    characterSheetRevealed: false,
    importRevealed: false,
    obscured: false,
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
const SUBMIT_CHARACTER_EDITS = 'SUBMIT_CHARACTER_EDITS';
const SUBMIT_CHARACTER_EDITS_PENDING = 'SUBMIT_CHARACTER_EDITS_PENDING';
const SUBMIT_CHARACTER_EDITS_FULFILLED = 'SUBMIT_CHARACTER_EDITS_FULFILLED';
const SUBMIT_CHARACTER_EDITS_REJECTED = 'SUBMIT_CHARACTER_EDITS_REJECTED';
const TOGGLE = 'TOGGLE';
const TOGGLE_LOAD = 'TOGGLE_LOAD';


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
            return { ...state, characterChanges: { ...initialState.characterChanges, combat: { weapons: [], ammo: [], newAmmo: [], newWeapon: [], newArmor: {}, newShield: {}, armor: [], shield: [], deleteAmmo: [], deleteWeapon: []},}};
        case SUBMIT_CHARACTER_EDITS_PENDING:
            return { ...state, loading: true };
        case SUBMIT_CHARACTER_EDITS_FULFILLED:
            return { ...state, characterChanges: initialState.characterChanges  };
        case SUBMIT_CHARACTER_EDITS_REJECTED:
            alert(action.payload.response.request.response);
            return { ...state, loading: false };
        case TOGGLE: 
            return { ...state, [action.payload]: !state[action.payload], obscured: !state.obscured, characterChanges: { ...initialState.characterChanges, combat: { weapons: [], ammo: [], newAmmo: [], newWeapon: [], newArmor: {}, newShield: {}, armor: [], shield: [], deleteAmmo: [], deleteWeapon: []},}};
        case TOGGLE_LOAD:
            return { ...state, loading: !state.loading};
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

export function submitCharacterEdits(character, changes) {
    return {
        type: SUBMIT_CHARACTER_EDITS,
        payload: axios.put('/api/character', { character, ...changes }),
    }
}

export function toggle(event) {
    return {
        type: TOGGLE,
        payload: event.target.name,
    }
}

export function toggleLoad() {
    return {
        type: TOGGLE_LOAD,
        payload: '',
    }
}