import authReducer from '../reducers/authReducer';
import { SET_CURRENT_USER } from '../types';

describe('Authentication Reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            isAuthenticated: false,
            user: {}
        })
    })

    it('should store token on log in', () => {
        expect(authReducer({
            isAuthenticated: false,
            user: {}
        }, {
            type:SET_CURRENT_USER,
            payload:{
                id:1,
                name:'Some Name'
            }
        }))
        .toEqual({
            isAuthenticated:true,
            user:{
                id:1,
                name:'Some Name'
            }
        })
    })
})