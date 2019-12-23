import { SET_CURRENT_USER } from '../types';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const signUp = (userdata, history) => dispatch => {
    axios.post('http://localhost:5000/signup', userdata)
        .then(response => {
            history.push('/login');
        })
        .catch(err => {
            console.log(err);
        })
}


export const login = userData => dispatch => {
    axios.post('http://localhost:5000/login', userData)
        .then(result => {
            const { token } = result.data;
            localStorage.setItem('token', token);
            setAuthToken(token);
            const decodedToken = jwt_decode(token);
            dispatch(setCurrentUser(decodedToken));
        })
        .catch(err => {
            console.log(err);
        })
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}
