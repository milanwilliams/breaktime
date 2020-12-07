import React, { Fragment, useEffect, useState, useContext, useRef } from 'react';
import APIClient from '../utils/apiClient';
import Navbar from '../components/Navbar.js';
import { Layout, Menu, Breadcrumb, Table, Input, Button, Popconfirm, Form, Tooltip, Row, Col, DatePicker, TimePicker, Dropdown } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, SettingOutlined, InfoCircleOutlined } from '@ant-design/icons';
import '../components/timesheet.css';
import "antd/dist/antd.css";
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { RangePicker } = DatePicker
// reivist using time picker for hours 
const api = new APIClient()
const EditableContext = React.createContext();
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const menu = (
    <Menu>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
            // setEditing(
            //     <Form.Item style={{ margin: 0 }}>
            //         {form.getFieldDecorator(dataIndex, {
            //             rules: [
            //                 {
            //                     required: true,
            //                     message: `${title} is required.`
            //                 }
            //             ],
            //             initialValue: record[dataIndex]
            //         })(
            //             <Dropdown overlay={menu}>
            //                 <span style={{ userSelect: "none" }}>hover on Me</span>
            //             </Dropdown>
            //         )}
            //     </Form.Item>
            // )


        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
    defaultHourPicker = <RangePicker />
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                width: '20%',
                editable: false,
            },
            // {
            //     title: 'Hours',
            //     dataIndex: 'hours',
            //     editable: true,
            // }, // revisit using just hours
            {
                title: 'Start Time',
                dataIndex: 'start',
                editable: true
            },
            {
                title: 'End Time',
                dataIndex: 'end',
                editable: true,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                editable: true,
            }
        ];
        this.state = {
            dataSource: [
                {
                    date: '2020-12-07',
                    start: '08:00:00',
                    end: '17:00:00',
                    description: 'Fill out description for tasks',
                }
            ],
            count: 2,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            date: `2020-12-07`,
            start: 'Fill start time',
            end: 'Fill end time',
            description: "Fill out description"
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Add an extra shift
          </Button>
                <Table
                    scroll={{ x: 1300, y: 300 }}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}
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
        setTimesheetParams(timesheetData)
    }, [])

    const createTimesheet = (enteredTimesheet) => {
        api.createTimesheetEntry(enteredTimesheet.name, enteredTimesheet.type, enteredTimesheet.manager, enteredTimesheet.funding, enteredTimesheet.date, enteredTimesheet.time_from, enteredTimesheet.time_to);
    };
    const getTimesheet = () => {
        console.log("break down time", timesheetParams[0]._d)
        console.log("end time", timesheetParams[1]._d)
        console.log("start: ", `${timesheetParams[0]._d.getFullYear()}-${timesheetParams[0]._d.getMonth() + 1}-${timesheetParams[0]._d.getDate()}`)
        const start_time = `${timesheetParams[0]._d.getFullYear()}-${timesheetParams[0]._d.getMonth() + 1}-${timesheetParams[0]._d.getDate()}`
        const end_time = `${timesheetParams[1]._d.getFullYear()}-${timesheetParams[1]._d.getMonth() + 1}-${timesheetParams[1]._d.getDate()}`
        // const entry = {
        //     name: 'edich4',
        //     timeFrom: start,
        //     timeTo: end
        // }
        api.getTimesheetEntries(start_time, end_time)
    }
    const [form] = Form.useForm();
    return (
        <Form name="complex-form" form={form} wrapperCol={{ span: 30 }}
        // onFieldsChange={(changedFields, allFields) => {
        //     onFieldsChanged(changedFields, allFields) }}
        >

            <Row gutter={10}>
                <Col>
                    <Form.Item label="Manager's name" colon={false}>
                        <Input
                            placeholder="Manager's Name"
                            disabled
                            defaultValue="Joe An." // we need to bring this in from user info later on 
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Your manager's name">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>

                </Col>
                <Col>
                    <Form.Item label="Staff Type" colon={false}>
                        <Input
                            placeholder="Staff Type"
                            disabled
                            defaultValue="S" // we need to bring this in from user info later on 
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Your staff type">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item label="Funding" colon={false}>
                        <Input
                            placeholder="Funding"
                            disabled
                            defaultValue="l" // we need to bring this in from user info later on 
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Funding type">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>Select dates to enter times for:
                </Col>
                <Col>
                    <RangePicker showTime onChange={(date) => { setTimesheetParams(date); console.log("range picker date: ", date) }} />
                </Col>
                <Col>
                    <Button onClick={() => getTimesheet()}>
                        Bring in selected dates
                    </Button>
                </Col>
            </Row>
            <br></br>
            <Form.Item label="Enter Times:" colon={false}>
                <EditableTable />

            </Form.Item>
        </Form >
    );

}
export default Timesheet;