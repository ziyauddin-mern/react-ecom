import { Tabs } from "antd";
import Products from "./Products";
import Customers from "./Customers";
import Orders from "./Orders";
import Payments from "./Payments";

const Admin = () => {
  const items = [
    {
      label: "Products",
      key: "proudcts",
      children: <Products />,
    },
    {
      label: "Customers",
      key: "customers",
      children: <Customers />,
    },
    {
      label: "Orders",
      key: "orders",
      children: <Orders />,
    },
    {
      label: "Payments",
      key: "payments",
      children: <Payments />,
    },
  ];

  return (
    <div>
      <div className="w-10/12 mx-auto my-6 p-4">
        <Tabs items={items} />
      </div>
    </div>
  );
};

export default Admin;
