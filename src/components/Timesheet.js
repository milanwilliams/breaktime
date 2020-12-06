import React, { Fragment, useEffect, useState } from 'react';
import APIClient from '../utils/apiClient';
import Navbar from '../components/Navbar.js';
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons';
import '../components/timesheet.css';
import "antd/dist/antd.css";
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

const api = new APIClient()
const Timesheet = () => {

    const [timesheetParams, setTimesheetParams] = useState({
        date: '2020-11-02',
        timeFrom: '08:00:00',
        timeTo: '17:00:00'
    });
    const { id, date, timeFrom, timeTo } = timesheetParams;
    useEffect(() => {
        // for '5', we'll need to get it from the user session information (from token login) 
        //const timesheetData = api.getTimesheetEntriesRange(timesheetParams);
        const timesheetData = api.getTimesheetEntriesRange('1', '2020-11-23', '2020-11-25');
        console.log(timesheetData);
    }, [])

    const createTimesheet = (date, startTime, endTime) => {
        api.createTimesheetEntry(date, startTime, endTime);
    };
    return (
        <div>
            timesheet page!
            calendar select, and table view of data!
        </div>
        // <Layout>
        //     <Layout className="site-layout">
        //         <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

        //             <Menu theme="light" mode="horizontal" onClick={(v) => {
        //                 // userTracker.setTab(v.key);
        //                 console.log("setting tab;", v.key)
        //             }}
        //             // selectedKeys={userTracker.lastTab}
        //             >



        //                 <Menu.Item key="lookup">
        //                     Menu Item here
        //                     {/* <Search
        //                     placeholder="input search text"
        //                     onSearch={value => console.log(value)}
        //                     // onChange={()=> console.log()}
        //                     style={{ width: 200 }}
        //                 /> */}
        //                 </Menu.Item>

        //                 {/* TODO: need to revisit submenu and add view for looking at all settings and accounts etc */}
        //                 <SubMenu key="settings" icon={<SettingOutlined />} title="SGRD Settings">
        //                     <Menu.ItemGroup title="SGRD Management">
        //                         <Menu.Item key="itemcode" >
        //                             Edit Survey Item Codes
        //                         </Menu.Item>
        //                     </Menu.ItemGroup>
        //                 </SubMenu>
        //             </Menu>

        //         </Header>
        //         <Content
        //             className="site-layout-background"
        //             // style={{
        //             //     margin: '24px 16px',
        //             //     padding: 24,
        //             //     minHeight: 280,
        //             // }}
        //             // className="site-layout" 
        //             style={{ margin: '24px 16px', padding: 24, marginTop: 80, minHeight: 280 }}
        //         >
        //             {/* {children} */}
        //             can place data here
        //         </Content>
        //         <Footer style={{ textAlign: 'Right' }}>
        //             <div>
        //                 footer
        //             </div>
        //         </Footer>

        //     </Layout>

        // </Layout>
    );

}
export default Timesheet;