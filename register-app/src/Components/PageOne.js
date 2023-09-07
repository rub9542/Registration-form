import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, DatePicker, Radio } from "antd";
import pageReducer from "./redux/Pagereducer";
import { addState } from "./redux/actions";
import moment from "moment"; 
const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
export default function PageOne() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit } = useForm();
  const page = useSelector(pageReducer);

  const onSubmit = (data) => {
    let date = `${data.birthdate.$d}`;
    data.birthdate = new Date(date).toISOString().split("T")[0];
    dispatch(addState(data));
    navigate("/2");
  };
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

  return (
    <Form
      onFinish={(e) => handleSubmit(onSubmit(e))}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="First Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter your name!",
          },
          {
            pattern: /^[a-zA-Z\s]{3,30}$/,
            message: "Please enter a valid name",
          },
        ]}
      >
        <Input defaultValue={page.page.name} />
      </Form.Item>
      <Form.Item
        name="Email"
        label="Email"
        rules={[
          { type: "email" },
          {
            required: true,
            message: "Please enter your Email!",
          },
        ]}
      >
        <Input defaultValue={page.page.Email} />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: "Please enter your address!",
          },
          {
            pattern: /^[\w\s\d.,:#\-\/]{5,50}$/,
            message: "Please enter a valid address",
          },
        ]}
      >
        <Input.TextArea defaultValue={page.page.address} />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
          {
            pattern: /^[0-9]{10,15}$/,
            message: "Please enter a valid 10-digit phone number",
          },
        ]}
      >
        <Input
          defaultValue={page.page.phoneNumber}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="birthdate"
        label="Birth date"
        {...config}
        rules={[
          {
            required: true,
            message: "Please ente your birth date!",
          },
        ]}
      >
        <DatePicker format="YYYY-MM-DD"  />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please choose your gender!",
          },
        ]}
      >
        <Radio.Group defaultValue={page.page.gender}>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item className="sbt-btn">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
