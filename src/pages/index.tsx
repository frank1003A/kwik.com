import type { NextPage } from "next";
import Layout from "../../components/Layout";
import Dashboard from "../../components/Dashboard";
import CustomDnd from '../../components/KwikCreator/CustomDnd'
import styles from '../../styles/Home.module.css'
import { Center, Container } from "../../components/styled-component/Global";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SquareLoader } from "react-spinners";
import { Typography } from "@mui/material";
import { motion } from "framer-motion"
import Image from 'next/image'
import { useTheme } from "next-themes";

const Home: NextPage = () => {
  const router = useRouter()

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/auth/login')
    },
  })

  const {theme} = useTheme()

  const dispLoader = ():JSX.Element => {
    if (status === "loading") {
      return (
        <motion.div layout style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 10
        }}>
            <SquareLoader color={theme === "dark" ? "orange" : "blue"} />
            <Typography>Please wait...</Typography>
            </motion.div>
      )
    }else {
      return (
        <Layout>
        <Container>
        <Dashboard />
        </Container>
        </Layout>
      )
    }
  }
  
  const dashbrd: React.CSSProperties = {
    display: "flex",
    background: "#eee",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  };

  return (
    <>
    {dispLoader()}
    </>
  );
};

export default Home;

//<Dashboard />
