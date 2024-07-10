import { useState } from "react";
import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  Form,
  message,
  Table,
  Skeleton,
  Result,
  Upload,
} from "antd";
import useSWR, { mutate } from "swr";
import axios from "axios";
import moment from "moment";
axios.defaults.baseURL = "http://localhost:8080";

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const Products = () => {
  const [selectedProductImage, setSelectedProductImage] =
    useState("/images/pr.jpg");
  const [open, setOpen] = useState(false);
  const [productForm] = Form.useForm();

  const { data, error, isLoading } = useSWR("/product", fetcher);

  const createProduct = async (values) => {
    try {
      const { data } = await axios.post("/product", values);
      productForm.resetFields();
      setOpen(false);
      mutate("/product");
    } catch (err) {
      message.error(err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/product/${id}`);
      mutate("/product");
    } catch (err) {
      message.error(err.message);
    }
  };

  const uploadThumbnail = ({ file }) => {
    const url = URL.createObjectURL(file);
    setSelectedProductImage(url);
  };

  const columns = [
    {
      title: "Title",
      key: "title",
      render: (_, item) => (
        <div className="flex gap-4">
          <Upload accept="image/*" customRequest={uploadThumbnail}>
            <img src={selectedProductImage} width={60} className="rounded" />
          </Upload>
          <div className="flex flex-col">
            <label className="font-medium capitalize">{item.title}</label>
            <small className="font-medium uppercase text-gray-500">
              {item.brand}
            </small>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Discount",
      key: "discount",
      render: (_, item) => <label>{item.discount}%</label>,
    },
    {
      title: "Date",
      key: "createdAt",
      render: (_, item) => (
        <label>
          {moment(item.createdAt).format("DD MMM YYYY, hh:mm:ss A")}
        </label>
      ),
    },
    {
      key: "action",
      render: (_, item) => (
        <div className="space-x-4">
          <Button
            shape="circle"
            icon={<EditFilled />}
            className="border-green-500 text-green-500"
          />

          <Button
            shape="circle"
            icon={<DeleteFilled />}
            className="border-rose-500 text-rose-500"
            onClick={() => deleteProduct(item._id)}
          />
        </div>
      ),
    },
  ];

  if (isLoading) return <Skeleton active />;

  if (error)
    return <Result status={500} title={500} subTitle={error.message} />;

  return (
    <div>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search this product"
            prefix={<SearchOutlined />}
            size="large"
            className="w-6/12"
          />
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

        <Table columns={columns} dataSource={data} rowKey="_id" />
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
