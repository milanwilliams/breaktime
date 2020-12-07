import React, { Fragment, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';
import APIClient from '../utils/apiClient';


import { Layout, Menu, Breadcrumb, List, Row, Col, Space, Button, Drawer, Card, Collapse } from 'antd'
import { SettingOutlined, StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
// import '../components/timesheet.css';
import "antd/dist/antd.css";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { Panel } = Collapse


const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
const displayContent = (title, details, due, link) => (
    <>
        {/* <Collapse  defaultActiveKey={['1']} ghost={true}> */}
        {/* <Panel header={title}> */}
        <h1>{title}</h1>
        <p>{details}</p>
        <p><b>Due: {due}</b></p>
        <p>Link: {link}</p>
        {/* </Panel> */}
        {/* </Collapse> */}
    </>
)
const data = [
    {
        title: 'Fill out HR Survey',
        content: 'Remember to fill out the survey to give us feedback!',
        due: '2020-12-14',
        link: 'http://google.com'
    },
    {
        title: 'Training documentation',
        content: 'Fill out training documents',
        due: '2020-12-14',
        link: 'http://google.com'
    },
    {
        title: 'How to fill out a timesheet',
        content: 'Learn how to fill out your timesheet',
        due: '2020-12-14',
        link: 'http://google.com'
    },
    {
        title: 'How to explore the Breaktime Progress Portal',
        content: 'Explore the access portal with this tutorial!',
        due: '2020-12-14',
        link: 'http://google.com'
    },
];
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const defaultItem = () => (
    <div>
        Load an assignment from the left.
    </div>
)
const api = new APIClient()

const Assignments = ({ isAuthenticated, logout }) => {
    useEffect(() => {
        // for '5', we'll need to get it from the user session information (from token login) 
        //const timesheetData = api.getTimesheetEntriesRange(timesheetParams);
        const timesheetData = api.getTimesheetEntriesRange('1', '2020-11-23', '2020-11-25');
    }, [])
    const [visible, setVisible] = useState(false)
    const [currentItem, setItem] = useState(defaultItem)
    const onClose = () => {
        setVisible(false);
    };
    const showDrawer = () => {
        setVisible(true)
    };
    return (
        <>
            <Row gutter={200}>
                <Col span={10}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        bordered
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        footer={
                            <div>
                                <b>Your assignments</b>
                            </div>
                        }
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                itemLayout="vertical"
                                actions={[
                                    <IconText icon={StarOutlined} text="0" key="list-vertical-star-o" />,
                                    <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
                                ]}
                                extra={`Due date: ${item.due}`}
                            >

                                <List.Item.Meta
                                    title={<a onClick={() => setItem(displayContent(item.title, item.content, item.due, item.link))}>{item.title}</a>}
                                    description={item.content}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
                <Col>
                    <Card style={{ width: 400, height: 375 }}>
                        <div className="site-drawer-render-in-current-wrapper">
                            {currentItem}
                            <div style={{ marginTop: 16 }}>

                            </div>
                            {/* <Drawer
                                title="Basic Drawer"
                                placement="right"
                                closable={false}
                                onClose={() => onClose()}
                                visible={visible}
                                getContainer={false}
                                style={{ position: 'absolute' }}
                            >
                                <p>Some contents...</p>
                            </Drawer> */}
                        </div>
                    </Card>

                </Col>

            </Row>


        </>

    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated })(Assignments);
