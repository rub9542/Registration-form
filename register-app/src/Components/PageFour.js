import React from "react";
import { useForm } from "react-hook-form";
import formData from "../Form.json"; // Import your JSON data
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, DatePicker, Radio, Slider } from "antd";
import pageReducer from "./redux/Pagereducer";
import { addState } from "./redux/actions";

const PageFour = () => {
  const { handleSubmit, control, errors } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector(pageReducer);
  const rating = {
    0: "1",
    10: "2",
    23: "3",
    33: "4",
    43: "5",
    53: "6",
    63: "7",
    73: "8",
    85: "9",
    100: "10",
  };

  const onSubmit = (data) => {
    let date = `${data.registrationDate.$d}`;
    data.registrationDate = new Date(date).toISOString().split("T")[0];
    data.rating = rating[data.rating];
    dispatch(addState(data));
    // navigate("/2"); // Handle form submission here
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      onFinish={(e) => handleSubmit(onSubmit(e))}
      onFinishFailed={(e) => onFinishFailed(e)}
    >
      {formData.map((field) => {
        let regexPattern = "";
        if (field?.pattern) {
          const startDelimiter = field?.pattern[0];
          const endDelimiter = field?.pattern[field?.pattern.length - 1];
          regexPattern =
            startDelimiter + field.pattern?.slice(1, -1) + endDelimiter;
        }
        if (field.pageNumber === "4") {
          if (field.label === "customerFeedback") {
            return (
              <Form.Item
                label={field?.labelName}
                key={field?.label}
                name={field?.label}
                rules={[
                  {
                    required: true,
                    message: `Please enter your ${field?.labelName}!`,
                  },
                  {
                    pattern: regexPattern,
                    message: `Please enter a valid ${field?.labelName}`,
                  },
                  {
                    max: parseInt(field?.maxLength),
                    message: `Maximum length exceeded for ${field?.labelName}!`,
                  },
                  {
                    min: parseInt(field?.minLength),
                    message: `Minimum length not met for ${field?.labelName}!`,
                  },
                ]}
              >
                <Input.TextArea defaultValue={page.page.customerFeedback} />
              </Form.Item>
            );
          } else if (field.label === "registrationDate") {
            return (
              <Form.Item
                label={field?.labelName}
                key={field?.label}
                name={field?.label}
                rules={[
                  {
                    required: true,
                    message: `Please enter your ${field?.labelName}!`,
                  },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            );
          } else if (
            field.label === "shipmentStatus" ||
            field.label === "subscriptionType"
          ) {
            return (
              <Form.Item
                label={field?.labelName}
                key={field?.label}
                name={field?.label}
                rules={[
                  {
                    required: true,
                    message: `Please enter your ${field?.labelName}!`,
                  },
                ]}
              >
                <Radio.Group
                  defaultValue={
                    field.label === "shipmentStatus"
                      ? page.page.shipmentStatus
                      : page.page.subscriptionType
                  }
                >
                  {field.options.map((item, index) => {
                    return (
                      <Radio key={index} value={item}>
                        {item}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            );
          } else if (field.label === "rating") {
            return (
              <Form.Item
                label={field?.labelName}
                key={field?.label}
                name={field?.label}
                rules={[
                  {
                    required: true,
                    message: `Please submit your ${field?.labelName}!`,
                  },
                ]}
              >
                <Slider value={page.page.rating} marks={rating} />
              </Form.Item>
            );
          } else {
            return (
              <Form.Item
                label={field?.labelName}
                key={field?.label}
                name={field?.label}
                rules={[
                  {
                    required: true,
                    message: `Please enter your ${field?.labelName}!`,
                  },
                  {
                    pattern: regexPattern,
                    message: `Please enter a valid  ${field?.labelName}`,
                  },
                  {
                    max: parseInt(field?.maxLength),
                    message: `Maximum length exceeded for ${field?.labelName}!`,
                  },
                  {
                    min: parseInt(field?.minLength),
                    message: `Minimum length not met for ${field?.labelName}!`,
                  },
                ]}
              >
                <Input
                  defaultValue={
                    field?.labelName === "membershipLevel"
                      ? page.page.membershipLevel
                      : page.page.trackingNumber
                  }
                />
              </Form.Item>
            );
          }
        }
      })}

      <Form.Item className="sbt-btn">
        <div className="bck-btn" onClick={() => navigate("/3")}>
          Back
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PageFour;
