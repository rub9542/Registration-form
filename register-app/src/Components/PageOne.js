import React from "react";
import { useForm } from "react-hook-form";
import formData from "../Form.json"; // Import your JSON data
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, DatePicker, Radio } from "antd";
import pageReducer from "./redux/Pagereducer";
import { addState } from "./redux/actions";

const PageOne = () => {
  const { handleSubmit, control, errors } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      onFinishFailed={(e) => onFinishFailed(e)}
    >
      {formData.map((field) => {
        let regexPattern = "";
        if (field?.pattern) {
          const startDelimiter = field?.pattern[0];
          const endDelimiter = field?.pattern[field?.pattern.length - 1];

          regexPattern =
            startDelimiter + field.pattern?.slice(1, -1) + endDelimiter;
          console.log("sliced", regexPattern);
        }
        if (field.pageNumber === "1") {
          if (field.label === "address") {
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
                    max: parseInt(field?.maxLength), // Replace 10 with your desired maximum length
                    message: `Maximum length exceeded for ${field?.labelName}!`,
                  },
                  {
                    min: parseInt(field?.minLength), // Replace 10 with your desired maximum length
                    message: `Minimum length not met for ${field?.labelName}!`,
                  },
                ]}
              >
                <Input.TextArea defaultValue={page.page.address} />
              </Form.Item>
            );
          } else if (field.label === "birthdate") {
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
                <DatePicker/>
              </Form.Item>
            );
          } else if (field.label === "gender") {
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
                <Radio.Group defaultValue={page.page.gender}>
                  {field.options.map((item, index) => {
                    return (
                      <Radio key={index} value={item}>
                        {item}
                      </Radio>
                    );
                  })}
                </Radio.Group>
                {/* )}
          /> */}
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
                    max: parseInt(field?.maxLength), // Replace 10 with your desired maximum length
                    message: `Maximum length exceeded for ${field?.labelName}!`,
                  },
                  {
                    min: parseInt(field?.minLength), // Replace 10 with your desired maximum length
                    message: `Minimum length not met for ${field?.labelName}!`,
                  },
                ]}
              >
                <Input
                  defaultValue={
                    field?.labelName === "name"
                      ? page.page.name
                      : field?.labelName === "Email"
                      ? page.page.Email
                      : page.page.phoneNumber
                  }
                />
              </Form.Item>
            );
          }
        }
      })}
      <Form.Item className="sbt-btn">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PageOne;
