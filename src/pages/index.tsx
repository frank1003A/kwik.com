import type { NextPage } from "next";
import Layout from "../../components/Layout";
import Dashboard from "../../components/Dashboard";
import CustomDnd from '../../components/KwikCreator/CustomDnd'
import styles from '../../styles/Home.module.css'
import { Container } from "../../components/styled-component/Global";

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
      <Container>
      <Dashboard />
      </Container>
    </Layout>
  );
};

export default Home;

//<Dashboard />
