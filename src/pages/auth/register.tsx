import React, { useState } from 'react'
import styles from "../../../styles/Login.module.css";
import { Typography, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/Link";
import ButtonComponent from "../../../components/Button";
import Head from 'next/head'
import { NextPage } from 'next';
import user from '../../../model/user';
import { postRequest } from '../../../lib/axios/axiosClient';
import { initialUserData } from '../../../components/Data/initialData';
import MainLogo from '../../../components/asset/MainLogo';

const register: NextPage = () => {
  const [userState, setUserState] = useState<user>(initialUserData)

  const handlePostUser = async (): Promise<void> => {
    try {
      const userData = await postRequest("api/user", userState)
      if (userData.data) console.log(userData)
      alert('Your account has successfully been created')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleControls = (): boolean => {
    let stat = false
    if (!(
      userState.email 
      && userState.fullname  
      && userState.password))
      {
      stat = true
    }
    return stat
  }

  return (
    <div className={styles["signup-container"]}>
      <Head>
        <title>Kwik.com | Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/kwikifavicon.ico" />
      </Head>
    <section id={styles.formandinputsignup}>
      <div className={styles["form"]}>
        <Typography variant="h5" fontWeight={"bold"}>
          Sign Up
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
          <input 
          value={userState.fullname}
          onChange={({target}) => setUserState({...userState, fullname: target.value})}
          type="text" 
          placeholder="name" />
        </div>
        <div className={styles["form-control"]}>
          <Typography className={styles["frmtxt"]}>
            Email<span>*</span>
          </Typography>
          <input 
          value={userState.email}
          onChange={({target}) => setUserState({...userState, email: target.value})}
          type="text" 
          placeholder="mail@website.com" />
        </div>
        <div className={styles["form-control"]}>
          <Typography className={styles["frmtxt"]}>
            Password<span>*</span>
          </Typography>
          <input 
          value={userState.password}
          onChange={({target}) => setUserState({...userState, password: target.value})}
          type="password" 
          placeholder="min. 8 characters" />
        </div>
        <div className={styles["frm"]}>
          <div className={styles["chckbxlogin"]}>
            <input type="checkbox" name="rm" id={styles["rm"]} />
            <p id={styles["rmcheck"]}>I agree to </p>
          </div>
          <Link href="#">Terms & Condition</Link>
        </div>
        <ButtonComponent 
        onClick={handlePostUser}
        innerText="Sign Up" 
        className={styles["loginbtn"]}
        btnDisabled={handleControls()}
         />
      </div>
      <div className={styles["frmout"]}>
        <span>Already have an Account?</span>
        <Link href="/auth/login"> Sign in</Link>
      </div>
      <div className={styles["rights"]}>
        <span>@2022 Protek All right reserved</span>
      </div>
    </section>
    <section id={styles.imgandtext}><MainLogo/></section>
  </div>
  )
}

export default register