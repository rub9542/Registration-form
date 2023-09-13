import React from "react";
import { useForm, Controller } from "react-hook-form";
import formData from "../Form.json"; // Import your JSON data
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, DatePicker, Radio } from "antd";
import pageReducer from "./redux/Pagereducer";
import { addState } from "./redux/actions";

const PageThree = () => {
  const { handleSubmit, control, errors } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page = useSelector(pageReducer);

  const onSubmit = (data) => {
    dispatch(addState(data));
    navigate("/4"); // Handle form submission here
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
        if (field.pageNumber === "3") {
          if (field.label === "paymentMethod") {
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
                ]}
              >
                <Radio.Group defaultValue={page.page.paymentMethod}>
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
                    field?.label === "productCode"
                      ? page.page.productCode
                      : field?.label === "quantity"
                      ? page.page.quantity
                      : page.page.orderNumber
                  }
                />
              </Form.Item>
            );
          }
        }
      })}

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
};

export default PageThree;
