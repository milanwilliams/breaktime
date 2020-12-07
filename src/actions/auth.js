import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS
} from './types';

export const checkAuthenticated = () => async dispatch => {
    if (typeof window == 'undefined') {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

// axios.interceptors.response.use(response => {
//     return response;
// }, err => {
//     return new Promise((resolve, reject) => {
//         const originalReq = err.config;
//         if (err.response.status === 404) {
//             return <Redirect to='/landing' />;  //CHANGE TO LANDING PAGE
//         }
//         if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
//             originalReq._retry = true;
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             };
//             console.log(localStorage)
//             const body = JSON.stringify({
//                 // token: localStorage.getItem("token"),
//                 refresh: localStorage.getItem("refresh")
//             })

//             let res = axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);
//             // fetch('http://localhost:8000/auth/jwt/refresh/', {
//             //     method: 'POST',
//             //     mode: 'cors',
//             //     cache: 'no-cache',
//             //     credentials: 'same-origin',
//             //     headers: {
//             //         'Content-Type': 'application/json',
//             //         'Device': 'device',
//             //         'Token': localStorage.getItem("token")
//             //     },
//             //     redirect: 'follow',
//             //     referrer: 'no-referrer',
//             //     body: JSON.stringify({
//             //         token: localStorage.getItem("token"),
//             //         refresh_token: localStorage.getItem("refresh_token")
//             //     }),
//             // }).
//             res.then(res => res.data).then(response => {
//                 console.log("response data from refreshing", response);
//                 console.log("access token: ", response.access)
//                 this.setSession({ access: response.access });
//                 localStorage.setItem('access', response.access)
//                 // console.log("original request", originalReq)
//                 // originalReq.headers['JWT'] = response.access;
//                 // originalReq.headers['refresh'] = res.refresh;
//             })
//         }
//     })
// })
export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        console.log("LOCAL stroage token here: ", localStorage.getItem('access'))
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        // const userId = await axios.post()
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const signup = ({ first_name, last_name, employee_id, username, email, password, re_password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ first_name, last_name, employee_id, username, email, password, re_password });
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};