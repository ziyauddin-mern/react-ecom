import { useState } from "react";
import { LoginOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const { Item } = Form;
const { TextArea } = Input;

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [contactUsForm] = Form.useForm();

  const contactUs = async (values) => {
    try {
      setLoading(true);
      await axios.post("/contact-us", values);
      message.success("Thank you! we will reach you soon.");
      contactUsForm.resetFields();
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16">
      <Card title="Contact us" className="w-6/12 mx-auto">
        <Form form={contactUsForm} layout="vertical" onFinish={contactUs}>
          <Item
            name="candidateName"
            label={<label className="font-semibold">Candidate Name</label>}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your name" />
          </Item>

          <Item
            name="email"
            label={<label className="font-semibold">Email id</label>}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="example@email.com" />
          </Item>

          <Item
            name="message"
            label={<label className="font-semibold">Message</label>}
            rules={[{ required: true }]}
          >
            <TextArea rows={5} placeholder="Write your message here" />
          </Item>

          <Item>
            <Button
              loading={loading}
              className="bg-indigo-600"
              size="large"
              type="primary"
              icon={<LoginOutlined />}
              htmlType="submit"
            >
              Submit
            </Button>
          </Item>
        </Form>
      </Card>
    </div>
  );
};
export default ContactUs;
