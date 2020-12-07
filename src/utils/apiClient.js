import axios from "axios";
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const BASE_URI = "http://localhost:8000";

const client = axios.create({
    baseURL: BASE_URI,
    json: true,
});
client.interceptors.response.use(
    response => {
        return response
    },
    err => {
        return new Promise((resolve, reject) => {
            const originalReq = err.config;
            console.log('original', originalReq)
            console.log("error status", err)
            if (err.response.status === 404) {
                console.log("error 404, ", err.response.status)
                return <Redirect to='/' />; // used to go to landing 
            }
            if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                originalReq._retry = true;
                console.log("trying to refresh")
                let res = fetch('http://localhost:8000/auth/jwt/refresh', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Device': 'device',
                        // 'Authentication': localStorage.getItem("token")
                    },
                    redirect: 'follow',
                    referrer: 'no-referrer',
                    body: JSON.stringify({
                        // token: localStorage.getItem("token"),
                        refresh: localStorage.getItem("refresh")
                    }),
                }).then(res => res.json()).then(res => {
                    console.log('response', res);
                    // this.setSession({ access: res.access });
                    localStorage.setItem('access', res.access)
                    // originalReq.headers['Authentication'] = 'JWT ' + res.access;
                    // originalReq.headers['Device'] = "device";
                    const body = JSON.stringify({
                        token: localStorage.getItem("access"),
                    })
                    console.log("original request here", originalReq)
                    // originalReq.data = body
                    console.log("original request ", originalReq.data)
                    // you were just missing this; you're not setting the data part, you need to set authorization header not request data body 
                    // unsure of difference 
                    originalReq.headers['Authorization'] = `JWT ${localStorage.getItem('access')}`

                    return client(originalReq);
                });


                resolve(res);
            }

            // throw (err)
            reject(err);
        }
        )
    }
)
class APIClient {

    async createTimesheetEntry(ts) {
        const timesheet = {
            name: ts.name,
            timeTo: ts.timeTo,
            timeFrom: ts.timeFrom
        };
        return this.perform("post", "/api/shifts", timesheet);
    }

    getTimesheetEntries(start, end) {
        try {

            return this.perform('get', `${process.env.REACT_APP_API_URL}/api/shifts?from=${start}&to=${end}`);
            // dispatch({
            //     type: USER_LOADED_SUCCESS,
            //     payload: res.data
            // });
        } catch (err) {
            console.log('err in getting timesheet entries', err)
        }
        // this.perform("get", "/api/shifts");
    }
    getTimesheetEntriesRange(userId, from, to) {
        // we'll need to do date validation at some point 
        // and we need to send a backend error if the parameter is incorrect 
        try {
            return this.perform("get", `/api/shifts/${userId}/?from=${from}&to=${to}`);

        } catch (e) {
            return <Redirect to='/' />;
        }
    }
    updateTimesheetEntry(ts) {
        const timesheet = {
            name: ts.name
        };
        return this.perform("put", "/api/shifts", timesheet);
    }
    // (
    //     {
    //     method,
    //     url: resource,
    //     data,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `JWT ${localStorage.getItem('access')}`,
    //         'Accept': 'application/json'
    //     }
    // })
    // .then(response => response)
    async perform(method, resource, data) {
        return client({
            method,
            url: resource,
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }).then((resp) => {
            return resp.data ? resp.data : [];
        });
    }


}

export default APIClient;