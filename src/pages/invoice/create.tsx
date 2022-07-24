import { Divider, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import axios, { AxiosInstance } from 'axios';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next/types';
import { ParsedUrlQuery } from 'node:querystring';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Container } from '../../../components/styled-component/Global';
import ButtonComponent from '../../../components/Button';
import { countryList } from '../../../components/Data/countryList';
import currencyList from '../../../components/Data/currencyList';
import { initialInvoice } from '../../../components/Data/initialData';
import { Invoice, InvoiceItems } from '../../../components/Data/types';
import Editorbar from '../../../components/Editorbar';
import InvoiceMain from '../../../components/InvoiceMain';
import Layout from '../../../components/Layout';
import MainEditor from '../../../components/MainEditor';
import Modals from '../../../components/Modal';
import Muiselect from '../../../components/MuiSelect';
import styles from '../../../styles/Invoice.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  deleteInvoiceItemNo,
  getTaxRate,
  updateInvoice,
  updateInvoiceItem,
  updateInvoiceItemNo,
} from '../../redux/invoiceSlice';

import type { NextPage } from 'next';
import React from 'react';
import { api, postRequest } from '../../../lib/axios/axiosClient'
import { ConnectingAirportsOutlined } from '@mui/icons-material';

interface Props{
    invoice: Invoice
}

const createInvoice: NextPage<Props> = ()=> {
    const router = useRouter()

    const [editPdf, seteditPdf] = useState<boolean>(false);
  const [opensuccess, setOpensuccess] = useState<boolean>(false);
  const [opensaved, setOpenSaved] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>();
  const [currency, setCurrency] = useState<string>("");
  const [showEditComp, setShowEditComp] = useState<boolean>(false);
  const [edcActive, setEdcActive] = useState<boolean>(false);
  const [invComp, setInvComp] = useState<boolean>(false);
  const [InvoiceRepo, setInvoiceRepo] = useState<Invoice>({...initialInvoice});

  const dispatch = useAppDispatch();
  const invoiceReducer = useAppSelector((state) => state.invoice.invoice); // Invoice State
  console.log(invoiceReducer)

  const handleActiveSideComponent = (): void => {
    if (invComp === true) {
      setInvComp(false);
      setEdcActive(true);
    }
    if (edcActive === true) {
      setEdcActive(false);
      setInvComp(true);
    }
  };

  useEffect(() => {
    setInvComp(true);
  }, []);

  const parentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const createInvPrompt: JSX.Element[] = [
    <div>
      <Image src="/createInv.svg" width={300} height={300} />
      <Typography>None Yet</Typography>
      <ButtonComponent innerText="Create Invoice" />
    </div>,
  ];

  const handlesucClose = (
    event: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpensuccess(false);
  };

  const handleOpenSaveInfo = () => setOpenSaved(true);
  const handleOpenSaveInfoClose = () => setOpenSaved(false);

  // Snackbar Alert
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleItemInput = (
    e: Event | React.SyntheticEvent<any, Event>,
    index: number,
    name: keyof InvoiceItems
  ): void => {
    e.preventDefault();
    const { value } = e.currentTarget;

    dispatch(
      updateInvoiceItem({
        invItemName: name,
        invIndex: index,
        invValue: value,
        invtaxrate: taxRate,
      }))
  }

  const handleDetailInput = (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof Invoice
  ) => {
    e.preventDefault()
    const {value} = e.currentTarget
    dispatch(
      updateInvoice({
        invName: name,
        invValue: value,
      })
    ); 
  };

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    documentTitle: "Powered By Kwik.com",
    onBeforePrint() {
      //add loading animation
    },
    onAfterPrint: () => handleOpenSaveInfo(),
  });

  const handleChange = (
    name: keyof Invoice,
    value: string | number | number[]
  ) => {
    dispatch(
      updateInvoice({
        invName: name,
        invValue: value,
      })
    );
  };

  const addTC = () => {
    dispatch(updateInvoiceItemNo());
  };

  const removeItem = (id: string | number | string[]) => {
    dispatch(
      deleteInvoiceItemNo({
        invId: id,
      })
    ); 
  };

  const getTxRate = (e:Event | SyntheticEvent<any, Event>): void => {
    const { value } = e.currentTarget
    setTaxRate(value)
    dispatch(
      getTaxRate({
        invtaxrate: taxRate 
      })
    )
  }

  const removeJSXElement = (elementid: string) => {
    const element = document.getElementById(elementid) as HTMLElement;
    element.style.display = "none";
    element.style.transition = "0.5s fade-out";
  };

  const handleInvoicePost = async ():Promise<void> => {
    try {
      const InvoicePost = await postRequest('api/invoices', invoiceReducer)
      console.log(InvoicePost)
      alert('saved')
    } catch (error: any) {
      console.log(error.message)
    }
  }

    return (
      <Layout>
        <Container>
        <div className={styles.fileAndEditor}>
        {/**<div className={styles.lseditor}>{dispInvComponents}</div> */}
         <Editorbar
          handlePrint={() => handlePrint()}
          handleSave={() => handleInvoicePost()}
        />
         <div className={styles.editorFlex}>
         <InvoiceMain
           ref={componentRef}
           options={countryList}
           pdfMode={editPdf}
           cur={currency}
           itemArr={invoiceReducer.invoiceitems}
           addTC={addTC}
           tR={taxRate}
           removeItem={removeItem}
           handleChange={handleChange}
           handleDetailInput={handleDetailInput}
           handleItemInput={handleItemInput}
           invoice={invoiceReducer}
         ></InvoiceMain>
         <MainEditor>
           <div className={styles["edcToggler"]}>
             <button
               className={
                 edcActive === true ? styles["edcBtnActive"] : styles["edcBtn"]
               }
               onClick={() => {
                 handleActiveSideComponent();
                 setShowEditComp(true);
               }}
             >
               Edit Component
             </button>
             <button
               className={
                 invComp === true ? styles["edcBtnActive"] : styles["edcBtn"]
               }
               onClick={() => {
                 handleActiveSideComponent();
                 setShowEditComp(false);
               }}
             >
               Edit Invoice
             </button>
           </div>
           {showEditComp ? (
             null
           ) : (
             <div className={styles["invComp"]}>
               <Typography>Status</Typography>
               {invoiceReducer ? 
               <Chip label="complete" color="success" /> :  
               <Chip label="not-complete" color="warning" />
               }
               <Divider />
               <Typography>Currency</Typography>
               {/**{<Muiselect
                 state={currency}
                 handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                   setCurrency(e.target.value)
                 }
                 label="Currency"
                 options={currencyList}
               /> } */}
               <Divider />
               <Typography>Vat Rate %</Typography>
               <input
                 type="text"
                 placeholder="Vat Rate"
                 value={taxRate}
                 onChange={getTxRate}
               />
               <Typography>Background Image</Typography>
               <input type="file" placeholder="upload PNG or JPEG" />
             </div>
           )}
         </MainEditor>
       </div>
     </div>

     <Snackbar
       open={opensuccess}
       autoHideDuration={4000}
       onClose={handlesucClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert
         onClose={handlesucClose}
         severity="success"
         sx={{ width: "100%" }}
       >
         <Typography>Invoice Saved</Typography>
       </Alert>
     </Snackbar>

     <Modals OpenModal={opensaved} handleCloseModal={handleOpenSaveInfoClose}>
       <div
         style={{
           display: "flex",
           alignItems: "center",
           gap: "0.5rem",
           justifyContent: "center",
           flexDirection: "column",
           marginBottom: "1rem",
         }}
       >
         <Image src="/print2.svg" height={300} width={300} />
         Invoice Saved
       </div>
       <ButtonComponent innerText={"Continue"} />
     </Modals>
        </Container>
      </Layout>
    )
}

export default createInvoice

/**const handleInvoicePost = ():Promise<void> => {
  const data = api.post('/api/invoices', invoiceReducer, {
    headers:{
      'Content-Type': 'application/json'
    },
  }).then(response => {
    console.log(response.data)
  })
  return data
} */
