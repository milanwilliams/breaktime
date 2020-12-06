import React, { Fragment, useEffect, useState } from 'react';
import APIClient from '../utils/apiClient';
import Navbar from '../components/Navbar.js';
const api = new APIClient()
const ErrorPage = () => {

    return (
        <div>
            404 error!
        </div>
    );
}
export default ErrorPage;