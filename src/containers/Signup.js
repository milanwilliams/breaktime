import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../actions/auth';

const Signup = ({ signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name:'',
        employee_id:'',
        username: '',
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
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='First Name*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='Last Name*'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='Employee ID*'
                        name='employee_id'
                        value={employee_id}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        value={username}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Register</button>
            </form>
            <p className='mt-3'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);
