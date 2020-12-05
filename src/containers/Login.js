import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import * as materialUI from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SocialMediaBar from '../components/SocialMediaBar.js';
import team from '../images/breaktime-team.JPG';
import logo from '../images/breaktime-logo.png';
import './App.css';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    
    return (
        <div className='container-1'>
            <Grid container spacing={0} direction='row'>
                <Grid item id="left-half">
                    <Grid container spacing={0} direction="column">
                    <Grid item id="top-half-2">
                            <Grid container spacing={1} direction="row">
                                <Grid item>
                                    <SocialMediaBar/>
                                </Grid>
                                <Grid item id="logo-mission-container">
                                    <Grid  container spacing={0} direction="column">
                                        <Grid item id="img-logo-container">
                                            <img id="img-logo" src={logo} alt="Breaktime Logo"/>
                                        </Grid>
                                        <Grid item>
                                            <h2 id="mission-statement">Breaking the Cycle of Homelessness.</h2>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item id="img-team-container">
                            <img id="img-team" src={team} alt="Breaktime Team"/>
                        </Grid>
                    </Grid>
                </Grid>
                    <Grid item id="grey-background">
                        <materialUI.Box className='background'>
                            <Grid container spacing={0}>
                                <Grid item id="form-container">
                                    <h1 className='form-header'>User Login</h1>
                                    <form className='form' onSubmit={e => onSubmit(e)}>
                                        <div className='form-group'>
                                            <label htmlFor='form-control' class='form-label'>Email</label>
                                            <br/>
                                            <materialUI.TextField label="Username" variant="outlined" className='form-control'>
                                                <input 
                                                    className='form-control'
                                                    type='text'
                                                    name='username'
                                                    value={username}
                                                    onChange={e => onChange(e)}
                                                    required
                                                />
                                            </materialUI.TextField>
                                        </div>
                                        <br/>
                                        <div className='form-group'>
                                            <label htmlFor='form-control' class='form-label'>Password</label>
                                            <br/>
                                            <materialUI.TextField label="Password" variant="outlined" className='form-control'>
                                                <input
                                                    className='form-control'
                                                    type='password'
                                                    name='password'
                                                    value={password}
                                                    onChange={e => onChange(e)}
                                                    minLength='6'
                                                    required
                                                />
                                            </materialUI.TextField>
                                        </div>
                                        <br/>
                                        <materialUI.Button 
                                            variant="contained"
                                            className='btn-primary'
                                            type='submit'
                                            id='submit=btn'
                                        >Login
                                        </materialUI.Button>
                                        <p className='mt-3'>
                                        Don't have an account? <Link to='/signup'>Sign Up</Link>
                                        <br/>
                                        Forgot your Password? <Link to='/reset_password'>Reset Password</Link>
                                        </p>
                                    </form>
                                </Grid>
                            </Grid>
                        </materialUI.Box>
                    </Grid>
                </Grid>
            
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
