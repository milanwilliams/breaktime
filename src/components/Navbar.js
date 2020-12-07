import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { Layout, Menu, Breadcrumb, Image } from 'antd'
import { SettingOutlined } from '@ant-design/icons';
// import '../components/timesheet.css';
import "antd/dist/antd.css";
import logo from '../images/breaktime-logo.png';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;


const navbar = ({ isAuthenticated, logout }) => {
    const authLinks = (
        <>
            <Menu.ItemGroup title="Actions">
                <Menu.Item key="logout" >
                    <a className='nav-link' onClick={logout} href='#!'>Logout</a>
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Actions">
                <Menu.Item key="timesheet" >
                    <NavLink className="nav-link" exact to='/timesheet'>Timesheet</NavLink>
                </Menu.Item>
                <br></br>
                <Menu.Item key="assignments" >
                    <NavLink className="nav-link" exact to='/assignments'>Assignments</NavLink>
                </Menu.Item>
            </Menu.ItemGroup>
        </>

    );


    const guestLinks = (
        <>
            {/* make sure to now name the title the same as others otherwise it getes MASSIVELY confused */}
            <Menu.ItemGroup title="AccountActions">
                <Menu.Item key="login" >
                    <NavLink className="nav-link" exact to='/login'>Login</NavLink>
                </Menu.Item>
                <br></br>
                <Menu.Item key="signup" >
                    <NavLink className="nav-link" exact to='/signup'>Sign Up</NavLink>
                </Menu.Item>
            </Menu.ItemGroup>

        </>
    )

    return (
        <>
            <Menu theme="light" mode="horizontal" onClick={(v) => {
                // userTracker.setTab(v.key);
                console.log("setting tab;", v.key)
            }}
            // selectedKeys={userTracker.lastTab}
            >


                <Menu.Item key="home">
                    <Link className="navbar-brand" to='/'>Breaktime Progress Portal
                    </Link>
                </Menu.Item>

                {/* TODO: need to revisit submenu and add view for looking at all settings and accounts etc */}
                <SubMenu key="account" icon={<SettingOutlined />} title="Account">
                    {isAuthenticated ? authLinks : guestLinks}
                </SubMenu>
            </Menu>
        </>

    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(navbar);
