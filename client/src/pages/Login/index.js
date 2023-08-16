import React from 'react';
import {Form, Button, Input, Col, Row, message} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import {useNavigate} from 'react-router-dom';
import {LoginUser} from "../../apicalls/users";
import {useDispatch} from "react-redux";
import {ShowLoading, HideLoading} from "../../redux/loadersSlice";

export default function Login(){
    const navigate = useNavigate();
    const [form] = useForm();
    const dispatch = useDispatch();
    const onFinish = async (values) =>{
        try{
            dispatch(ShowLoading());
            const response = await LoginUser(values);
            dispatch(HideLoading());
            if(response.success){
                message.success(response.message);
                localStorage.setItem('token', response.data)
                // navigate('/');
                window.location.href = "/"; //causes full page reload and prevent loading homepage before loading in the data into localStorage
            } else{
                message.error(response.message);
            }
        }catch(error){
            dispatch(HideLoading());
            console.log('Login Error')
            message.error(error.message);
        }
    };

    return(
        <div className={'bg-primary flex items-center justify-center h-screen'}>
        <div className={'card w-400 p-3'}>
            <div className={'flex-col items-center justify-between'}>
                <h1 className={'text-2xl'}>Wallet App</h1>
                <h2 className={'text-xl'}>Login</h2>

            </div>
            <hr/>
            <Form
                form={form}
                layout={"vertical"}
                onFinish={onFinish}
                scrollToFirstError
            >
                <Row gutter={16}>
                    <Col span={24}>
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

                    <Col span={24}>
                        <Form.Item label={"Password"} name={"password"}>
                            <Input.Password/>
                        </Form.Item>
                    </Col>

                </Row>
                <div className={"flex justify-left"}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </div>
                <p className={'text-sm underline'} onClick={()=>navigate('/register')}>Not a member? Register</p>
            </Form>

        </div>
        </div>
    )
}