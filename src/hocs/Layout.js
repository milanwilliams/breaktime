import React, { useEffect, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import { Layout, Menu, Breadcrumb } from 'antd'
import { SettingOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../actions/auth';
// import '../components/timesheet.css';
import "antd/dist/antd.css";
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

const MainLayout = (props) => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                await props.checkAuthenticated();
                await props.load_user();
            } catch (err) {

            }
        }

        fetchData();
    }, []);

    return (

        <Layout className="site-layout">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Navbar />



            </Header>
            <Content
                className="site-layout-background"
                // style={{
                //     margin: '24px 16px',
                //     padding: 24,
                //     minHeight: 280,
                // }}
                // className="site-layout" 
                style={{ margin: '24px 16px', padding: 24, marginTop: 80, minHeight: 280 }}
            >
                {props.children}
                    can place data here
                </Content>
            <Footer style={{ textAlign: 'Right' }}>
                <div>
                    footer
                    </div>
            </Footer>

        </Layout>
    );
};

export default connect(null, { checkAuthenticated, load_user })(MainLayout);
