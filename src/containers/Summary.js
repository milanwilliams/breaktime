import React, { useState } from 'react';
import * as materialUI from '@material-ui/core';
import team2 from '../images/breaktime-team-2.png';
import team3 from '../images/breaktime-team-3.png';
import Grid from '@material-ui/core/Grid';
import './App.css';
function Summary() {
    let btnSpacing = window.innerWidth / 30 - ((window.innerWidth / 30) % 1);
    if (btnSpacing > 10) {
        btnSpacing = 10; 
    }
    return (
        <div>
            <Grid container spacing={5} >
                <Grid item id="grey-background-summary">
                <materialUI.Box className="background" >
                    <Grid item>
                        <Grid container id="btn-row-summary" justify="center" spacing={btnSpacing} direction="row">
                            <Grid item id='courses-btn-container'>
                                <materialUI.Button variant="contained" className='btn-primary' id="courses-btn">
                                    Courses 
                                </materialUI.Button>
                            </Grid>
                            <Grid item id='assignments-btn-container'>
                                <materialUI.Button variant="contained" className='btn-primary' id="assignments-btn">
                                    Assignments                                                                                                                                                                                                                                                                                                                                   
                                </materialUI.Button>
                            </Grid>
                            <Grid item id='shifts-btn-container'>
                                <materialUI.Button variant="contained" className='btn-primary' id="shifts-btn">
                                    Shifts
                                </materialUI.Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={2} justify="center">
                            <Grid item>
                                <img src={team2}></img>
                            </Grid>
                            <Grid item>
                                <img src={team3}></img>
                            </Grid>
                        </Grid>
                    </Grid>
                </materialUI.Box>
                </Grid>
                
            </Grid>
            
        </div>
    );
}
export default Summary; 