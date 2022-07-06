import React from "react";
import styles from "../../styles/Login.module.css";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/Link";
import Head from 'next/head'
import ButtonComponent from "../../components/Button";
import GoogleIcon from "@mui/icons-material/Google";
import PasswordEmojifier from "../../components/PasswordEmojifier";
import { useRouter } from "next/dist/client/router";
import type { NextPage } from "next";

const login: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles["login-container"]}>
      <Head>
        <title>Kwik.com | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/kwikifavicon.ico" />
      </Head>
      <section id={styles.formandinput}>
        <div className={styles["form"]}>
          <div className={styles["logocont"]}>
            <Image src={"/kwik_favicon.png"} width={30} height={30} />
          </div>
          <Typography variant="h5" fontWeight={"bold"}>
            Login
          </Typography>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            color={"#666"}
            fontSize={"12px"}
          >
            see your growth and get consultig support!
          </Typography>
          <ButtonComponent
            innerText="Sign in with Google"
            icon={<Image src="/google_32.png" width="20" height="20"/>}
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
            <input type="text" placeholder="mail@website.com" />
          </div>
          <div className={styles["form-control"]}>
            <Typography className={styles["frmtxt"]}>
              Password<span>*</span>
            </Typography>
            <input type="password" placeholder="min. 8 characters" />
          </div>
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
           onClick={() => router.push('/')} />
        </div>
        <div className={styles["frmout"]}>
          <span>Not yet registered?</span>
          <Link href="/register"> Create Account</Link>
        </div>
        <div className={styles["rights"]}>
          <span>@2022 Protek All right reserved</span>
        </div>
      </section>
      <section id={styles.imgandtext}>
        <Image src={'/sideimg.jpg'} width={1000} height={1000} />
      </section>
    </div>
  );
};

export default login;

//<input type="password" placeholder="min. 8 characters" />
