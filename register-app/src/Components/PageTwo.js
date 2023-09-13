import React from "react";
import { useForm } from "react-hook-form";
import formData from "../Form.json"; // Import your JSON data
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import pageReducer from "./redux/Pagereducer";
import { addState } from "./redux/actions";

const PageTwo = () => {
  const { handleSubmit, control, errors } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const page = useSelector(pageReducer);

  const onSubmit = (data) => {
    dispatch(addState(data));
    navigate("/3");
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
        if (field.pageNumber === "2") {
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
                  field?.labelName === "companyName"
                    ? page.page.companyName
                    : page.page.CIN
                }
              />
            </Form.Item>
          );
        }
      })}
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
};

export default PageTwo;
