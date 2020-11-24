import React, { Fragment, useEffect } from 'react';
import APIClient from '../utils/apiClient'
const api = new APIClient()
const Timesheet = () => {
    useEffect(() => {
        // for '5', we'll need to get it from the user session information (from token login) 
        const timesheetData = api.getTimesheetEntriesRange('5', '2020-11-02', '2020-11-05')
    }, [])
    return (

        <div>
            Hello, I'm a timesheet
        </div>

    )
}
export default Timesheet;
