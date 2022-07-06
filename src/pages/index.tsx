import type { NextPage } from "next";
import Layout from "../../components/Layout";
import Dashboard from "../../components/Dashboard";

const Home: NextPage = () => {
  const dashbrd: React.CSSProperties = {
    display: "flex",
    background: "#eee",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  };

  return (
    <Layout>
      <div style={dashbrd}>
        <Dashboard />
      </div>
    </Layout>
  );
};

export default Home;
