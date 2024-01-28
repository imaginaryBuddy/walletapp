import React, { useState } from "react";
import { Modal, Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loadersSlice";
import { VerifyAccount } from "../../apicalls/transactions";
import { SendRequest } from "../../apicalls/requests";
import { ReloadUser } from "../../redux/usersSlice";

function NewRequestModal({
  showNewRequestModal,
  setShowNewRequestModal,
  reloadData,
}) {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    try {
      dispatch(ShowLoading());
      const response = await VerifyAccount({
        receiver: form.getFieldValue("receiver"),
      });
      dispatch(HideLoading());
      if (response.success) {
        setIsVerified("TRUE");
      } else {
        setIsVerified("FALSE");
      }
    } catch (error) {
      dispatch(HideLoading());
      setIsVerified("FALSE");
    }
  };
  const onFinish = async (values) => {
    try {
        if(values.amount > user.balance){
            message.error("Insufficient funds");
            return;
        }
      dispatch(ShowLoading());
      const payload = {
        ...values,
        sender: user._id,
        reference: values.reference || "no reference",
        status: "success",
      };
      const response = await SendRequest(payload);

      if (response.success) {
        reloadData();
        setShowNewRequestModal(false);
        message.success(response.message);
        // dispatch(ReloadUser(true));
      } else{
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
        message.error(error.message);
        dispatch(HideLoading());
    }
  };

  return (
    <div>
      <Modal
        title="New Reuest"
        open={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        onCancel={() => setShowNewRequestModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="flex gap-2 items-center">
            <Form.Item label="Account Number" name="receiver" className="w-100">
              <input type="text"></input>
            </Form.Item>
            <button
              className="primary-contained-btn mt-1"
              type="button"
              onClick={verifyAccount}
            >
              Verify
            </button>
          </div>

          {isVerified === "TRUE" && (
            <div className="success-bg p-2 m-2">
              <h1 className="text-sm">Account Verified</h1>
            </div>
          )}

          {isVerified === "FALSE" && (
            <div className="failure-bg p-2 m-2">
              <h1 className="text-sm">Invalid Account</h1>
            </div>
          )}

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount",
              },
            //   {
            //       max: user.balance,
            //       type: "number",
            //       message: "Insufficient balance"
            //   },
              // {
              //     min: 1,
              //     type: "number",
              //     message: "Please enter a positive amount"
              // }
            ]}
          >
            <input type="number" max={user.balance} />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <textarea type="text"></textarea>
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button
              className="primary-outlined-btn"
              type="button"
              onClick={() => setShowNewRequestModal(false)}
            >
              Cancel
            </button>
            {isVerified === "TRUE" && (
              <button className="primary-contained-btn" type="submit">
                Request
              </button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default NewRequestModal;
