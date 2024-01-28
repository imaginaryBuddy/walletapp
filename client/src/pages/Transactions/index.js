import React, {useEffect, useState} from 'react';
import PageTitle from "../../components/PageTitle";
import { Table, message} from "antd";
import TransferFundsModal from "./TransferFundsModal";
import DepositModal from "./DepositModal"; 
import {useDispatch, useSelector} from "react-redux"; 
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';
import { GetAllTransactionsOfUser } from '../../apicalls/transactions';
import moment from "moment"; 
import { trusted } from 'mongoose';

function Transactions(){
    const [showTransferFundsModal, setShowTransferFundsModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [data=[], setData] = useState([]); 
    const dispatch = useDispatch(); 
    const user = useSelector(state => state.users);
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => {
                return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A")
            }
        },
        {
            title: "Transaction ID",
            dataIndex: "_id",
        },
        {
            title: "Amount",
            dataIndex: "amount",

        },
        {
            title: "Type",
            dataIndex: "type",
            render: (text, record) => {
    
                if (record.sender._id === record.receiver._id){
                    return "Deposit"; 
                } else if (record.sender._id === user._id){
                    return "Debit"
                } else
                {
                    return "Credit";
                }
            }
        },
        {
            title: "Reference Account",
            dataIndex: "",
            render: (text, record) => { // note that (text, record) is the specification from AntD, record is the whole row data, text is the cell data 
                return record.sender._id === user._id ?  <div>
                    <h1 className="text-sm">
                        {record.receiver.firstName} {record.receiver.lastName}
                    </h1>
                </div>: <div>
                    <h1 className="text-sm">
                        {record.sender.firstName} {record.sender.lastName}
                    </h1>
                </div>
            },
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ]
    const getData=async() => {
        try {
            dispatch(ShowLoading()); 
            const response = await GetAllTransactionsOfUser(); 
            if (response.success){
                setData(response.data); 
            }
            dispatch(HideLoading()); 
        }catch(error){
            dispatch(HideLoading()); 
            message.error(error.message); 
        }
    }

    useEffect(() => {
        getData(); 
    }, []) // [] indicates that it runs only on the first render 
    return(
        <div>
            <div className={"flex justify-between items-center"}>
                <PageTitle title={"Transactions"}/>
                <div className={"flex gap-1"}>
                    <button className={"primary-contained-btn"} type="button" onClick={()=> setShowTransferFundsModal(true)}>
                        Transfer
                    </button>
                    <button className={"primary-outlined-btn"} type="button" onClick={()=> setShowDepositModal(true)}>
                        Deposit
                    </button>
                </div>
            </div>
            
            <Table columns={columns} dataSource={data}/>
            {showTransferFundsModal && (
        <TransferFundsModal
          showTransferFundsModal={showTransferFundsModal}
          setShowTransferFundsModal={setShowTransferFundsModal}
          reloadData={getData}
        />

      )}
      {
        showDepositModal && (
        <DepositModal
            showDepositModal={showDepositModal}
            setShowDepositModal={setShowDepositModal}
            reloadData={getData}
        />

        )
      }
        </div>
    )
}

export default Transactions;