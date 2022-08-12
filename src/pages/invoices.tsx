import { Chip, Divider, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC, SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { ScaleLoader } from "react-spinners";
import styled from "styled-components";

import AsyncSelect from "../../components/AsyncSelect";
import ButtonComponent from "../../components/Button";
import { Invoice } from "../../components/Data/types";
import InvoiceBar from "../../components/InvoiceBar";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import useGetter from "../../hooks/useGetter";
import { deleteRequest } from "../../lib/axios/axiosClient";

import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import Disclaimer from "../../components/Disclaimer";
import Button from "../../components/Button";
import { CreateRounded } from "@mui/icons-material";
import Image from "next/image";

interface Props {
  invoices: Invoice[];
}

const invoices: NextPage<Props> = () => {
  const { data, isError, isLoading } = useGetter("/api/invoices");

  const [optionModal, setOptionModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<Invoice[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const openOModal = (): void => setOptionModal(true);
  const closeOModal = (): void => setOptionModal(false);

  const setter = () => {
    if (data !== undefined) setInvoices(data);
    if (isError) console.log(isError);
  };

  useEffect(() => {
    setter();
  }, [data]);

  const deleteInvoice = async (id: string) => {
    try {
      const deleteInvoice = await deleteRequest(
        `api/invoices/?invoice_id=${id}`
      );
      if (deleteInvoice) alert(`you deleted invoice ${id}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const dispStats = (status: string) => {
    if (status === "draft") {
      return (
        <Chip
        id="chipFont"
          label={status}
          sx={{ borderRadius: "4px" }}
          variant="filled"
          color="error"
          size="medium"
        />
      );
    } else if (status === "pending") {
      return (
        <Chip
        id="chipFont"
          label={status}
          sx={{ borderRadius: "4px" }}
          variant="filled"
          color="warning"
          size="medium"
        />
      );
    }
    if (status === "complete") {
      return (
        <Chip
        id="chipFont"
        label={status}
        sx={{ borderRadius: "4px", color: '#fff'}}
        variant="filled"
        color="success"
        size="medium"
      />
      );
    }
  };

  return (
    <Layout>
      <Container>
        <Top>
          <Typography>Invoices</Typography>
          <div>
            <AsyncSelect
              Invoices={invoices}
              setter={setSearchValue}
              selectedValue={searchValue}
            />
            <select title="filter-type">
              <option value={0}>Invoice Type</option>
            </select>
            <select title="filter-category">
              <option value={0}>Category</option>
            </select>
            <Button
              className={styles.btnCreate}
              innerText={"Invoice"}
              onClick={() => openOModal()}
              icon={<CreateRounded />}
            />
          </div>
        </Top>
        <Main>
          {isLoading ? (
            <Center>
              <ScaleLoader color="blue" />
            </Center>
          ) : (
            invoices.map((inv, idx) => {
              return (
                <InvoiceBar
                  handleDelete={() => deleteInvoice(inv._id!?.toString())}
                  amt={inv.total}
                  clientname={inv.clientName}
                  due={inv.invoiceDueDate}
                  invtitle={inv.invoiceTitle}
                  name={inv.title}
                  invId={inv._id}
                  status={dispStats(inv.status!)}
                />
              );
            })
          )}
        </Main>
      </Container>

      {/**Create Invoice Modal */}
      <Modal OpenModal={optionModal} handleCloseModal={closeOModal} pd="">
        <div className={styles.optionContainer}>
          <div className={styles.option}>
            <Typography variant="body1" color="initial">
              New Invoice
            </Typography>
            <Divider />
            <Image src={"/485.svg"} width={450} height={300} />
            <div className={styles["card"]}>
              <Link href="http://localhost:3000/invoice/create">
                <Typography>Create Invoice</Typography>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default invoices;

/**
            <ButtonComponent
              customStyle={{ background: "#2124b1" }}
              innerText="Create Invoice"
              onClick={openOModal}
            /> */

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  gap: 2rem;
  background: #eee;
  align-items: flex-start;
  flex-direction: column;

  #chipFont{
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #fff;
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
  border-bottom: 1px solid #2221;
  align-items: center;
  position: fixed;
  justify-content: space-between;

  div {
    display: flex;
    gap: 1rem;
    @media (max-width: 500px) {
      display: none;
    }
    select {
      border: none;
      border-radius: 4px;
      padding: 0px 0.6rem;
      box-shadow: 0 0 10px rgb(0 0 0 / 15%);
      @media (max-width: 500px) {
        display: none;
      }
    }
  }

  @media (max-width: 500px) {
    left: 0px !important;
    right: 0px !important;
    top: auto !important;
    padding: 0px;
  }
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  background: #eee;
  padding-top: 5rem;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;

  span {
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }

  @media (max-width: 500px) {
    left: 0px !important;
    right: 0px !important;
    top: auto !important;
    gap: 1rem;
  }
`;

const Center = styled.div`
  margin: auto auto auto auto;
`;

const Status = styled.div`
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: .8rem;
    color: #fff !important;
    line-height: 1.5;
    letter-spacing: 0.00938em;
`

/**invoices.map((inv, idx) => {
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
            }) */

/**export async function getStaticProps () {
  // `getStaticProps` is executed on the server side.
  const invoiceCollection = await getRequest('api/invoices')
  return {
    props: {
      fallback: {
        '/api/invoices': invoiceCollection
      }
    }
  }
}

export async function getServerSideProps() {

  const invoiceCollection = await getRequest('api/invoices')
  
  let invoices =  await JSON.parse(JSON.stringify(invoiceCollection));

  return {
    props: { invoices },
  };
} */

/**
 * 
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


{fakeInvoice.map((inv, idx) => {
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
