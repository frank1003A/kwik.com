import { Divider, FormControl, FormLabel, Typography } from '@mui/material'
import { current } from '@reduxjs/toolkit'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import ButtonComponent from '../../components/Button'
import Layout from '../../components/Layout'
import { FlexContainer } from '../../components/styled-component/clients/Global'
import { Center, Container, ControlledInput, List, Top, UserBadge  } from '../../components/styled-component/Global'
import useGetter from '../../hooks/useGetter'
import { patchRequest, postRequest } from '../../lib/axios/axiosClient'
import user from '../../model/user'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useCurrentUser from '../../hooks/useCurrentUser'

const settings = () => {

  const router = useRouter()
  
  const {  } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/auth/login')
    },
  })

  const { user, setCurrentUser, isLoading, status } = useCurrentUser()

  const fileInput = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const handleChangeImage = () => {
    if (fileInput?.current?.files) {
      const files = fileInput.current.files

      if (files.length > 0 && typeof handleLogoUpload === 'function') {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
          if (typeof reader.result === 'string') {
            handleLogoUpload("buisness_logo", reader.result)
          }
        })

        reader.readAsDataURL(files[0])
      }
    }
  }

  const handleUserDataUpdate = (
    e: Event | React.SyntheticEvent<any, Event>,
    name: keyof user
  ) => {
    const {value} = e.currentTarget

    const userData = {...user}
    if (name) {
      userData[name] = value
    }
    setCurrentUser(userData)
  }

  const handleLogoUpload = (
    name: keyof user,
    value: string | number | number[]
  ) => {
    const userData = {...user}
    if (name === "buisness_logo" && typeof value === "string") {
      userData[name] = value
    }
    setCurrentUser(userData)
  }
  
  const updateUserData = async (): Promise<void> => {
    try {
      const{ _id, ...usersData } = user
      const userData =  await patchRequest(`api/users/?user_id=${user._id}`, usersData)
      if (userData.data) console.log(userData.data)
      alert("Update Successfull")
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleButtonDisp = (): boolean => {
    let blean: boolean = false
    if (isEditing === true) blean = true
    return blean
  }

  const renderClientSettings = () => {
    return isLoading && status === "loading" ? (
      <Center>
        <ScaleLoader color="blue" />
      </Center>
    ) : (
      <>
      <Top>
        <UserBadge style={{background: 'white'}}>{user.email}</UserBadge>
          <ButtonComponent innerText='Save' onClick={() => updateUserData()} 
          btnDisabled={handleButtonDisp()}/>
        </Top>
        <List>
          <div>
            <Typography color="#555">Personal Information</Typography>
            <Typography variant="subtitle2" color="#555">
              View and update your personal information for better invoice population
              </Typography>
          </div>
          <FormControl>
             <FormLabel>Username</FormLabel>
             <ControlledInput 
             value={user.username}
             onChange={(e) => handleUserDataUpdate(e, "username")}
             type={"text"}/>
          </FormControl>
          <FormControl>
             <FormLabel>Fullname</FormLabel>
             <ControlledInput type={"text"}
             value={user.fullname}
             onChange={(e) => handleUserDataUpdate(e, "fullname")}
             />
          </FormControl>
          <FormControl>
             <FormLabel>email</FormLabel>
             <ControlledInput type={"text"}
             value={user.email}
             onChange={(e) => handleUserDataUpdate(e, "email")}
             />
          </FormControl>
          <FormControl>
             <FormLabel>Phone Number</FormLabel>
             <ControlledInput type={"text"}
             value={user.phone_number}
             onChange={(e) => handleUserDataUpdate(e, "phone_number")}
             />
          </FormControl>
           <Divider />
          
           <div>
            <Typography color="#555">Buisness Information</Typography>
            <Typography variant="subtitle2" color="#555">
            View and update your buisness information for better invoice population
              </Typography>
          </div>
          <FormControl>
             <FormLabel>Buisness Name</FormLabel>
             <ControlledInput type={"text"}
             value={user.buisness_name}
             onChange={(e) => handleUserDataUpdate(e, "buisness_name")}
             />
          </FormControl>
          <FormControl>
          <FormLabel>Logo</FormLabel>
          <ControlledInput type={"file"} 
          ref={fileInput}
          customHeight={'fit-content'}
          accept="image/*"
          onChange={handleChangeImage}/>
        </FormControl>
          <FormControl>
             <FormLabel>Buisness Address</FormLabel>
             <ControlledInput type={"text"}
             value={user.buisness_address}
             onChange={(e) => handleUserDataUpdate(e, "buisness_address")}
             />
          </FormControl>
          <FormControl>
             <FormLabel>Buisness Address2</FormLabel>
             <ControlledInput type={"text"}
             value={user.buisness_address2}
             onChange={(e) => handleUserDataUpdate(e, "buisness_address2")}
             />
          </FormControl>
          <FormControl>
             <FormLabel>Buisness Country</FormLabel>
             <ControlledInput type={"text"}
             value={user.country}
             onChange={(e) => handleUserDataUpdate(e, "country")}
             />
          </FormControl>
        </List>
      </>
    )
  }

  return (
    <Layout fname={user.fullname}>
      <Container style={{background: '#fff'}}>
        {renderClientSettings()}
      </Container>
    </Layout>
  )
}

export default settings