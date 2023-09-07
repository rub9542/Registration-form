import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, DatePicker, Radio } from "antd";
import pageReducer from "./redux/Pagereducer";
import { addState } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
export default function PageThree() {
    const page = useSelector(pageReducer);
  const dispatch = useDispatch();

    const { handleSubmit} = useForm();
const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(addState(data));

    navigate('/4')
  };

  return (
    <Form onFinish={(e)=>handleSubmit(onSubmit(e))}>
      <Form.Item
        label="Product Code"
        name="productCode"
        rules={[
          {
            required: true,
            message: "Please enter the product code!",
          },
          {
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: "Please enter a valid Product Code",
          },
        ]}
      >
        <Input defaultValue={page.page.productCode} />
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Quantity"
        rules={[
          {
            required: true,
            message: "Please enter Quantity!",
          },
          {
            pattern: /^[0-9]+$/,
            message: "Please enter a valid Product Code",
          },
        ]}
      >
        <Input
          defaultValue={page.page.quantity}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        label="Order Number"
        name="orderNumber"
        rules={[
          {
            required: true,
            message: "Please enter the order number!",
          },
          {
            pattern: /^[a-zA-Z0-9]{8,15}$/,
            message: "Please enter a valid Product Code",
          },
        ]}
      >
        <Input defaultValue={page.page.orderNumber} />
        </Form.Item>

      <Form.Item
        name="paymentMethod"
        label="Payment Method"
        rules={[
          {
            required: true,
            message: "Please choose a payment method!",
          },
        ]}
      >
        <Radio.Group defaultValue={page.page.paymentMethod}>
          <Radio value="Credit Card">Credit Card</Radio>
          <Radio value="PayPal">PayPal</Radio>
          <Radio value="Bank Transfer">Bank Transfer</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item className="sbt-btn">
        <div className="bck-btn" onClick={() => navigate("/2")}>
          Back
        </div>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
