import axios from "axios";
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const BASE_URI = "http://localhost:8000";

const client = axios.create({
    baseURL: BASE_URI,
    json: true,
});
class APIClient {
    async createTimesheetEntry(ts) {
        const timesheet = {
            name: ts.name,
            timeTo: ts.timeTo,
            timeFrom: ts.timeFrom
        };
        return this.perform("post", "/api/shifts", timesheet);
    }

    getTimesheetEntries() {
        try {

            return this.perform('get', `${process.env.REACT_APP_API_URL}/api/shifts/`);
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
            return <Redirect to='/landing' />;
        }
    }
    updateTimesheetEntry(ts) {
        const timesheet = {
            name: ts.name
        };
        return this.perform("put", "/api/shifts", timesheet);
    }

    async perform(method, resource, data) {
        // if (localStorage.getItem('access')) {
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