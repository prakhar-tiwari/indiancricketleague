import { GET_MATCH_DATA, GET_MATCH_DATA_BY_ID, GET_MATCH_DATA_BY_YEAR, GET_MATCH_DATA_BY_TEAM_NAME, CHANGE_THEME } from '../types';
import axios from 'axios';

export const getMatchData = (pageNumber) => dispatch => {
    axios.get(`http://localhost:5000/getmatchdata?pageNumber=${pageNumber}`)
        .then(result => {
            const { matches,
                currentPage,
                hasNextPage,
                hasPreviousPage,
                nextPage,
                previousPage,
                lastPage } = result.data;

            const newData = {
                matches,
                currentPage,
                hasNextPage,
                hasPreviousPage,
                nextPage,
                previousPage,
                lastPage
            };

            dispatch({
                type: GET_MATCH_DATA,
                payload: newData
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const getMatchDataById = (id) => dispatch => {
    axios.get(`http://localhost:5000/getmatchdatabyid/${id}`)
        .then(result => {
            dispatch({
                type: GET_MATCH_DATA_BY_ID,
                payload: result.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const getMatchDataByTeamName = (pageNumber, teamName) => dispatch => {
    axios.get(`http://localhost:5000/getmatchbyteamname/?teamName=${teamName}&pageNumber=${pageNumber}`)
        .then(result => {
            const { matches,
                currentPage,
                hasNextPage,
                hasPreviousPage,
                nextPage,
                previousPage,
                lastPage } = result.data;

            const newData = {
                matches,
                currentPage,
                hasNextPage,
                hasPreviousPage,
                nextPage,
                previousPage,
                lastPage,
                teamName
            };

            dispatch({
                type: GET_MATCH_DATA_BY_TEAM_NAME,
                payload: newData
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const getMatchDataByYear = (pageNumber, year) => dispatch => {
    axios.get(`http://localhost:5000/getmatchdatabyyear/?year=${year}&pageNumber=${pageNumber}`)
        .then(result => {
            const { matches,
                currentPage,
                hasNextPage,
                hasPreviousPage,
                nextPage,
                previousPage,
                lastPage } = result.data;

            const newData = {
                matches,
                currentPage,
                hasNextPage,
                hasPreviousPage,
                nextPage,
                previousPage,
                lastPage,
                year
            };

            dispatch({
                type: GET_MATCH_DATA_BY_YEAR,
                payload: newData
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const changeTheme = (themeName) => dispatch => {
    dispatch({
        type: CHANGE_THEME,
        payload: themeName
    })
}