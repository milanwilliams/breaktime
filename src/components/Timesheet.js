import React, { Fragment, useEffect, useState } from 'react';
import APIClient from '../utils/apiClient';
import Navbar from '../components/Navbar.js';
const api = new APIClient()
const Timesheet = () => {
    
    const [timesheetParams, setTimesheetParams] = useState({
        date: '2020-11-02', 
        timeFrom: '08:00:00',
        timeTo: '17:00:00'
    });
    const { id, date, timeFrom, timeTo } = timesheetParams; 
    useEffect(() => {
        // for '5', we'll need to get it from the user session information (from token login) 
        //const timesheetData = api.getTimesheetEntriesRange(timesheetParams);
        const timesheetData = api.getTimesheetEntriesRange('5', '2020-11-02', '2020-11-05');
        console.log(timesheetData);
    }, [])

    const createTimesheet = (date, startTime, endTime) => {
        api.createTimesheetEntry(date, startTime, endTime);
    };
    return (
        <div>
            Hello, I'm a timesheet
        </div>
    );
}
export default Timesheet;
