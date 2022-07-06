import React, { FC, SyntheticEvent } from "react";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import InvoiceMain from "../../components/InvoiceMain";
import { countryList } from "../../components/Data/countryList";
import styles from "../../styles/Invoice.module.css";
import Image from "next/image";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Editorbar from "../../components/Editorbar";
import MainEditor from "../../components/MainEditor";
import { Typography, Divider, TextField } from "@mui/material";
import Chip from "@mui/material/Chip";
import {
  updateInvoice,
  updateInvoiceItem,
  updateInvoiceItemNo,
  deleteInvoiceItemNo,
} from "../redux/invoiceSlice";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Modals from "../../components/Modal";
import ButtonComponent from "../../components/Button";
import currencyList from "../../components/Data/currencyList";
import Muiselect from "../../components/MuiSelect";
import ControlledAccordions from "../../components/Accordion";
import RemoveCircleRounded from "@mui/icons-material/Delete";
import ResetIcon from "@mui/icons-material/Restore";
import EditorLayout from "../../components/EditorLayout";
import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Invoice, InvoiceItems } from "../../components/Data/types";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { initialInvoice, initialInvoiceItems } from "../../components/Data/initialData";

const invoices: NextPage = () => {
  const [editPdf, seteditPdf] = useState<boolean>(false);
  const [opensuccess, setOpensuccess] = useState<boolean>(false);
  const [opensaved, setOpenSaved] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [showEditComp, setShowEditComp] = useState<boolean>(false);
  const [edcActive, setEdcActive] = useState<boolean>(false);
  const [invComp, setInvComp] = useState<boolean>(false);
  const [InvoiceRepo, setInvoiceRepo] = useState<Invoice>({...initialInvoice});

  const dispatch = useAppDispatch();
  const invoice = useAppSelector((state) => state.invoice.invoice); // Invoice State

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

  const dispInvComponents: JSX.Element[] = [
    <>
      <div style={parentStyle}>
        <ControlledAccordions
          headerChildren={
            <div className={styles["acctext"]}>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>
                  remove all{" "}
                </Typography>
                <button onClick={() => removeJSXElement("dfheader")}>
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>logo </Typography>
                <button onClick={() => removeJSXElement("dflogo")}>
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>title </Typography>
                <button onClick={() => removeJSXElement("dftitle")}>
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>reset </Typography>
                <button onClick={() => alert("none")}>
                  <ResetIcon />
                </button>
              </div>
            </div>
          }
          lineChildren={
            <div className={styles["acctext"]}>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>
                  Divider{" "}
                </Typography>
                <button onClick={() => removeJSXElement("dfdivider")}>
                  <RemoveCircleRounded />
                </button>
              </div>
            </div>
          }
          companyChildren={
            <div className={styles["acctext"]}>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>
                  remove section{" "}
                </Typography>
                <button onClick={() => removeJSXElement("dfcompanydetail")}>
                  <RemoveCircleRounded />
                </button>
              </div>
            </div>
          }
          billingChildren={
            <div className={styles["acctext"]}>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>
                  remove section{" "}
                </Typography>
                <button onClick={() => removeJSXElement("dfbilldetail")}>
                  <RemoveCircleRounded />
                </button>
              </div>
            </div>
          }
          invoiceDetailChildren={
            <div className={styles["acctext"]}>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>
                  remove section{" "}
                </Typography>
                <button onClick={() => removeJSXElement("dfinvoicedetail")}>
                  <RemoveCircleRounded />
                </button>
              </div>
            </div>
          }
          tableChildren={
            <div className={styles["acctext"]}>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>
                  remove section{" "}
                </Typography>
                <button onClick={() => removeJSXElement("dfinvoicetable")}>
                  <RemoveCircleRounded />
                </button>
              </div>
            </div>
          }
          notesChildren={
            <div className={styles["acctext"]}>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>
                  remove section{" "}
                </Typography>
                <button onClick={() => removeJSXElement("dfinvoicenotes")}>
                  <RemoveCircleRounded />
                </button>
              </div>
            </div>
          }
          tandcChildren={
            <div className={styles["acctext"]}>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>
                  remove section{" "}
                </Typography>
                <button onClick={() => removeJSXElement("dfinvoicetandc")}>
                  <RemoveCircleRounded />
                </button>
              </div>
            </div>
          }
        />
      </div>
    </>,
  ];

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

    const update_value = {...InvoiceRepo}

    if (name === "quantity"){
      update_value.invoiceitems[index][name] = value
    }

    if (name === "quantity"){
      update_value.invoiceitems[index][name] = value
    }

    else if (name === "description"){
      update_value.invoiceitems[index][name] = value
    }

    else if (name === "rate"){
      update_value.invoiceitems[index][name] = value 
    }

    setInvoiceRepo(update_value)


    

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
    ); */
  };

  const handleDetailInput = (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof Invoice
  ) => {
    e.preventDefault()
    const {value} = e.currentTarget

    if (name !== "invoiceitems") {
      let new_value = {...InvoiceRepo}

      if (name === "logoWidth" && typeof value === "number")
          new_value[name] = value

      else if (name !== "logoWidth" && name !== "tax" && typeof value === "string") {
          new_value[name] = value
      }

      setInvoiceRepo(new_value)
    }
    
    /**dispatch(
      updateInvoice({
        invName: name,
        invValue: value,
      })
    ); */
  };

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    documentTitle: "Powered By Kwik.com",
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
    const newItem = {...initialInvoiceItems}
    const itemList = [...InvoiceRepo.invoiceitems]
    
    /**setInvoiceRepo(state => [...state, newItem]) */
    /**dispatch(updateInvoiceItemNo()); */
  };

  const removeItem = (itemId: string | number | string[]) => {
    const item = InvoiceRepo.invoiceitems.filter(itm => itm.id !== itemId); 
    setInvoiceRepo({...InvoiceRepo, invoiceitems: item})
    /**dispatch(
      deleteInvoiceItemNo({
        invId: itemId,
      })
    ); */
  };

  const removeJSXElement = (elementid: string) => {
    const element = document.getElementById(elementid) as HTMLElement;
    element.style.display = "none";
    element.style.transition = "0.5s fade-out";
  };

  return (
    <EditorLayout>
      <div className={styles.fileAndEditor}>
        {/**<div className={styles.lseditor}>{dispInvComponents}</div> */} 
        <Editorbar
          handlePrint={() => handlePrint()}
        />
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
                <Chip label="complete" color="success" />
                <Divider />
                <Typography>Currency</Typography>
                {/**<Muiselect
                  state={currency}
                  handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCurrency(e.target.value)
                  }
                  label="Currency"
                  options={currencyList}
                /> */}
                <Divider />
                <Typography>Vat Rate %</Typography>
                <input
                  type="number"
                  placeholder="Vat Rate"
                  value={taxRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTaxRate(Number(e.target.value))
                  }
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
    </EditorLayout>
  );
};

export default invoices;
