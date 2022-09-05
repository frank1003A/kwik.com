import { PersonRemove, VerifiedUser } from "@mui/icons-material";
import { Divider, FormControl, FormLabel, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css"
import CustomLoader from "../../components/asset/CustomLoader";
import ButtonComponent from "../../components/Button";
import CustomIconBtn from "../../components/CustomIconBtn";
import Layout from "../../components/Layout";
import {
  Center,
  Container,
  ControlledInput,
  List,
  Top,
  UserBadge,
} from "../../components/styled-component/Global";
import useCurrentUser from "../../hooks/useCurrentUser";
import { deleteRequest, patchRequest } from "../../lib/axios/axiosClient";
import user from "../../model/user";
import { NextPageWithLayout } from "./_app";
import CustomSnackbar from "../../components/CustomSnackbar";
import { signOut } from "next-auth/react"

const Settings: NextPageWithLayout = () => {
  const router = useRouter();

  const {} = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/login");
    },
  });
  

  const { user, setCurrentUser, isLoading, status } = useCurrentUser();
  
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)

  const [informUser, setInformUser] = useState<{
    successfulupdate: boolean;
    message: string;
  }>({
    successfulupdate: false,
    message: "",
  });

  const fileInput = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleChangeImage = () => {
    if (fileInput?.current?.files) {
      const files = fileInput.current.files;

      if (files.length > 0 && typeof handleLogoUpload === "function") {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          if (typeof reader.result === "string") {
            handleLogoUpload("buisness_logo", reader.result);
          }
        });

        reader.readAsDataURL(files[0]);
      }
    }
  };

  const handleUserDataUpdate = (
    e: Event | React.SyntheticEvent<any, Event>,
    name: keyof user
  ) => {
    const { value } = e.currentTarget;

    const userData = { ...user };
    if (name) {
      userData[name] = value;
    }
    setCurrentUser(userData);
  };

  const handleLogoUpload = (
    name: keyof user,
    value: string | number | number[]
  ) => {
    const userData = { ...user };
    if (name === "buisness_logo" && typeof value === "string") {
      userData[name] = value;
    }
    setCurrentUser(userData);
  };

  const updateUserData = async (): Promise<void> => {
    try {
      const { _id, ...usersData } = user;
      const userData = await patchRequest(
        `api/admin/users/?user_id=${user._id}`,
        usersData
      );
      if (userData.data) {
        setInformUser({...informUser, successfulupdate: true, message: "Update Successfull"})
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  async function deleteUserData(): Promise<void> {
     if (status === "authenticated" && user){
      try {
        const userData = await deleteRequest(`api/admin/users/?user_id=${user._id}`);
         if (userData.status === 200) await signOut();
       } catch (error: any) {
         console.log(error.message)
       }
     }
  }

  const renderDisclaimer = [
    <span className={styles.cardD}>
      <Typography variant="h6" color="initial">
        Please be informed that deleting this account will also: 
      </Typography>
      <Typography variant="subtitle2" color="initial">
        Delete all associated client data
      </Typography>
      <Typography variant="subtitle2" color="initial">
        Delete all associated product data
      </Typography>

     <div style={{
      display: 'flex',
      gap: "1rem",
     }}>
     <ButtonComponent
      customStyle={{background: "none"}}
      innerText="Confirm and Delete"
      onClick={() => deleteUserData()}
      />
      <ButtonComponent
      innerText="Cancel and Continue"
      onClick={() => setDeleteDialog(false)}
      />
     </div>
      
    </span>
  ]

  const renderClientSettings = () => {
    return isLoading && status === "loading" ? (
      <Center>
        <CustomLoader text="Loading User Data" />
      </Center>
    ) : (
      <List>
        <motion.div 
         transition={{ easings: ["easeIn", "easeOut"] }}
        >
          {deleteDialog && renderDisclaimer}
        </motion.div>
        <div className={styles.cardD}>
          <span className={styles.imgcont}>
          <img
          style={{width: '100%',height: '100%'}}
          src={user.buisness_logo}
          />
          </span>
        </div>
        <div>
            <Typography color="#555">Personal Information</Typography>
            <Typography variant="subtitle2" color="#555">
              View and update your personal information for better invoice
              population
            </Typography>
          </div>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <ControlledInput
              value={user.username}
              onChange={(e) => handleUserDataUpdate(e, "username")}
              type={"text"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Fullname</FormLabel>
            <ControlledInput
              type={"text"}
              value={user.fullname}
              onChange={(e) => handleUserDataUpdate(e, "fullname")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>email</FormLabel>
            <ControlledInput
              type={"text"}
              value={user.email}
              onChange={(e) => handleUserDataUpdate(e, "email")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <ControlledInput
              type={"text"}
              value={user.phone_number}
              onChange={(e) => handleUserDataUpdate(e, "phone_number")}
            />
          </FormControl>
          <Divider />

          <div>
            <Typography color="#555">Buisness Information</Typography>
            <Typography variant="subtitle2" color="#555">
              View and update your buisness information for better invoice
              population
            </Typography>
          </div>
          <FormControl>
            <FormLabel>Buisness Name</FormLabel>
            <ControlledInput
              type={"text"}
              value={user.buisness_name}
              onChange={(e) => handleUserDataUpdate(e, "buisness_name")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Logo</FormLabel>
            <ControlledInput
              type={"file"}
              ref={fileInput}
              customHeight={"fit-content"}
              accept="image/*"
              onChange={handleChangeImage}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Buisness Address</FormLabel>
            <ControlledInput
              type={"text"}
              value={user.buisness_address}
              onChange={(e) => handleUserDataUpdate(e, "buisness_address")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Buisness Address2</FormLabel>
            <ControlledInput
              type={"text"}
              value={user.buisness_address2}
              onChange={(e) => handleUserDataUpdate(e, "buisness_address2")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Buisness Country</FormLabel>
            <ControlledInput
              type={"text"}
              value={user.country}
              onChange={(e) => handleUserDataUpdate(e, "country")}
            />
          </FormControl>
      </List>
    );
  };

  return (
    <>
      <Container>
      <Top>
          <UserBadge style={{ background: "white" }}>{user.email}</UserBadge>
         <span>
         <CustomIconBtn
            toolTip="Delete Account"
            icon={<PersonRemove />} 
            id={"topicon"}
            handleClick={() => setDeleteDialog(true) }/>
          <CustomIconBtn
            toolTip="Save"
            id="topicon"
            handleClick={() => updateUserData()}
            icon={<VerifiedUser/>}
          />
         </span>
        </Top>
        {renderClientSettings()}
      </Container>
      <CustomSnackbar
        openAlert={informUser.successfulupdate}
        closeAlert={() => setInformUser({ ...informUser, successfulupdate: false })}
        outputText={informUser.message}
        verticalPosition="bottom"
        horizontalPosition="center"
      />
    </>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}















