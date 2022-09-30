import { Clear, Edit, ImportContacts, ImportExport, PersonAdd, Receipt, Restore, Sort } from '@mui/icons-material';
import {
  Divider,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  StepLabel,
  Tooltip,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, ReactElement, useContext, useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { useSWRConfig } from 'swr';

import AlertDialogSlide from '../../components/AlertDialog';
import ClientIcon from '../../components/asset/ClientIcon';
import CustomLoader from '../../components/asset/CustomLoader';
import ButtonComponent from '../../components/Button';
import CustomIconBtn from '../../components/CustomIconBtn';
import CustomSnackbar from '../../components/CustomSnackbar';
import { initialClientData } from '../../components/Data/initialData';
import Layout from '../../components/Layout';
import ModalComponent from '../../components/Modal';
import MuiSearchbar from '../../components/MuiSearchbar';
import { Card, Center, FlexContainer, List, Row, Top } from '../../components/styled-component/clients/Global';
import { ControlledInput, Form, VhContainer } from '../../components/styled-component/Global';
import useGetter from '../../hooks/useGetter';
import { baseRoute, deleteRequest, patchRequest, postRequest } from '../../lib/axios/axiosClient';
import clientClass from '../../model/clients';
import styles from '../../styles/Home.module.css';
import { sortMultipleData } from '../../utils/utils';
import { updateClient } from '../redux/clientSlice';
import { useAppDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';
import { NextPageWithLayout } from './_app';

const Clients: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const { data, isError, isLoading } = useGetter(
    `/api/user/client/clients/?user_id=${session?.user?.id}`
  );
  const { mutate } = useSWRConfig();

  const router = useRouter();
  const { theme } = useTheme();

  const {} = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/login");
    },
  });

  const [clients, setClients] = useState<clientClass[]>([]);
  const [singleClient, setSClient] = useState<clientClass>({
    ...initialClientData,
  });
  const [updateSingleClient, setUpdateSingleClient] = useState<clientClass>({
    ...initialClientData,
  });
  const [dialogResponse, setDialogResponse] = useState<string>("");
  const [contextCreated, setContextCreated] = useState<boolean>(false);

  const [cim, setCim] = useState<boolean>(false);
  const [openUpdateModal, setopenUpdateModal] = useState(false);
  const [isSortingF, setSortingF] = useState(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [sorted, setSorted] = useState<clientClass[]>([]);
  const [informUser, setInformUser] = useState<{
    savealert: boolean;
    updatealert: boolean;
    deletealert: boolean;
    message: string;
  }>({
    savealert: false,
    updatealert: false,
    deletealert: false,
    message: "",
  });

  const handleUpdateModal = () => setopenUpdateModal(true);
  const handleCloseUpdateModal = () => setopenUpdateModal(false);

  const SelectedClient = useSelector((state: RootState) => state.client);
  const dispatch = useAppDispatch();

  const createSingleClientInvoice = (cli: clientClass) => {
    const { _id, owner, ...toPass } = cli;
    dispatch(
      updateClient({
        client: toPass,
      })
    );
    setCim(true);
  };

  /**Modal */
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  /**Dialog */
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = async () => setOpenDialog(true);

  const handleDialogClose = () => setOpenDialog(false);

  const handleNoCloseDialog = () => setDialogResponse("No");

  const handleYesCloseDialog = () => setDialogResponse("Yes");

  useEffect(() => {
    if (data !== undefined) setClients(data);
    if (isError) console.log(isError);
  }, [data, isError]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof clientClass
  ) => {
    const value = e.target.value;
    let nC =
      e.currentTarget.ariaLabel === "update"
        ? { ...updateSingleClient }
        : { ...singleClient };
    if (name !== "_id" && typeof value === "string" && name !== "dateCreated") nC[name] = value;
    e.currentTarget.ariaLabel === "update"
      ? setUpdateSingleClient(nC)
      : setSClient(nC);
    /**
     * since sorted is a different arr, changes in the original wont affect it
     * so we need to update the sorted table to reflect the changes in the original
     */
    if (isSearching || openUpdateModal) {
      let fS: clientClass[] = clients.filter((key) => key._id === nC._id);
      fS[0] = nC;
      setSorted(fS);
    }
  };

  const postNewClient = async (): Promise<void> => {
    setOpenModal(false)
    try {
      const { _id, ...newClientDb } = singleClient;
      const newClient = await postRequest(
        `api/user/client/clients/?user_id=${session?.user?.id}`,
        newClientDb
      );
      if (newClient.data) {
        setInformUser({
          ...informUser,
          savealert: true,
          message: "new Client added",
        });
        mutate(`/api/user/client/clients/?user_id=${session?.user?.id}`);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const deleteClientData = async (id: string): Promise<void> => {
    try {
      const clientData = await deleteRequest(`api/user/client/clients/?client_id=${id}`);
      if (clientData.status === 200)
        if (clientData.data){
          setInformUser({
            ...informUser,
            deletealert: true,
            message: `client - ${id} - has been removed from database`,
          });
          mutate(`/api/user/client/clients/?user_id=${session?.user?.id}`);
        }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateField = (cli: clientClass) => {
    setUpdateSingleClient(cli);
  };

  const updateCleintData = async (id: string): Promise<void> => {
    setopenUpdateModal(false)
    const { _id, owner, ...ClientUpdate } = updateSingleClient; // REMOVE ID FIELD
    try {
      const UpdateClient = await patchRequest(
        `api/user/client/clients/?client_id=${id}`,
        ClientUpdate
      );
      if (UpdateClient.data) {
        setInformUser({
          ...informUser,
          updatealert: true,
          message: `updated client ${id}`,
        });
        setSorted([])
      }
      mutate(`/api/user/client/clients/?user_id=${session?.user?.id}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!(status === "authenticated") && !(session) && !(status === "loading")){
      router.push("/auth/login")
    }
  }, [session, status, router]);

  const renderSortedClients = () => {
    return [
      sorted.map((cli) => {
        return (
          <Card as={motion.div} layout key={cli._id?.toString()}>
            <Row>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".5rem",
                }}
              >
                <Avatar
                  name={cli.fullname}
                  color={theme === "dark" ? "orange" : "#2124B1"}
                  round="4px"
                  size="40px"
                />
                <Typography id={"clientname"}>{cli.fullname}</Typography>
              </div>
              <Typography id={"email"}>{cli.email}</Typography>
              <Typography id={"email"}>{cli.buisness}</Typography>
              <Typography id={"email"}>{cli.phone}</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".5rem",
                }}
              >
                <IconButton onClick={() => createSingleClientInvoice(cli)}>
                  <Receipt style={{ color: "orange" }} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleUpdateModal();
                    updateField(cli);
                  }}
                >
                  <Edit style={{ color: "#2124b1" }} />
                </IconButton>
                <IconButton
                  onClick={() =>
                    deleteClientData(cli._id ? cli._id.toString() : "")
                  }
                >
                  <Clear style={{ color: "red" }} />
                </IconButton>
              </div>
            </Row>
          </Card>
        );
      }),
    ];
  };

  const renderClients = () => {
    return [
        clients.map((cli) => {
          return (
            <Card as={motion.div} layout key={cli._id?.toString()}>
              <Row>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5rem",
                  }}
                >
                  <Avatar
                    name={cli.fullname}
                    color={theme === "dark" ? "orange" : "#2124B1"}
                    round="4px"
                    size="40px"
                  />
                  <Typography id={"clientname"}>{cli.fullname}</Typography>
                </div>
                <Typography id={"email"}>{cli.email}</Typography>
                <Typography id={"email"}>{cli.buisness}</Typography>
                <Typography id={"email"}>{cli.phone}</Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5rem",
                  }}
                >
                  <CustomIconBtn 
                  handleClick={() => createSingleClientInvoice(cli)}
                  toolTip="create client Invoice"
                  icon={<Receipt />}
                  id="topicon"
                  />

                  <CustomIconBtn 
                  handleClick={() => {
                    handleUpdateModal();
                    updateField(cli);
                  }}
                  toolTip="Update Client Data"
                  icon={<Edit />}
                  id="topicon"
                  />

                  <CustomIconBtn 
                  handleClick={() =>
                    deleteClientData(cli._id ? cli._id.toString() : "")
                  }
                  toolTip="Delete Client Data"
                  icon={<Clear />}
                  id="topicon"
                  />
                  
                </div>
              </Row>
            </Card>
          );
        }),
      ]
  };

  const inputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const searchbar = inputRef.current;
    searchbar?.addEventListener("focusin", () => setIsSearching(true));
    searchbar?.addEventListener("focusout", () => setIsSearching(false));
    return () => {
      searchbar?.removeEventListener("focusin", () => setIsSearching(true));
      searchbar?.removeEventListener("focusout", () => setIsSearching(false));
    };
  }, []);

  const topIcons: {id: number, icon: JSX.Element; tip: string; func?: () => void }[] = [
    {
      id: 1,
      icon: (
        <Sort/>
      ),
      tip: "Sort Client Data",
      func: () => setSortingF(!isSortingF),
    },
    {
      id: 2,
      icon: (
        <Restore/>
      ),
      tip: "Reset",
      func() {
        setSorted([])
      },
    },
    {
      id: 3,
      icon: (
        <ImportContacts/>
      ),
      tip: "Import Excel File",
    },
    {
      id: 4,
      icon: (
        <PersonAdd/>
      ),
      tip: "New Customer",
      func: handleOpenModal,
    },
    {
      id: 5,
      icon: (
        <ImportExport/>
      ),
      tip: "Export Data",
    },
  ];

  const handleNewOldSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number(e.target.value) ===  1) {
      const sortedClients = clients.map(obj => { return {...obj, dateCreated: new Date(obj.dateCreated!) }})
      .sort((a: any,b: any) => b.dateCreated - a.dateCreated)
      setSorted(sortedClients)
    }
    else if (Number(e.target.value) ===  2) {
      const sortedClients = clients.map(obj => { return {...obj, dateCreated: new Date(obj.dateCreated!) }})
      .sort((a: any,b: any) => a.dateCreated - b.dateCreated)
      setSorted(sortedClients)
    }
  } 

  //onChange={handleNewOldSort}

  const renderFSort: React.ReactNode = [
    <select onChange={handleNewOldSort} key={nanoid(3)}>
      <option value={0} >Sort By</option>
      <option value={1}>Newest</option>
      <option value={2}>Oldest</option>
    </select>,
  ];

  return (
    <>
      <VhContainer>
        <Top>
          <Typography>Clients</Typography>
          <span style={{ display: "flex", gap: "1rem" }}>
            <MuiSearchbar
              ref={inputRef}
              handleSearch={(e: ChangeEvent<HTMLInputElement>) =>
                setSorted(
                  sortMultipleData<clientClass>(
                    clients,
                    ["fullname", "phone", "buisness", "email"],
                    e.target.value
                  )
                )
              }
            />
            <motion.div transition={{ type: "spring", bounce: 0.25 }}>
              {isSortingF && renderFSort}
            </motion.div>
            <span id={"topicon"}>
              {topIcons.map((key) => {
                return (
                  <Tooltip title={key.tip} key={key.id}>
                    <IconButton aria-label="" onClick={key.func}>
                      {key.icon}
                    </IconButton>
                  </Tooltip>
                );
              })}
            </span>
          </span>
        </Top>
        {Array.isArray(data) && data.length < 1 && status === "authenticated" ? (
          <Center>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ClientIcon width={300} height={300} />
              <Typography> No Client Yet</Typography>
            </div>
          </Center>
        ) : (
          <React.Fragment>
            <FlexContainer>
              {
                (status === "loading") && (!data)
                ? 
                (<Center>
                  <CustomLoader text="Fetching Clients"/>
                </Center>) :
                <List>
                {sorted.length > 0 ? 
                renderSortedClients() 
                :  
                renderClients()
              }
              </List>
              }
            </FlexContainer>
          </React.Fragment>
        )}
      </VhContainer>

      {/**Update Modal */}
      <ModalComponent
        OpenModal={openUpdateModal}
        handleCloseModal={handleCloseUpdateModal}
        pd={"2rem"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography>Update Client Information</Typography>
          <Divider />
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Form>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup>
                  <StepLabel>Client's Fullname</StepLabel>
                  <ControlledInput
                    aria-label="update"
                    type={"text"}
                    value={updateSingleClient.fullname}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "fullname")
                    }
                  />
                </FormGroup>
                <FormHelperText></FormHelperText>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup>
                  <StepLabel>Client's email</StepLabel>
                  <ControlledInput
                    aria-label="update"
                    type={"text"}
                    value={updateSingleClient.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "email")
                    }
                  />
                </FormGroup>
                <FormHelperText>lowercase*</FormHelperText>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup>
                  <StepLabel>Client's Buisnessname</StepLabel>
                  <ControlledInput
                    aria-label="update"
                    type={"text"}
                    value={updateSingleClient.buisness}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "buisness")
                    }
                  />
                </FormGroup>
                <FormHelperText></FormHelperText>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup>
                  <StepLabel>Client's Phone </StepLabel>
                  <ControlledInput
                    aria-label="update"
                    type={"text"}
                    value={updateSingleClient.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "phone")
                    }
                  />
                </FormGroup>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Form>
            <ButtonComponent
              customStyle={{ background: "green" }}
              onClick={() =>
                updateCleintData(updateSingleClient._id?.toString()!)
              }
              innerText="Update"
              btnDisabled={
                !(updateSingleClient.fullname && updateSingleClient.phone
                  ? true
                  : false)
              }
            />
          </div>
        </div>
      </ModalComponent>

      {/**add customer modal */}
      <ModalComponent
        OpenModal={openModal}
        handleCloseModal={handleCloseModal}
        pd={"2rem"}
      >
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
            <Form>
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup>
                  <StepLabel>Client's Fullname</StepLabel>
                  <ControlledInput
                    placeholder="fullname"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "fullname")
                    }
                  />
                </FormGroup>
                <FormHelperText></FormHelperText>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup>
                  <StepLabel>Client's Email</StepLabel>
                  <ControlledInput
                    placeholder="email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "email")
                    }
                  />
                </FormGroup>
                <FormHelperText></FormHelperText>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup>
                  <StepLabel>Client's Buisness Name</StepLabel>
                  <ControlledInput
                    placeholder="buisness name, if any"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "buisness")
                    }
                  />
                </FormGroup>
                <FormHelperText></FormHelperText>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup>
                  <StepLabel>Client's Buisness Phone</StepLabel>
                  <ControlledInput
                    placeholder="+234_phonenumber"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "phone")
                    }
                  />
                </FormGroup>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Form>
          </div>
          <ButtonComponent
            innerText="Save"
            btnDisabled={
              !(singleClient.fullname && singleClient.phone) ? true : false
            }
            onClick={postNewClient}
          />
        </div>
      </ModalComponent>

      <ModalComponent
        OpenModal={cim}
        handleCloseModal={() => setCim(false)}
        pd={"2rem"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography>Create Client Invoice</Typography>
          <Divider />
        </div>
        <span style={{ padding: '.5rem' }}>
        <Typography variant="subtitle1" color="GrayText">
          To:  {SelectedClient.client.fullname}
        </Typography>
        </span>
        <div className={styles["card"]}>
          <Link href={`${baseRoute}/invoice/create`}>
            <Typography>Create Invoice</Typography>
          </Link>
        </div>
      </ModalComponent>

      <AlertDialogSlide
        dialogTitle="Delete Client Data"
        dialogText="Are you sure you want to delete this data?"
        openDialog={openDialog}
        handleCloseDialog={handleDialogClose}
        handleNoDialog={handleNoCloseDialog}
        handleYesDialog={handleYesCloseDialog}
      />

      <CustomSnackbar
        openAlert={informUser.savealert}
        closeAlert={() => setInformUser({ ...informUser, savealert: false })}
        outputText={informUser.message}
        verticalPosition="bottom"
        horizontalPosition="center"
      />
      <CustomSnackbar
        openAlert={informUser.updatealert}
        closeAlert={() => setInformUser({ ...informUser, updatealert: false })}
        outputText={informUser.message}
        verticalPosition="bottom"
        horizontalPosition="center"
      />

      <CustomSnackbar
        openAlert={informUser.deletealert}
        closeAlert={() => setInformUser({ ...informUser, deletealert: false })}
        outputText={informUser.message}
        verticalPosition="bottom"
        horizontalPosition="center"
      />
      </>
  );
};

export default Clients;

Clients.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


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
