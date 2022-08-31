import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import CustomLoader from '../../components/asset/CustomLoader';
import Dashboard from '../../components/Dashboard';
import Layout from '../../components/Layout';
import { Container } from '../../components/styled-component/Global';

import type { NextPage } from "next";
import { useMemo } from 'react';

const Home: NextPage = () => {
  const router = useRouter();

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/login");
    },
  });

  return (
    <>
    {
      (status === "loading" || !status) && data !== null ? (
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
      ): 
      (
        <Layout>
          <Container>
            <Dashboard />
          </Container>
        </Layout>
      )
    }
    </>
  )
};

export default Home;

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
