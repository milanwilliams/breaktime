import React, { useState, Fragment } from 'react';
import * as materialUI from '@material-ui/core';
import Timesheet from '../components/Timesheet.js';
import { Components } from 'antd/lib/date-picker/generatePicker';
function Shifts() {
    const [retrieveFormData, setRetrieveFormData] = useState({
        startDate: '', 
        endDate: '', 
        id: ''
    });
    const { startDate, endDate, id } = retrieveFormData;
    const [createFormData, setCreateFormData] = useState({
        date: '',
        startTime: '', 
        endTime: ''
    });
    const { date, startTime, endTime } = createFormData;
    
    const OnChangeRetrieve = (e) => {
        setRetrieveFormData({...retrieveFormData, [e.target.name]: e.target.value});
    } 
    const OnChangeCreate = (e) => {
        setCreateFormData({...createFormData, [e.target.name]: e.target.value});
    } 
    const OnSubmitCreate = e => {
        const timesheet = <Timesheet></Timesheet>;
        timesheet.createTimesheet(createFormData);
        return timesheet;
    }
    const OnSubmitRetrieve = e => {
        return; 
    }
    return (
         <div>
             <Timesheet>
             </Timesheet>
             <materialUI.Box>
                 <h1>Create New Timesheet</h1> 
                <form onSubmit={(e) => OnSubmitCreate(e)}>
                    <label>Date</label>
                    <materialUI.TextField>
                        <input
                        type="date"
                        required
                        onChange={(e) => OnChangeCreate(e)}/>
                    </materialUI.TextField>
                    <label>Start Time</label>
                    <materialUI.TextField>
                        <input
                        type="time"
                        required
                        onChange={(e) => OnChangeCreate(e)}/>
                    </materialUI.TextField>
                    <label>End Time</label>
                    <materialUI.TextField>
                        <input
                        type="time"
                        required
                        onChange={(e) => OnChangeCreate(e)}/>
                    </materialUI.TextField>
                    <materialUI.Button type="submit" >Create Timesheet</materialUI.Button>
                </form>
             </materialUI.Box>
             <materialUI.Box>
                 <h1>View Existing Timesheet</h1>
                <form onSubmit={(e) => OnSubmitRetrieve(e)}>
                    <label>Start Date</label>
                    <materialUI.TextField>
                        <input
                        type="date"
                        required
                        onChange={(e) => OnChangeRetrieve(e)}/>
                    </materialUI.TextField>
                    <label>End Date</label>
                    <materialUI.TextField>
                        <input
                        type="date"
                        required
                        onChange={(e) => OnChangeRetrieve(e)}/>
                    </materialUI.TextField>
                    <materialUI.Button type="submit" >Retrieve Timesheets</materialUI.Button>
                </form>
             </materialUI.Box>
         </div>
    );
}

export default Shifts; 