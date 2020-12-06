import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { Layout, Menu, Breadcrumb } from 'antd'
import { SettingOutlined } from '@ant-design/icons';
// import '../components/timesheet.css';
import "antd/dist/antd.css";
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

const navbar = ({ isAuthenticated, logout }) => {
    const authLinks = (
        <li className="nav-item">
            <a className='nav-link' onClick={logout} href='#!'>Logout</a>
        </li>
    );


    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <NavLink className="nav-link" exact to='/login'>Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact to='/signup'>Sign Up</NavLink>
            </li>
        </Fragment>
    );

    return (
        <>
            <Menu theme="light" mode="horizontal" onClick={(v) => {
                // userTracker.setTab(v.key);
                console.log("setting tab;", v.key)
            }}
            // selectedKeys={userTracker.lastTab}
            >



                <Menu.Item key="home">
                    <Link className="navbar-brand" to='/'>Home</Link>
                </Menu.Item>

                {/* TODO: need to revisit submenu and add view for looking at all settings and accounts etc */}
                <SubMenu key="account" icon={<SettingOutlined />} title="Account">
                    <Menu.ItemGroup title="Actions">
                        <Menu.Item key="actions" >
                            {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        </>

    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(navbar);
