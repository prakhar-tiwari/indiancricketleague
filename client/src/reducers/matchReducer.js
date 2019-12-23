import { GET_MATCH_DATA, GET_MATCH_DATA_BY_ID,GET_MATCH_DATA_BY_YEAR, GET_MATCH_DATA_BY_TEAM_NAME,CHANGE_THEME } from '../types';

const initialState = {
    matches: [],
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: 0,
    previousPage: 0,
    lastPage: 0,
    loading: true,
    match: null,
    year:'',
    theme:''
};

const matchReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MATCH_DATA:
            return {
                ...action.payload,
                loading: false
            }

        case GET_MATCH_DATA_BY_ID:
            return {
                ...state,
                match: action.payload
            }

        case GET_MATCH_DATA_BY_YEAR:
            return{
                ...state,
                ...action.payload
            }

        case GET_MATCH_DATA_BY_TEAM_NAME:
            return{
                ...state,
                ...action.payload
            }

        case CHANGE_THEME:
            return{
                ...state,
                theme:action.payload
            }

        default:
            return state
    }
}

export default matchReducer;