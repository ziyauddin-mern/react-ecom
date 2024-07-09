import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Products from "./components/Products";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Cart from "./components/Carts";
import Profile from "./components/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
