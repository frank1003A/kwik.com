import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PasswordInput from '../../../components/PasswordInput';

import ButtonComponent from '../../../components/Button';
import CustomSnackbar from '../../../components/CustomSnackbar';
import styles from '../../../styles/Login.module.css';

import type { NextPage } from "next";
const Login: NextPage = () => {
  const router = useRouter();

  const { data, status } = useSession();

  const [userInfo, setUserInfo] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const [error, setError] = useState<string>("");
  const [informUser, setInformUser] = useState<{
    successlogin: boolean;
    message: string;
  }>({
    successlogin: false,
    message: "",
  });

  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    if (res?.ok) {
      setInformUser({
        ...informUser,
        successlogin: true,
        message: `Successful Login`,
      });
      router.replace("/dashboard");
    }
    if (res?.error) setError(res.error);
  };

  const handleContrl = (): boolean => {
    let stat = false;
    if (!userInfo.email || !userInfo.password) stat = true;
    return stat;
  };

  // add test login details auttomatically
  const addTestUser = () => {
    const testUser = {
      email: "ka@gmail.com",
      password: "fried"
    }
    setUserInfo(testUser)
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
      addTestUser()
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ status])
  

  return (
    <motion.div className={styles["login-container"]}
    initial={{width: "0%", opacity: 0}}
    animate={{width: "100%", opacity: 1}}
    exit={{width: "0%", opacity: 0, transition: {
      duration: 2, 
      ease: [0.455, 0.03, 0.515, 0.955],
    }}}
    >
      <Head>
        <title>Kwik.com | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/kwikifavicon.ico" />
      </Head>
      <section id={styles.formandinput}>
        <div className={styles["form"]}>
          <Typography variant="h5" fontWeight={"bold"}>
            Login
          </Typography>
          <ButtonComponent
            innerText="Sign in with Google"
            icon={<img src="/google_32.png" width="20" height="20" alt="google-login" />}
            className={styles["googlebtn"]}
          />
          <div className={styles["flex-row"]}>
            <div className={styles["dividersolid"]}></div>or sign in with Email
            <div className={styles["dividersolid"]}></div>
          </div>
          <div className={styles["form-control"]}>
            <Typography className={styles["frmtxt"]}>
              Email<span>*</span>
            </Typography>
            <input
              className={styles["input"]}
              value={userInfo.email}
              type="text"
              placeholder="mail@website.com"
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
            />
          </div>
          <div className={styles["form-control"]}>
            <Typography className={styles["frmtxt"]}>
              Password<span>*</span>
            </Typography>
            <PasswordInput
            value={userInfo.password}
            placeholder="min. 8 characters"
            onChangeHandler={({target}) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            />
          </div>
          {error ? (
            <motion.span animate={{ y: 5 }} layout className={styles["error_message"]}>
              <div/>
              <p style={{ color: "red" }}>*{error}</p>
            </motion.span>
          ) : null}
          <div className={styles["frm"]}>
            <div className={styles["chckbx"]}>
              <input type="checkbox" name="rm" id={styles["rm"]} />
              <p id={styles["rmcheck"]}>Remember me</p>
            </div>
            <Link href="#">Forgot Password?</Link>
          </div>
          <ButtonComponent
            innerText="Login"
            className={styles["loginbtn"]}
            onClick={handleSubmit}
            btnDisabled={handleContrl()}
          />
        </div>
        <div className={styles["frmout"]}>
          <span>Not yet registered?</span>
          <Link href="/auth/register"> Create Account</Link>
        </div>
        <div className={styles["rights"]}>
          <span>@2022 Protek All right reserved</span>
        </div>
      </section>
      <section id={styles.imgandtext}>
        <img src="/leftsvg.png" height={300} alt="logo" />
      </section>

      <CustomSnackbar
        openAlert={informUser.successlogin}
        closeAlert={() => setInformUser({ ...informUser, successlogin: false })}
        outputText={informUser.message}
        verticalPosition="top"
        horizontalPosition="left"
      />
    </motion.div>
  );
};

export default Login;

