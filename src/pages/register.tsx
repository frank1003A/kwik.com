import React from 'react'
import styles from "../../styles/Login.module.css";
import { Typography, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/Link";
import ButtonComponent from "../../components/Button";
import Head from 'next/head'
import { NextPage } from 'next';

const register: NextPage = () => {
  return (
    <div className={styles["signup-container"]}>
      <Head>
        <title>Kwik.com | Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/kwikifavicon.ico" />
      </Head>
    <section id={styles.formandinputsignup}>
      <div className={styles["form"]}>
        <div className={styles["logocont"]}>
          <Image src={"/kwik_favicon.png"} width={30} height={30} />
        </div>
        <Typography variant="h5" fontWeight={"bold"}>
          Sign Up
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
            Name<span>*</span>
          </Typography>
          <input type="text" placeholder="name" />
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
          <div className={styles["chckbxlogin"]}>
            <input type="checkbox" name="rm" id={styles["rm"]} />
            <p id={styles["rmcheck"]}>I agree to </p>
          </div>
          <Link href="#">Terms & Condition</Link>
        </div>
        <ButtonComponent innerText="Sign Up" className={styles["loginbtn"]} />
      </div>
      <div className={styles["frmout"]}>
        <span>Already have an Account?</span>
        <Link href="/login"> Sign in</Link>
      </div>
      <div className={styles["rights"]}>
        <span>@2022 Protek All right reserved</span>
      </div>
    </section>
    <section id={styles.imgandtext}>svg</section>
  </div>
  )
}

export default register