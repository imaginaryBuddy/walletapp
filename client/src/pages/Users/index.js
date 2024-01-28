import React, {useState, useEffect} from 'react'
import {useDispatch} from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';
import { GetAllUsers, UpdateUserVerifiedStatus } from '../../apicalls/users';
import { message, Table } from "antd";
import PageTitle from "../../components/PageTitle";

export default function Users(props) {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch(); 
    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Verified",
            dataIndex: "isVerified",
            render: (text, record) => {
                return text ? "Yes" : "No"
            }
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                return (
                    <div className="flex gap-1">
                        {record.isVerified? (
                            <button className='btn btn-success'
                            onClick={() => updateStatus(record, false)}> Suspend </button>
                        ) : (
                            <button className='btn btn-failure'
                            onClick={() => updateStatus(record, true)}>Activate</button>
                        )}
                    </div>
                )
            }
        }

    ]
    const getData = async() => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllUsers(); 
            dispatch(HideLoading());
            if(response.success){
                setUsers(response.data); 
            } else{
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const updateStatus = async(record, isVerified) => {
        try {
            dispatch(ShowLoading());
            const response = await UpdateUserVerifiedStatus({
                selectedUser: record._id,
                isVerified,
            })
            dispatch(HideLoading());
            if (response.success){
                message.success(response.message);
                getData();
            } else{
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getData(); 
    }, []);


    return (
        <>
            <PageTitle title="users"/>
            <Table dataSource={users} columns={columns} className="mt-2"/>
        </>
    )
}
