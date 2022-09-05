import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CustomLoader from "../../components/asset/CustomLoader";
import Dashboard from "../../components/Dashboard";
import { Container } from "../../components/styled-component/Global";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  const { data, status } = useSession();

  useEffect(() => {
    if (!(status === "authenticated") && !(data) && !(status === "loading")){
      router.push("/auth/login")
    }
  }, [data, status]);

  return (
    <>
      {(router.pathname === "/" && status === "loading" || status === "unauthenticated") ? (
        <CustomLoader text="Please wait..."/>
      ) : (
        <Container>
          <Dashboard />
        </Container>
      )}
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

/**const dispLoader = (): JSX.Element => {
    if (status === "loading") {
      return (
        <motion.div
          layout
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <CustomLoader />
          <Typography>Please wait...</Typography>
        </motion.div>
      );
    } else {
      return (
        <Layout>
          <Container>
            <Dashboard />
          </Container>
        </Layout>
      );
    }
  }; */
