import React from "react";
import { useForm } from "react-hook-form";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import pageReducer from "./redux/Pagereducer";
import { addState } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";


export default function PageTwo() {
  const page = useSelector(pageReducer);
  const dispatch = useDispatch();

  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(addState(data));
    navigate("/3");
  };

  return (
    <Form onFinish={(e) => handleSubmit(onSubmit(e))}>
      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[
          {
            required: true,
            message: "Please enter Company name!",
          },
          {
            pattern: /^[a-zA-Z\s]{3,30}$/,
            message: "Please enter a valid Company name",
          },
        ]}
      >
        <Input defaultValue={page.page.companyName} />
      </Form.Item>

      <Form.Item
        name="CIN"
        label="CIN"
        rules={[
          {
            required: true,
            message: "Please enter CIN number!",
          },
          {
            pattern: /^[0-9]+$/,
            message: "Please enter a valid CIN number!",
          },
        ]}
      >
        <Input
          defaultValue={page.page.CIN}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item className="sbt-btn">
        <div className="bck-btn" onClick={() => navigate("/")}>
          Back
        </div>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
