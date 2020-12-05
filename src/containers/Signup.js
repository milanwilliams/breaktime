import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../actions/auth';
import * as materialUI from '@material-ui/core';
import SocialMediaBar from '../components/SocialMediaBar.js';
import team from '../images/breaktime-team.JPG';
import logo from '../images/breaktime-logo.png';
import Grid from '@material-ui/core/Grid';
import './Signup.css';


const Signup = ({ signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name:'',
        employee_id:'',
        username:'',
        email: '',
        password: '',
        re_password: ''
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { first_name,last_name, employee_id, username, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup({ first_name, last_name, employee_id, username, email, password, re_password });
            setAccountCreated(true);
        }
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    if (accountCreated)
        return <Redirect to='login' />;
    
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
                    <materialUI.Box className="background">
                        <Grid container spacing={0}>
                            <Grid item id="form-container">
                                <form className='form' onSubmit={e => onSubmit(e)}>
                                <h1 className="form-header" >User Registration</h1>
                                <div className='form-group'>
                                    <label htmlFor='form-control' class='form-label'>First Name</label>
                                    <br/>
                                    <materialUI.TextField variant="outlined" className='form-control'>
                                        <input 
                                            className='form-control'
                                            type='text'
                                            placeholder='First Name*'
                                            name='first_name'
                                            value={first_name}
                                            onChange={e => onChange(e)}
                                            required 
                                        />
                                    </materialUI.TextField>
                                </div>
                                <br/>
                                <div className='form-group'>
                                    <label htmlFor='form-control' class='form-label'>Last Name</label>
                                    <br/>
                                    <materialUI.TextField variant="outlined" className='form-control'>
                                        <input 
                                            className='form-control'
                                            type='text'
                                            placeholder='Last Name*'
                                            name='last_name'
                                            value={last_name}
                                            onChange={e => onChange(e)}
                                            required 
                                        />
                                    </materialUI.TextField>
                                </div>
                                <br/>
                                <div className='form-group'>
                                    <label htmlFor='form-control' class='form-label'>Employee ID</label>
                                    <br/>
                                    <materialUI.TextField variant="outlined" className='form-control'>
                                        <input 
                                            className='form-control'
                                            type='text'
                                            placeholder='Employee ID*'
                                            name='employee_id'
                                            value={employee_id}
                                            onChange={e => onChange(e)}
                                            required 
                                        />
                                    </materialUI.TextField>
                                </div>
                                <br/>
                                <div className='form-group'>
                                    <label htmlFor='form-control' class='form-label'>Username</label>
                                    <br/><br/>
                                    <materialUI.TextField variant="outlined" className='form-control'>
                                        <input 
                                            className='form-control'
                                            type='text'
                                            placeholder='Username*'
                                            name='username'
                                            value={username}
                                            onChange={e => onChange(e)}
                                            required 
                                        />
                                    </materialUI.TextField>
                                </div>
                                <br/>
                                <div className='form-group'>
                                    <label htmlFor='form-control' class='form-label'>Email</label>
                                    <br/>
                                    <materialUI.TextField variant="outlined" className='form-control'>
                                        <input id="email-field  "
                                            className='form-control'
                                            type='email'
                                            placeholder='Email*'
                                            name='email'
                                            value={email}
                                            onChange={e => onChange(e)}
                                            required 
                                        />
                                    </materialUI.TextField>
                                </div>
                                <br/>
                                <div className='form-group'>
                                    <label htmlFor='form-control' class='form-label'>Password</label>
                                    <br/>
                                    <materialUI.TextField variant="outlined" className='form-control'>
                                        <input
                                            className='form-control'
                                            type='password'
                                            placeholder='Password*'
                                            name='password'
                                            value={password}
                                            onChange={e => onChange(e)}
                                            minLength='6'
                                            required
                                        />
                                    </materialUI.TextField>
                                </div>
                                <br/>
                                <div className='form-group'>
                                    <label htmlFor='form-control' class='form-label'>Confirm Password</label>
                                    <br/>
                                    <materialUI.TextField variant="outlined" className='form-control'>
                                        <input
                                            className='form-control'
                                            type='password'
                                            placeholder='Confirm Password*'
                                            name='re_password'
                                            value={re_password}
                                            onChange={e => onChange(e)}
                                            minLength='6'
                                            required
                                        />
                                    </materialUI.TextField>
                                </div>
                                <br/><br/>
                                <materialUI.Button 
                                    variant="contained"
                                    className='btn-primary'
                                    type='submit'
                                    id='submit=btn'
                                >Create Account
                                </materialUI.Button>
                                <p className='mt-3' >
                                    Already have an account? <Link to='/login'>Sign In</Link>
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
})

export default connect(mapStateToProps, { signup })(Signup);
