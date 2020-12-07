import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../actions/auth';
import { connect } from 'react-redux';
import { Row, Col, Carousel, Image, Card } from 'antd';

import team from '../images/breaktime-team.JPG';
import logo from '../images/breaktime-logo.png';
const UnauthHome = () => {
    return (
        <div className='container'>
            <div className="jumbotron mt-5">
                <h1 className="display-4">Welcome to the Breaktime Progress Portal. You are not logged in. Please login or register to continue.</h1>
                <hr className="my-4" />
                <Link className="btn btn-primary btn-lg" to='/login' role="button">Login</Link>
            </div>
        </div>
    )
}
const AuthHome = () => {
    const contentStyle = {
        height: '320px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#fff',
    };

    return (
        <div className='container'>
            <div className="jumbotron mt-5">
                <Carousel autoplay >
                    <div>
                        <h3 style={contentStyle}>
                            <Image width={450} src={team} alt="Breaktime Team" />
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <Image width={600} src={logo} alt="Breaktime Logo" />
                        </h3>
                    </div>
                </Carousel>
                <h1 className="display-4">Welcome to Breaktime Progress Portal! Let's get started!</h1>
                <hr className="my-4" />
                <Row>
                    <Col span={12}>

                        <NavLink className="nav-link" exact to='/assignments'>
                            <Card title="Assignments" bordered={false}>
                                <NavLink className="nav-link" exact to='/assignments'>
                                    View your assignments
                                </NavLink>
                            </Card>

                        </NavLink>
                    </Col>
                    <Col span={12}>
                        <NavLink className="nav-link" exact to='/timesheet'>
                            <Card title="Timesheet" bordered={false}>
                                <NavLink className="nav-link" exact to='/timesheet'>
                                    View and enter your times!
                                </NavLink>
                            </Card>
                        </NavLink>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

const Home = ({ isAuthenticated }) => {
    return isAuthenticated ? AuthHome() : UnauthHome()
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { checkAuthenticated })(Home);
