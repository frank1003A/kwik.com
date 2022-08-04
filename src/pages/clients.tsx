import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { Container } from "../../components/styled-component/Global";
import Layout from "../../components/Layout";
import {
  Card,
  FlexContainer,
  List,
  Top,
  Row,
  Center,
} from "../../components/styled-component/clients/Global";
import Avatar from "react-avatar";
import ButtonComponent from "../../components/Button";
import { PersonAdd, Edit, Clear, Add } from "@mui/icons-material";
import { Divider, IconButton, TextField, Typography } from "@mui/material";
import useGetter from "../../hooks/useGetter";
import clientClass from "../../model/clients";
import { ScaleLoader } from "react-spinners";
import ModalComponent from "../../components/Modal";
import { deleteRequest, postRequest } from "../../lib/axios/axiosClient";
import { initialClientData } from "../../components/Data/initialData";
import AlertDialogSlide from "../../components/AlertDialog";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/localStorage";
import { useAppDispatch } from "./redux/hooks";
import { useSelector } from "react-redux";
import { updateClient } from './redux/clientSlice'
import { RootState } from "./redux/store";

const clients: NextPage = () => {
  const { data, isError, isLoading } = useGetter("api/clients");

  const router = useRouter()

  const [clients, setClients] = useState<clientClass[]>([]);
  const [singleClient, setSCleint] = useState<clientClass>(
    data ? {...data} : {...initialClientData})
  const [dialogResponse, setDialogResponse] = useState<string>('')
  const [contextCreated, setContextCreated] = useState<boolean>(false)

  const SelectedClient = useSelector((state: RootState) => state.client)
  const dispatch =  useAppDispatch()

  const createSingleClientInvoice = (cli: clientClass) => {
    dispatch(
      updateClient({
        client: cli
      })
    )
    setContextCreated(true)
  }

  const navigateToInvoiceCeationRoute = () => {
    if (contextCreated === true) router.push('http://localhost:3000/invoice/create')
  }

 useEffect(() => {
    /**Naviagte to route if context client data is retrieved */
    navigateToInvoiceCeationRoute()
  }, [contextCreated]) 

    /**Modal */
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  /**Dialog */
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleNoCloseDialog = () => {
    setOpenDialog(false);
    setDialogResponse('No')
  };

  const handleYesCloseDialog = () => {
    setOpenDialog(false);
    setDialogResponse('Yes')
  };

  const setter = () => {
    if (data !== undefined) setClients(data);
    if (isError) console.log(isError);
  };

  useEffect(() => {
    setter();
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: keyof clientClass) => {
    const value = e.target.value
    const nC =  {...singleClient}
    if (name !== "_id" && typeof value === "string")
        nC[name] = value
    setSCleint(nC)
  }

  const postNewClient = async ( ): Promise<void> => {
    try {
      const newClient = await postRequest('api/clients', singleClient)
      if (newClient.data) alert('new Client added')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const deleteClientData = async(id : string): Promise<void> => {
    handleOpenDialog() // open delete dialog
    if (dialogResponse === "Yes") {
      try {
        const clientData = await deleteRequest(`api/clients/?client_id=${id}`)
        if (clientData.data) alert(`client <${id}> has been removed from database`)
      } catch (error: any) {
        console.log(error.message)
      }
    } else {
      return
    }
  }

  const renderClients = () => {
    return isLoading ? (
      <Center>
        <ScaleLoader color="blue" />
      </Center>
    ) : (
      [
        clients.map((cli) => {
          return (
            <Card>
              <Row>
               <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '.5rem'
                }}>
               <Avatar
                  name={cli.fullname}
                  color="#2124B1"
                  round="4px"
                  size="40px"
                />
                <Typography id={"clientname"}>{cli.fullname}</Typography>
               </div>
                <Typography id={"email"}>{cli.email}</Typography>
                <Typography id={"email"}>{cli.buisness}</Typography>
                <Typography id={"email"}>{cli.phone}</Typography>
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '.5rem'
                }}>
                <ButtonComponent
                icon={<Add/>}
                onClick={() => createSingleClientInvoice(cli)}
                customStyle={{borderRadius: '30px', boxShadow: "0", background: 'red'}}
                />
                <IconButton><Edit/></IconButton>
                <IconButton 
                onClick={() => deleteClientData(cli._id ? cli._id.toString() : "")}
                ><Clear/></IconButton>
                </div>
              </Row>
            </Card>
          );
        }),
      ]
    );
  };

  return (
      <Layout>
      <Container>
        {
          clients.length < 1 && data ? 
          (<Center>
            <div style={
              {
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center'
                }}>
            <Typography> No Client Yet</Typography>
            <ButtonComponent
                  innerText="Invoice"
                  icon={<Add/>}
                  customStyle={{borderRadius: '30px', boxShadow: "0", background: 'red'}}
                  />
            </div>
          </Center>)
          :
          <React.Fragment>
            <Top>
          <Typography>Clients</Typography>
          <ButtonComponent
            innerText="New Client"
            icon={<PersonAdd />}
            onClick={handleOpenModal}
          />
        </Top>
        <FlexContainer>
          <List>{renderClients()}</List>
        </FlexContainer>
          </React.Fragment>
        }
      </Container>

      {/**add customer modal */}
      <ModalComponent OpenModal={openModal} handleCloseModal={handleCloseModal} pd={'2rem'}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography>New Customer</Typography>
          <Divider />
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <TextField variant="standard" placeholder="fullname" 
            onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e,'fullname')} />
            <TextField variant="standard" placeholder="email"
            onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e,'email')}
             />
            <TextField variant="standard" placeholder="buisness name, if any"
            onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e,'buisness')}
             />
             <TextField variant="standard" placeholder="+234_phonenumber"
            onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e,'phone')}
             />
          </div>
          <ButtonComponent innerText="Save" onClick={postNewClient} />
        </div>
      </ModalComponent>
      <AlertDialogSlide 
      dialogTitle="Delete Client Data" 
      dialogText="Are you sure you want to delete this data?"
      openDialog={openDialog}
      handleNoCloseDialog={handleNoCloseDialog}
      handleYesCloseDialog={handleYesCloseDialog}
      />
    </Layout>
  );
};

export default clients;

/**<Top>
        <Typography>Clients</Typography>
        <ButtonComponent innerText="New Client" icon={<PersonAdd />} />
      </Top>
        <FlexContainer>
          <List>
          <Card>
            <Avatar name="Foo Bar" color="#2124B1" round="50%" size="40px" />
             <Typography id={'clientname'} >Client Name</Typography>
             <Typography id={'email'} >email@gmail.com</Typography>
          </Card>
          <Card>
            <Avatar name="Foo Bar" color="#2124B1" round="50%" size="40px" />
          </Card>
          <Card>
            <Avatar name="Foo Bar" color="#2124B1" round="50%" size="40px" />
          </Card>
          <Card>
            <Avatar name="Foo Bar" color="#2124B1" round="50%" size="40px" />
          </Card>
          </List>
        </FlexContainer> */
