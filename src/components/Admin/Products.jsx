import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, message } from "antd";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [productForm] = Form.useForm();

  const createProduct = async (values) => {
    try {
      const { data } = await axios.post("/product", values);
      productForm.resetFields();
      setOpen(false);
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div>
      <div className="w-10/12 mx-auto my-12">
        <Button
          icon={<PlusOutlined />}
          size="large"
          type="primary"
          className="bg-violet-600"
          onClick={() => setOpen(true)}
        >
          New Product
        </Button>
      </div>

      <Modal
        open={open}
        width={1000}
        title="Add Product"
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <Form
          form={productForm}
          layout="vertical"
          className="grid grid-cols-3 gap-x-4"
          onFinish={createProduct}
        >
          <Form.Item
            className="col-span-2"
            label={<p>Title</p>}
            name="title"
            rules={[{ required: true }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label={<p>Discount</p>}
            name="discount"
            rules={[{ required: true }]}
          >
            <Input size="large" type="number" />
          </Form.Item>

          <Form.Item
            label={<p>Brand</p>}
            name="brand"
            rules={[{ required: true }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label={<p>Price</p>}
            name="price"
            rules={[{ required: true }]}
          >
            <Input size="large" type="number" />
          </Form.Item>

          <Form.Item
            label={<p>Quantity</p>}
            name="quantity"
            rules={[{ required: true }]}
          >
            <Input size="large" type="number" />
          </Form.Item>

          <Form.Item
            className="col-span-3"
            label={<p>Description</p>}
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={5} type="number" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="mr-2"
            >
              Submit
            </Button>
            <Button
              htmlType="button"
              size="large"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
