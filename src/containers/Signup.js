import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../actions/auth';
import * as materialUI from '@material-ui/core';
import * as icons from '@ant-design/icons';
import team from '../images/breaktime-team.JPG';
import logo from '../images/breaktime-logo.JPG';
import './Signup.css';

const Signup = ({ signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup({ name, email, password, re_password });
            setAccountCreated(true);
        }
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    if (accountCreated)
        return <Redirect to='login' />;
    
    return (
        <div >
            <materialUI.ButtonGroup className="social-media-group" variant="text" color="primary" orientation="vertical" aria-label="text primary button group">
                <a href="https://instagram.com/breaktime">
                    <materialUI.Button>
                        <icons.InstagramFilled className='social-media-icon'/>
                    </materialUI.Button>
                </a>
                <a href="https://www.facebook.com/breaktimeboston">
                    <materialUI.Button >
                        <icons.FacebookFilled className='social-media-icon'/>
                    </materialUI.Button>
                </a>
                <a href="https://www.linkedin.com/company/breaktimeboston/">
                    <materialUI.Button>
                        <icons.LinkedinFilled className='social-media-icon'/>
                    </materialUI.Button>
                </a>
                <a href="https://twitter.com/breaktimeboston">
                    <materialUI.Button>
                        <icons.TwitterOutlined className='social-media-icon'/>
                    </materialUI.Button>
                </a>            
            </materialUI.ButtonGroup>
            <img id="img-logo" src={logo} alt="Breaktime Logo"/>
            <h2 id="mission-statement">Breaking the Cycle of Homelessness.</h2>
            <img id="img-team" src= {team} alt="Breaktime Team"/>
            <materialUI.Box className="grey-background">
                <h1 className="form-header" >User Registration</h1>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <label htmlFor='form-control' class='form-label'>Name</label>
                        <br/><br/>
                        <materialUI.TextField variant="outlined" className='form-control'>
                            <input 
                                className='form-control'
                                type='text'
                                placeholder='Name*'
                                name='name'
                                value={name}
                                onChange={e => onChange(e)}
                                required 
                            />
                        </materialUI.TextField>
                    </div>
                    <br/>
                    <div className='form-group'>
                        <label htmlFor='form-control' class='form-label'>Email</label>
                        <br/><br/>
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
                        <br/><br/>
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
                        <br/><br/>
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
                    >Create Account
                    </materialUI.Button>
                </form>
                <p className='mt-3' id="sign-in-invitation">
                    Already have an account? <Link to='/login'>Sign In</Link>
                </p>
            </materialUI.Box>
        </div>
    );

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);
