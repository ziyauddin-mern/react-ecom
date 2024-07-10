import {
  ContactsOutlined,
  HomeOutlined,
  ProductOutlined,
  UserOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const items = [
  {
    label: "Homepage",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Products",
    key: "/products",
    icon: <ProductOutlined />,
  },
  {
    label: "Contact us",
    key: "/contact-us",
    icon: <ContactsOutlined />,
  },
  {
    label: "My Account",
    key: "my-account",
    icon: <UserOutlined />,
    children: [
      {
        label: "My profile",
        key: "/profile",
        icon: <ProfileOutlined />,
      },
      {
        label: "Carts",
        key: "/carts",
        icon: <ShoppingCartOutlined />,
      },
      {
        label: "Logout",
        key: "logout",
        icon: <LogoutOutlined />,
      },
    ],
  },
];

function LayoutEl({ children }) {
  const navigate = useNavigate();
  const openLink = (e) => {
    navigate(e.key);
  };
  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center sticky top-0 left-0 z-50">
        <h1 className="text-white">Ecom</h1>
        <Menu
          mode="horizontal"
          theme="dark"
          className="flex-1 flex justify-end"
          items={items}
          onClick={openLink}
        />
      </Header>

      <Content>{children}</Content>
    </Layout>
  );
}

export default LayoutEl;
