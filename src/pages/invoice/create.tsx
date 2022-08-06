import { Checkbox, Divider, FormControlLabel, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { nanoid } from "nanoid";
import Image from "next/image";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useRef } from "react";
import React from "react";
import { useReactToPrint } from "react-to-print";
import ButtonComponent from "../../../components/Button";
import { countryList } from "../../../components/Data/countryList";
import { initialInvoice } from "../../../components/Data/initialData";
import { Invoice, InvoiceItems, STATUS } from "../../../components/Data/types";
import Editorbar from "../../../components/Editorbar";
import InvoiceMain from "../../../components/InvoiceMain";
import Layout from "../../../components/Layout";
import MainEditor from "../../../components/MainEditor";
import Modals from "../../../components/Modal";
import { Container } from "../../../components/styled-component/Global";
import { postRequest } from "../../../lib/axios/axiosClient";
import styles from "../../../styles/Invoice.module.css";
import type { NextPage } from "next";
import { ProductSelectedContext } from "../../../helper/context/sp/ContextProdvider";
import { CustomerSelectedContext } from "../../../helper/context/clientContext/ClientContextprovider";
import { resolve } from "path";
import useLocalStorage from "../../../hooks/localStorage";
import clients from "../../../model/clients";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { clearProducts } from "../redux/productSlice";
import { PhotoFilter } from "@mui/icons-material";
import { CompactPicker } from "react-color";
import { PropertyEditor, PropertiesContainer, Property, Header } from "../../../components/styled-component/editorbar";

interface Props {
  invoice: Invoice;
}

const createInvoice: NextPage<Props> = () => {

  const [editPdf, seteditPdf] = useState<boolean>(false);
  const [opensuccess, setOpensuccess] = useState<boolean>(false);
  const [opensaved, setOpenSaved] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>();
  const [currency, setCurrency] = useState<string>("");
  const [showEditComp, setShowEditComp] = useState<boolean>(false);
  const [edcActive, setEdcActive] = useState<boolean>(false);
  const [invComp, setInvComp] = useState<boolean>(false);
  const [InvoiceRepo, setInvoiceRepo] = useState<Invoice>({
    ...initialInvoice,
  });
  const [editable, setEditable] = useState<boolean>(true);
  const [background, setBackground] = useState<string>("#fff");
  const [font, setFont] = useState("");
  const [displayColorPicker, setdisplayColorPicker] = useState<boolean>(false);
  const [passed, setPassed] = useState<boolean>(false);
  const [passedClient, setPassedClient] = useState<boolean>(false);
  const [genNo, setGenNo] = useState<boolean>(false);
  const [override, setOverride] = useState<boolean>(false);

  const SelectedProducts = useSelector((state: RootState) => state.product)
  const SelectedClient = useSelector((state: RootState) => state.client)
  const dispatch =  useAppDispatch()

  /**generate unique number for invoice */
  const generateInvoiceNo = (): string => {
    const newId = `invoice#${nanoid(5)}`;
    setGenNo(true);
    return newId;
  };

  const assignInvoiceNo = () => {
    if (InvoiceRepo) {
      const resInv: Invoice = { ...InvoiceRepo };
      resInv.invoiceTitle = generateInvoiceNo();
      setInvoiceRepo(resInv);
    } else {
      return;
    }
  };

  useEffect(() => {
    /**Assign uniqiue number to Invoice once page is loaded */
    assignInvoiceNo();
  }, [genNo]);

  /** 
   * we need to pass the products selected from products page
   *  to itemArr for our invoice to display.
   *  so we create a new method to eliminate type error
   *  this method will render data passed from ReduxToolkit to accomodate
   *  the model of items in our Invoice.
   */
  const handleProductTransfer = () => {
      const resInv: Invoice = { ...InvoiceRepo };
       resInv.invoiceitems = SelectedProducts.product?.map((sp) => {
         let somedata = {
        _id: nanoid(5),
        description: sp.description!,
        quantity: 0,
        rate: sp.rate!,
        amount: "0.00",
      };
      return somedata;
    });
    setInvoiceRepo({...resInv});
    setPassed(true)
  };

  /**
   *  Once the Product data has been passed to our invoice.
   *  We need to clear the ReduxToolkit array, so when users
   *  navigate back to product page, they don't see the same
   *  product in the product selected list
   */
  const clearProductData = () => {
    //clear array of selected products
    dispatch(clearProducts())
  };

  const handleClientTransfer = () => {
      const resInv: Invoice = { ...InvoiceRepo };
      resInv.billTo = SelectedClient.client?.buisness!
      resInv.clientName = SelectedClient.client?.fullname!
      setInvoiceRepo({...resInv});
      setPassedClient(true)
  }

  useEffect(() => {
    if (SelectedProducts.product.length >= 1 && SelectedClient.client)
    /**Transfer products data to invoice - if any */
    handleProductTransfer();

    if (SelectedProducts.product.length <= 0 && SelectedClient.client) {
      /**Transfer client data to invoice - if any */
      handleClientTransfer()
    }
  },[]);

  useEffect(() => {
    /**remove products data to invoice - if any */
    clearProductData();
  },[passed]);


  /**
   * I need to handle the editability of 
   * products and clients info from 
   * products and clients page 
   * will do that when this goes live
  */
  
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
    let MInvoice: Invoice = { ...InvoiceRepo };
    let Items: InvoiceItems[] = [...InvoiceRepo.invoiceitems];

    const items = Items.map((itm, idx) => {
      if (index === idx) {
        const invItems: InvoiceItems = { ...itm };
        if (name === "_id" && name !== undefined && typeof value === "number") {
          throw new Error(
            "An attempt has been made to mutate an Id field which is not allowed"
          );
        } else if (
          name === "quantity" &&
          name !== undefined &&
          typeof value === "string"
        ) {
          invItems[name] = Number(value);
        } else if (name == "description" && typeof value === "string") {
          invItems[name] = value;
        } else if (name == "rate" && typeof value === "string") {
          invItems[name] = value;
        }

        if (invItems.quantity && invItems.rate) {
          invItems.amount = (
            invItems.quantity * Number(invItems.rate)
          ).toString();
        }

        return invItems;
      }
      return itm;
    });
    //
    /**set mutable Invoice */
    MInvoice.invoiceitems = items;
    //
    getSubTotal(MInvoice);
    //
    getTxRate(MInvoice);
    //
    getTotal(MInvoice);

    setInvoiceRepo(MInvoice); //setter
  };

  const handleDetailInput = (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof Invoice
  ) => {
    e.preventDefault();
    const { value } = e.currentTarget;

    const newInvoice: Invoice = { ...InvoiceRepo };
    if (name !== "invoiceitems" && name !== "_id" && name !== "status") {
      if (
        name !== "logoWidth" &&
        name !== "tax" &&
        typeof value === "string" &&
        name !== undefined
      ) {
        newInvoice[name] = value;
      } else if (
        !value &&
        name !== "logoWidth" &&
        name !== "tax" &&
        typeof value === "string" &&
        name !== undefined
      ) {
        newInvoice[name] = "";
      }
    }
    setInvoiceRepo(newInvoice);
  };

  const updateInvoiceStatus = (
    name: keyof Invoice,
    status: STATUS["status"]
  ) => {
    const newInvoice: Invoice = { ...InvoiceRepo };

    if (name === "status") newInvoice[name] = status;

    setInvoiceRepo(newInvoice);
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
    const newInvoice: Invoice = { ...InvoiceRepo };
    if (name === "logo" && typeof value === "string") newInvoice[name] = value;
    if (name === "logoWidth" && typeof value === "number")
      newInvoice[name] = value;

    setInvoiceRepo(newInvoice); //update Image or logo
  };

  const addTC = () => {
    const newInvoice: Invoice = { ...InvoiceRepo };
    const newItem = {
      _id: nanoid(5),
      description: "",
      quantity: 0,
      rate: "",
      amount: "0.00",
    };
    newInvoice.invoiceitems.push(newItem);
    setInvoiceRepo(newInvoice);
  };

  const removeItem = (id: string | number | string[]) => {
    const newInvoice: Invoice = { ...InvoiceRepo };
    const item = newInvoice.invoiceitems.filter((itm) => itm._id !== id);
    newInvoice.invoiceitems = item;
    setInvoiceRepo(newInvoice);
  };

  const getSubTotal = (inv: Invoice): void => {
    const subTotal = inv.invoiceitems
      .reduce((acc, item) => acc + Number(item.amount || 0), 0)
      .toString();
    inv.subTotal = subTotal === undefined ? "0.00" : subTotal;
  };

  const getTxRate = (inv: Invoice): void => {
    if (taxRate && taxRate !== undefined) {
      const tax =
        taxRate !== undefined
          ? (taxRate / 100) * Number(inv.subTotal)
          : taxRate;
      if (tax !== undefined) inv.tax = tax;
    }
  };

  const getTotal = (inv: Invoice): void => {
    const total =
      Number(inv.subTotal) + (Number(inv.tax) !== 0 ? Number(inv.tax) : 0);
    inv.total = total.toString();
  };

  /**const removeJSXElement = (elementid: string) => {
    const element = document.getElementById(elementid) as HTMLElement;
    element.style.display = "none";
    element.style.transition = "0.5s fade-out";
  }; */

  const handleInvoicePost = async (): Promise<void> => {
    try {
      const InvoicePost = await postRequest("api/invoices", InvoiceRepo);
      console.log(InvoicePost);
      alert("saved");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <Container>
        <div className={styles.fileAndEditor}>
          {/**<div className={styles.lseditor}>{dispInvComponents}</div> */}
          <Editorbar
           editController={
            <FormControlLabel
                label={`Override`}
                sx={{
                  margin: "0",
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  fontWeight: "500",
                  textTransform: "capitalize",
                  color: "#555",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  letterSpacing: "0.00938em",
                }}
                labelPlacement="end"
                control={
                <Checkbox color="primary"  
                onChange={() => setOverride(true)}/>
              }
              />
           }
            saveText="SAVE"
            handlePrint={() => handlePrint()}
            handleSave={() => handleInvoicePost()}
          />
          <div className={styles.editorFlex}>
            <InvoiceMain
              style={{ background: background, fontFamily: font }}
              ref={componentRef}
              options={countryList}
              pdfMode={editPdf}
              cur={currency}
              itemArr={InvoiceRepo.invoiceitems}
              addTC={addTC}
              tR={taxRate}
              removeItem={removeItem}
              handleChange={handleChange}
              handleDetailInput={handleDetailInput}
              handleItemInput={handleItemInput}
              invoice={InvoiceRepo}
            ></InvoiceMain>
            <PropertyEditor>
              <Header>
                <PhotoFilter />
                <Typography variant="subtitle1" color="#555">
                  Page Design
                </Typography>
              </Header>
              <PropertiesContainer>
                <Property>
                  <Typography variant="overline" color="#555">
                    Font Family
                  </Typography>
                  <select
                    name="font"
                    title="font-Change"
                    onChange={(e) => setFont(e.target.value)}
                  >
                    <option value="sans-serif">sans-serif</option>
                    <option value="monospace">monospace</option>
                    <option value="fantasy">fantasy</option>
                    <option value="cursive">cursive</option>
                  </select>
                </Property>
                <Property>
                  <Typography variant="overline" color="#555">
                    Background Color
                  </Typography>
                  <CompactPicker
                    onChange={(color) => setBackground(color.hex)}
                  />
                </Property>
                <Property>
                  <Typography variant="overline" color="#555">
                    Language
                  </Typography>
                  <div style={{width: '230px', padding: '0px 2px'}}>
                  <select
                    name="font"
                    title="font-Change"
                    onChange={(e) => setFont(e.target.value)}
                  >
                    <option value="sans-serif">English</option>
                    <option value="monospace">monospace</option>
                    <option value="fantasy">fantasy</option>
                    <option value="cursive">cursive</option>
                  </select>
                  </div>
                </Property>
                <Property>
                  <Typography variant="overline" color="#555">
                    Composer
                  </Typography>
                </Property>
              </PropertiesContainer>
            </PropertyEditor>
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

        <Modals
          OpenModal={opensaved}
          handleCloseModal={handleOpenSaveInfoClose}
          pd="1rem"
        >
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
  );
};

export default createInvoice;

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

 /**Disale Input when passed from product or client page */
  /**const handleClientEditableInput = (elm: HTMLDivElement) => {
    if (elm) {
      const elements = elm.children;
      const len = elements.length;
      for (let i = 0; i < len; i++) {
        const chld = elements[i].children;
        const divOne = chld[3].children[0].children
        for (let i = 0; i < divOne.length; i++){
          if(passedClient === true){
            const inputs = divOne[i] as HTMLInputElement
            override === false ? inputs.disabled = true : inputs.disabled = false
          }
        }
      }
    }
  }; */

  /**const clientInputRef = useRef<HTMLDivElement | null>(null)

  /**
   * Disable Input when data is passed from client page
   * This is to control the integrity of data from the backend 
   * If the data passed is easily editable, then it means the data
   * at the client database is lacking some level of data integrirty
   * 
  const handleClientEditableInput = (elm: HTMLDivElement) => {
    const parent = elm.children[0].children
    const len = parent.length
    for (let i = 0; i < len; i++){
        let inputs = parent[i] as HTMLInputElement
        override === false ? inputs.disabled = true : inputs.removeAttribute('disabled')
    }
  }

  useEffect(() => {
    const inputs = clientInputRef.current!
    handleClientEditableInput(inputs)
  }, [override]) */
