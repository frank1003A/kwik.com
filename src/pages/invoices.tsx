import { Typography } from '@mui/material';
import React, { FC, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';

import ButtonComponent from '../../components/Button';
import InvoiceBar from '../../components/InvoiceBar';
import Layout from '../../components/Layout';

import type { NextPage } from "next";
import axios, { AxiosInstance } from 'axios';
import { Invoice } from '../../components/Data/types';
import Link from 'next/link';
import Modal from '../../components/Modal';

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  gap: 2rem;
  background: #eee;
  align-items: flex-start;
  flex-direction: column;

  span {
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }
`;
const Top = styled.div`
  right: 0;
  left: 250px;
  display: flex;
  padding: 0.5rem 3rem;
  background: #eee;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  div {
    display: flex;
    gap: 1rem;
    select {
      border: none;
      border-radius: 4px;
      padding: 0px 0.6rem;
      box-shadow: 0 0 10px rgb(0 0 0 / 15%);
    }
  }
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  background: #eee;
  margin-top: 5rem;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Prompt = styled.div`
margin: auto auto auto auto;
`

interface Props {
  invoices: Invoice[]
}

const invoices: NextPage<Props> = ({invoices}) => {
  const fakeInvoice: {
    id: number;
    name: string;
    clientname: string;
    invtitle: string;
    due: string;
    amt: string;
  }[] = [
    {
      id: 1,
      name: "User Interface Design",
      clientname: "James Smith",
      invtitle: "Invoice#3534245",
      due: "08 Aug, 17",
      amt: "NGN 20,000",
    },
    {
      id: 2,
      name: "Product Sales",
      clientname: "Amara Eneh",
      invtitle: "Invoice#355245",
      due: "08 Jun, 17",
      amt: "NGN 20,000",
    },
    {
      id: 3,
      name: "Website Desing",
      clientname: "Matovik",
      invtitle: "Invoice#35235",
      due: "20 Aug, 17",
      amt: "NGN 20,000",
    },
    {
      id: 1,
      name: "User Interface Design",
      clientname: "James Smith",
      invtitle: "Invoice#3534245",
      due: "08 Aug, 17",
      amt: "NGN 20,000",
    },
    {
      id: 2,
      name: "Product Sales",
      clientname: "Amara Eneh",
      invtitle: "Invoice#355245",
      due: "08 Jun, 17",
      amt: "NGN 20,000",
    },
    {
      id: 3,
      name: "Website Desing",
      clientname: "Matovik",
      invtitle: "Invoice#35235",
      due: "20 Aug, 17",
      amt: "NGN 20,000",
    },
  ];

  const [optionModal, setOptionModal] = useState<boolean>(false);

  const openOModal = (): void => setOptionModal(true);
  const closeOModal = (): void => setOptionModal(false);

  const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });
  
  /**
   * const getAssets = ():Promise<void> => {
    const data = api.get('/api/assets', {
      headers:{
        'Content-Type': 'application/json'
      },
    }).then(response => {
      setAsset(response.data)
    })
    return data
  }
   */

  return (
    <Layout>
      <Container>
        <Top>
          <Typography>Invoices</Typography>
          <div>
            <select title="filter-type">
              <option value={0}>Invoice Type</option>
            </select>
            <select title="filter-category">
              <option value={0}>Category</option>
            </select>
            <ButtonComponent
              customStyle={{ background: "#2124b1" }}
              innerText="Create Invoice"
              onClick={openOModal}
            />
          </div>
        </Top>
        <Main>
          {
            invoices.map((inv, idx) => {
              return (
                <InvoiceBar 
                amt={inv.total}
                clientname={inv.clientName}
                due={inv.invoiceDueDate}
                invtitle={inv.invoiceTitle}
                name={inv.title}
                invId={inv._id}
                />
              )
            })
          }
        </Main>
      </Container>

      {/**Modal */}
      <Modal OpenModal={optionModal} handleCloseModal={closeOModal}>
        <Prompt>
          <Link href={'http://localhost:3000/invoice/create'}>Create Invoice</Link>
        </Prompt>
      </Modal>
    </Layout>
  );
};

export default invoices;

export async function getServerSideProps() {

  const invoiceCollection = await axios.get('http://localhost:3000/api/invoices', {
      headers:{
        'Content-Type': 'application/json'
      },
    }).then(res => res.data)
  
  let invoices =  await JSON.parse(JSON.stringify(invoiceCollection));

  return {
    props: { invoices },
  };
}


/**{fakeInvoice.map((inv, idx) => {
            return (
              <InvoiceBar
                key={idx}
                name={inv.name}
                amt={inv.amt}
                clientname={inv.clientname}
                due={inv.due}
                invtitle={inv.invtitle}
              />
            );
          })} */

/**
    /**if (name !== "invoiceitems") {
      let new_value = {...InvoiceRepo}

      if (name === "logoWidth" && typeof value === "number")
          new_value[name] = value

      else if (name !== "logoWidth" && name !== "tax" && typeof value === "string") {
          new_value[name] = value
      }

      setInvoiceRepo(new_value)
    } 
    
     /**setInvoiceRepo((prev) => {
        return {
          ...prev, invoiceitems: [...prev.invoiceitems, {...items[0]}] 
        }
      }) */

/**if (idx === index) {
          const newItems = {...itm}

          if (name === "id") return

        if (name === "quantity"){
          newItems[name] = value
        }



        else if (name === ("description")){
          newItems[name] = value 
        }

        else if (name === "rate"){
          newItems[name] = value 
        }

        if (newItems !== undefined)
            return newItems
        }
        if (itm !== undefined) return {...itm}
      }) */

/**dispatch(
      updateInvoiceItem({
        invItemName: name,
        invIndex: index,
        invValue: value,
        invtaxrate: taxRate,
      })

      const items = InvoiceRepo.invoiceitems.map((itm, idx) => {
      if (idx === index) {
        const newItems = { ...itm };

        if (name === "id") return;

        if (name === "quantity") {
          newItems[name] = value;
        } else if (name === "description") {
          newItems[name] = value;
        } else if (name === "rate") {
          newItems[name] = value;
        }

        if (newItems !== undefined) return newItems;
      }
      if (itm !== undefined) return { ...itm };
    });


    const update_value = {...InvoiceRepo}

    const items = InvoiceRepo.invoiceitems.map((itm, idx) => {
      if (idx === index) {
        const newItems = { ...itm };

        if (name === "id" && name !== undefined && typeof value === "number") {
          newItems[name] = Math.random() * 100
        }

        if (name === "quantity" && name !== undefined && typeof value === "number") {
          newItems[name] = value;
        } else if (name === "description" && typeof value === "string") {
          newItems[name] = value;
        } else if (name === "rate" && typeof value === "string") {
          newItems[name] = value;
        }

        if (newItems !== undefined) return newItems;
      }
      if (itm !== undefined) return { ...itm };
    });

    console.log(items[0])
    ); 
    */

/**<EditorLayout>
      <div className={styles.fileAndEditor}>
        {<div className={styles.lseditor}>{dispInvComponents}</div>
         <Editorbar
          handlePrint={() => handlePrint()}
        />
         }
         <div className={styles.editorFlex}>
         <InvoiceMain
           ref={componentRef}
           options={countryList}
           pdfMode={editPdf}
           cur={currency}
           itemArr={invoice.invoiceitems}
           addTC={addTC}
           tR={taxRate}
           removeItem={removeItem}
           handleChange={handleChange}
           handleDetailInput={handleDetailInput}
           handleItemInput={handleItemInput}
           invoice={invoice}
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
               {invoice ? 
               <Chip label="complete" color="success" /> :  
               <Chip label="not-complete" color="warning" />
               }
               <Divider />
               <Typography>Currency</Typography>
               {<Muiselect
                 state={currency}
                 handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                   setCurrency(e.target.value)
                 }
                 label="Currency"
                 options={currencyList}
               /> }
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
   </EditorLayout> */
