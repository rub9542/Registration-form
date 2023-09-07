import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { Form, Input, Button, DatePicker, Radio, Slider } from "antd";
import pageReducer from "./redux/Pagereducer";
import { addState } from "./redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
export default function PageFour() {
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const page = useSelector(pageReducer);
  const dispatch = useDispatch();

  const configureRating = (data) => {
    data.rating = data.rating === 10 ? data.rating - 1 : data.rating;
    return data;
  };
  const onSubmit = (data) => {
    let date = `${data.registrationDate.$d}`;
    data.registrationDate = new Date(date).toISOString().split("T")[0];
    dispatch(addState(configureRating(data)));

  };
  return (
    <Form onFinish={(e) => handleSubmit(onSubmit(e))}>
      <Form.Item
        label="Membership Level"
        name="membershipLevel"
        rules={[
          {
            required: true,
            message: "Please enter membership level!",
          },
          {
            pattern: /^[A-Za-z]{2,20}$/,
            message: "Please enter a valid Membership Level",
          },
        ]}
      >
        <Input defaultValue={page.page.membershipLevel} />
      </Form.Item>

      <Form.Item
        name="subscriptionType"
        label="Subscription Type"
        rules={[
          {
            required: true,
            message: "Please choose your subscription type!",
          },
        ]}
      >
        <Radio.Group defaultValue={page.page.subscriptionType}>
          <Radio value="basic">Basic</Radio>
          <Radio value="pro">Pro</Radio>
          <Radio value="premium">Premium</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="registrationDate"
        label="Registration Date"
        {...config}
        rules={[
          {
            required: true,
            message: "Please enter Registration Date!",
          },
        ]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          // defaultValue={(moment(page.page.registrationDate), "YYYY-MM-DD")}
        />
      </Form.Item>

      <Form.Item
        label="Tracking Number"
        name="trackingNumber"
        rules={[
          {
            required: true,
            message: "Please enter tracking number!",
          },
          {
            pattern: /^[a-zA-Z0-9]{10,20}$/,
            message: "Please enter a valid Tracking Number",
          },
        ]}
      >
        <Input defaultValue={page.page.trackingNumber} />
      </Form.Item>
      <Form.Item
        name="shipmentStatus"
        label="Shipment Status"
        rules={[
          {
            required: true,
            message: "Please choose your shipment status!",
          },
        ]}
      >
        <Radio.Group defaultValue={page.page.shipmentStatus}>
          <Radio value="pending">Pending</Radio>
          <Radio value="shipped">Shipped</Radio>
          <Radio value="delivered">Delivered</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="customerFeedback"
        label="Customer Feedback"
        rules={[
          {
            required: true,
            message: "Please submit your feedback!",
          },
          {
            pattern: /^[a-zA-Z0-9]{10,100}$/,
            message: "Please enter a valid Tracking Number",
          },
        ]}
      >
        <Input.TextArea defaultValue={page.page.customerFeedback} />
      </Form.Item>
      <Form.Item
        name="rating"
        label="Rating"
        rules={[
          {
            required: true,
            message: "Please submit your rating!",
          },
        ]}
      >
        <Slider
          value={page.page.rating}
          marks={{
            0: "0",
            10: "1",
            23: "2",
            33: "3",
            43: "4",
            53: "5",
            63: "6",
            73: "7",
            85: "8",
            100: "9",
          }}
        />
      </Form.Item>

      <Form.Item className="sbt-btn">
        <div className="bck-btn" onClick={() => navigate("/3")}>
          {" "}
          Back
        </div>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
