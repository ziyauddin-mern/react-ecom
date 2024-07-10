import { Card, Spin } from "antd";
import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const Home = () => {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className=" text-xl text-rose-600 font-medium">{error.message}</h1>
      </div>
    );

  if (data)
    return (
      <div>
        <div className="w-10/12 mx-auto my-4 p-8 grid grid-cols-2 gap-8">
          {data.map((item, index) => (
            <Card key={index}>
              <Card.Meta
                title={<label className="capitalize">{item.title}</label>}
                description={item.body}
              />
            </Card>
          ))}
        </div>
      </div>
    );
};
export default Home;
