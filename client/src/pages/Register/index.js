import React from 'react';
import {Form, Button, message, Checkbox, Input, Col, Row, Space, Select} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import {useNavigate} from 'react-router-dom';
import {RegisterUser} from "../../apicalls/users";
import {useDispatch} from "react-redux";
import {ShowLoading, HideLoading} from "../../redux/loadersSlice";

export default function Register(){
    const [form] = useForm()
    const dispatch = useDispatch();
    const onFinish = async(values) =>{
        try{
            dispatch(ShowLoading());
            const response = await RegisterUser(values);
            dispatch(HideLoading());
            if(response.success){
                message.success(response.message);
                navigate('/login');
            } else{
                message.error(response.message);
                console.log(response.message);
            }
        }catch(error){
            dispatch(HideLoading());
            console.log('Register Error')
            message.error(error.message);
        }
    };
    const navigate = useNavigate();
    return(
        <div className={'m-5'}>
            <h1 className={'text-2xl'}>Wallet App</h1>
            <h2 className={'text-xl'}>Register</h2>
            <p className={'text-sm underline'} onClick={()=>navigate('/login')}>Already a member? Log In</p>
            <hr/>
            <Form
                form={form}
                layout={"vertical"}
                onFinish={onFinish}
                scrollToFirstError
            >
                <Row gutter={16}>
                <Col span={6}>
                        <Form.Item label={"First Name"} name={"firstName"} rules={[
                                {
                                    required: true,
                                    message: 'Please input your First Name!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                </Col>
                <Col span={6}>
                        <Form.Item label={"Last Name"} name={"lastName"} rules={[
                            {
                                required: true,
                                message: 'Please input your Last Name!',
                            },
                        ]}
                        >
                            <Input/>
                        </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={"Email"} name={"email"} rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={"Username"} name={"username"} rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={"Identification Type"} name={"identificationType"}>
                        <Select
                            showSearch
                            placeholder="Select ID Type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                {
                                    value: 'nationalID',
                                    label: 'National ID',
                                },
                                {
                                    value: 'passport',
                                    label: 'Passport',
                                },
                                {
                                    value: 'drivingLicense',
                                    label: 'Driving License',
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                        <Form.Item label={"Identification Number"} name={"identificationNumber"}>
                            <Input/>
                        </Form.Item>
                </Col>
                <Col span={24}>
                <Form.Item label={"Address"} name={"address"}>
                    <Input rows={2} maxLength={100}/>
                </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={"Password"} name={"password"}>
                        <Input.Password/>
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item label={"Confirm Password"} name={"confirmPassword"}>
                        <Input.Password/>
                    </Form.Item>
                </Col>
                </Row>
                <div className={"flex justify-end"}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </div>
            </Form>

        </div>
    )
}