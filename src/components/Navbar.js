import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../images/breaktime-logo.png';
import '../containers/App.css';

const navbar = ({ isAuthenticated, logout }) => {
    const authLinks = (
        <div>
            <Fragment>
                <a className='nav-link' onClick={logout} href='#!'>Logout</a>
                <Nav.Link className="nav-link" href='/shifts'>Shifts   </Nav.Link>
                <Nav.Link className="nav-link" href='/summary'>Summary   </Nav.Link>
            </Fragment>
        </div>
    );

    const guestLinks = (
        <Fragment>
            <Nav.Link className="nav-link" href='/login'>Login   </Nav.Link>
            <Nav.Link className="nav-link" href='/signup'>Sign Up   </Nav.Link>
        </Fragment>
    );

    return (
        <Navbar fixed="top" bg="light" className="navbar navbar-expand-lg navbar-light bg-light">
            <Nav className="mr-auto">
                <Navbar.Brand href="/../containers/Home.js"> 
                </Navbar.Brand>
                <Nav.Link className="nav-link" href='/'>Home   </Nav.Link>
                <Nav.Link className="navbar-brand" to='/'>Auth System   </Nav.Link>
                <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>
                <button 
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                    Adjust Navigation
                </button>
            </Nav>            
        </Navbar>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(navbar);
