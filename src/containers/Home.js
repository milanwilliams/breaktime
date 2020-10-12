import React from 'react';
import { Link } from 'react-router-dom';

const home = () => (
    <div className='container'>
        <div className="jumbotron mt-5">
            <h1 className="display-4">Breaktime unauthenticated home.</h1>
            <hr className="my-4" />
            <p>Login + Register here</p>
            <Link className="btn btn-primary btn-lg" to='/login' role="button">Login</Link>
        </div>
    </div>
);

export default home;
