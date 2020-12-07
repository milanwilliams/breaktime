import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import * as materialUI from '@material-ui/core';
import * as icons from '@ant-design/icons';
import team from '../images/breaktime-team.JPG';
import logo from '../images/breaktime-logo.png';
import './Login.css';
import { Row, Col, Image } from 'antd';


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
        return <Redirect to='/' />;  //CHANGE TO LANDING PAGE

    return (
        <div className='container-1' height={300}>
            <Row>
                <Col span={9}>
                    <Row>
                        <Col span={24}>
                            <materialUI.ButtonGroup className="social-media-group" variant="text" color="primary" orientation="vertical" aria-label="text primary button group">
                                <a href="https://instagram.com/breaktime">
                                    <materialUI.Button>
                                        <icons.InstagramFilled className='social-media-icon' />
                                    </materialUI.Button>
                                </a>
                                <a href="https://www.facebook.com/breaktimeboston">
                                    <materialUI.Button >
                                        <icons.FacebookFilled className='social-media-icon' />
                                    </materialUI.Button>
                                </a>
                                <a href="https://www.linkedin.com/company/breaktimeboston/">
                                    <materialUI.Button>
                                        <icons.LinkedinFilled className='social-media-icon' />
                                    </materialUI.Button>
                                </a>
                                <a href="https://twitter.com/breaktimeboston">
                                    <materialUI.Button>
                                        <icons.TwitterOutlined className='social-media-icon' />
                                    </materialUI.Button>
                                </a>
                            </materialUI.ButtonGroup>
                            <Image src={logo} width={400} alt="Breaktime Logo" />
                            <h1 style={{
                                fontFamily: 'Comfortaa',
                                // font-style: normal;
                                // font-weight: 600;
                                // font-size: 36px;
                                // line-height: 42px;
                                // text-align: right;
                                // color: #00247F;
                            }}> Breaking the Cycle of Homelessness.</h1>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                    <Row>
                        <Image width={900} src={team} alt="Breaktime Team" />
                    </Row>



                </Col>

                <Col span={8}>
                    <materialUI.Box className='grey-background' width={600} height={500}>
                        <h1 className='form-header'>User Login</h1>
                        <form className='form' onSubmit={e => onSubmit(e)}>
                            <div className='form-group'>
                                <label htmlFor='form-control' class='form-label'>Username</label>
                                <br />
                                <materialUI.TextField
                                    variant="outlined"
                                    className='form-control'
                                    type='text'
                                    name='username'
                                    value={username}
                                    onChange={e => onChange(e)}
                                    required
                                >
                                </materialUI.TextField>
                            </div>
                            <br />
                            <div className='form-group'>
                                <label htmlFor='form-control' class='form-label'>Password</label>
                                <br />
                                <materialUI.TextField
                                    variant="outlined"
                                    className='form-control'
                                    type='password'
                                    name='password'
                                    value={password}
                                    onChange={e => onChange(e)}
                                    minLength='8'
                                    required
                                >
                                </materialUI.TextField>
                            </div>
                            <br />
                            <materialUI.Button
                                variant="contained"
                                className='btn-primary'
                                type='submit'
                            >Login
                    </materialUI.Button>
                            <p className='mt-3'>
                                Don't have an account? <Link to='/signup'>Sign Up</Link>
                                <br />
                    Forgot your Password? <Link to='/reset_password'>Reset Password</Link>
                            </p>
                        </form>



                    </materialUI.Box>
                </Col>
            </Row>
        </div>

    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
