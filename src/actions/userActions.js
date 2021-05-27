import {normalizeResponseErrors} from './utils';
import {API_BASE_URL} from '../config';
//import {loadAuthToken} from '../local-storage';
//use this as generic student request
export const USER_REQUEST = 'USER_REQUEST';
export const userRequest = () => ({
    type:USER_REQUEST
});

export const USER_REQUEST_ACTION = 'USER_REQUEST_ACTION';
export const userRequestAction = () => ({
    type:USER_REQUEST_ACTION
});

export const USER_REQUEST_ACTION_SUCCESS = 'USER_REQUEST_ACTION_SUCCESS';
export const userRequestActionSuccess = () => ({
    type:USER_REQUEST_ACTION_SUCCESS
});

export const USER_REQUEST_ACTION_ERROR = 'USER_REQUEST_ACTION_ERROR';
export const userRequestActionError = (error) => ({
    type:USER_REQUEST_ACTION_ERROR,
    error
});

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const getUserSuccess = (users) => ({
    type:GET_USER_SUCCESS,
    users
});
//use this as generic student error
export const USER_ERROR = 'USER_ERROR';
export const userError = (error) => ({
    type:USER_ERROR,
    error
});

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const createStudentSuccess = () => ({
    type:CREATE_USER_SUCCESS
});

export const getUsers = () => (dispatch,getState) => {
    dispatch(userRequest());
    const authToken = getState().auth.authToken;

    return (
        fetch(`${API_BASE_URL}/users`,{
            method:'GET',
            headers:{
                Authorization: `Bearer ${authToken}`
            }
        })

        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((res) => {
            dispatch(getUserSuccess(res.users));
        })
        .catch(err => {
            console.log('error getting users ',err);
            dispatch(userError(err));
        })
    );
};

export const getUsersAsync = async (authToken) => {  
    try{
        let usersRaw = await fetch(`${API_BASE_URL}/users`,{
            method:'GET',
            headers:{
                Authorization: `Bearer ${authToken}`
            }
        });
        usersRaw = await normalizeResponseErrors(usersRaw);
        let usersJson = await usersRaw.json();
        return usersJson.users;
    }
    catch(e){
        console.log('error getting users ',e);
    }
};

export const updateUser = (email,user) => async (dispatch,getState) => {
    dispatch(userRequestAction());
    const authToken = getState().auth.authToken;
    try{
        let res = await fetch(`${API_BASE_URL}/users/${email}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body:JSON.stringify(user)
        });
        res = normalizeResponseErrors(res);
        res = res.json();
        dispatch(userRequestActionSuccess());
    }
    catch(e){
        dispatch(userRequestActionError(e));
        throw e;
    }
};