import React, {useState} from "react"; 
import { Modal, Form, message } from "antd"; 
import { useDispatch, useSelector } from "react-redux";
import {ShowLoading, HideLoading} from "../../redux/loadersSlice";
// import {VerifyAccount, TransferFunds} from "../../apicalls/transactions";
// import {ReloadUser} from "../../redux/usersSlice";
import StripeCheckout from "react-stripe-checkout"; 
import {DepositFunds} from "../../apicalls/transactions";

function DepositModal({showDepositModal, setShowDepositModal, reloadData}){
    const [form] = Form.useForm();
    const [amount = 10, setAmount] = useState(10); 
    const dispatch = useDispatch(); 
    const onToken = async (token) =>{
        try {
            dispatch(ShowLoading());
            const response = await DepositFunds({ token, amount: 
            form.getFieldValue("amount"), }); 
            dispatch(HideLoading()); 
            if (response.success){
                reloadData(); 
                setShowDepositModal(false); 
                message.success(response.message); 
            }else {
                message.error(response.message); 
            }
        } catch (error) {
            dispatch(HideLoading()); 
            message.error(error.message); 
        }
    }

    return(
        <Modal 
        title="Deposit"
        open={showDepositModal}
        onCancel={() => setShowDepositModal(false)}
        >
            <div className="flex-col gap-1">
                <Form layout="vertical" form={form}>
                    <Form.Item 
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Input amount",
                        }
                    ]}>
                        <input type="number"/>
                    </Form.Item>
                    <div className="flex justify-end gap-1">
                        <button className="primary-outlined-btn">Cancel</button>
                        <StripeCheckout
                            currency="USD"
                            shippingAddress={true}
                            token={onToken}
                            stripeKey="pk_test_51OcduOEZ9Q4MZzbDpRnz24S7s5mKU7gl328ysakbd7eavlBolzwAi8qhYt9MwKQv611x3TAWOeWcvvtrV4soD3EP00wgkXadb9"
                            >
                            <button className="primary-contained-btn">Deposit</button>
                            </StripeCheckout>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default DepositModal; 