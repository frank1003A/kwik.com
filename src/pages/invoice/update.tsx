import {
  Checkbox,
  Chip, FormControlLabel, Typography
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import ButtonComponent from "../../../components/Button";
import { countryList } from "../../../components/Data/countryList";
import { initialInvoice } from "../../../components/Data/initialData";
import { Invoice, InvoiceItems, STATUS } from "../../../components/Data/types";
import InvoiceMain from "../../../components/InvoiceMain";
import Layout from "../../../components/Layout";
import Modals from "../../../components/Modal";
import {
  Header,
  PropertiesContainer,
  Property,
  PropertyEditor
} from "../../../components/styled-component/editorbar";
import { Container } from "../../../components/styled-component/Global";
import { patchRequest } from "../../../lib/axios/axiosClient";
import styles from "../../../styles/Invoice.module.css";

import {
  PhotoFilter,
  Redo,
  RemoveCircleRounded
} from "@mui/icons-material";
import axios, { AxiosRequestConfig } from "axios";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { CompactPicker } from "react-color";
import Editorbar from "../../../components/Editorbar";
import SettingsComponent from "../../../components/InvoiceSettings";
import useGetter from "../../../hooks/useGetter";
//import { exportComponentAsJPEG, exportComponentAsPDF,  } from "react-component-export-image";
import { motion } from "framer-motion";
import ControlledAccordions from "../../../components/Accordion";
import CustomLoader from "../../../components/asset/CustomLoader";
import CustomSnackbar from "../../../components/CustomSnackbar";

/**Google Translate Data Response Type */
interface languageResponse {
  data?: {
    languages: {
      language: string;
    }[];
  };
}

const EditInvoice: NextPage = () => {
  const { query } = useRouter();

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/login");
    },
  });

  const { data, isError, isLoading } = useGetter(
    `/api/user/invoice/invoice/?invoice_id=${query.invoice_id}`
  );

  const [editPdf, seteditPdf] = useState<boolean>(false);
  const [opensuccess, setOpensuccess] = useState<boolean>(false);
  const [opensaved, setOpenSaved] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>();
  const [currency, setCurrency] = useState<string>("");
  const [showEditComp, setShowEditComp] = useState<boolean>(false);
  const [edcActive, setEdcActive] = useState<boolean>(false);
  const [invComp, setInvComp] = useState<boolean>(false);
  const [languages, setLanguages] = useState<languageResponse>({});
  const [sModal, setSModal] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);
  const [toggleDisplay, setToggleDisplay] = useState<{
    headerdisplay: "" | "none";
    divider: "" | "none";
    cs: "" | "none";
    logo: "" | "none";
    tt: "" | "none";
    nt: "" | "none";
    tc: "" | "none";
  }>({
    headerdisplay: "",
    divider: "",
    cs: "",
    logo: "",
    tt: "",
    nt: "",
    tc: "",
  });

  /**
   * edtable true means the core input element is disabled.
   * function handleEditable() takes care of the core logic
   * not the best or simple logic, but it works
   **/
  const [editable, setEditable] = useState<boolean>(true);
  const [notifyEdit, setNotifyEdit] = useState<boolean>(false);
  const [InvoiceRepo, setInvoiceRepo] = useState<Invoice>(
    data ? { ...data } : { ...initialInvoice }
  );
  const [informUser, setInformUser] = useState<{
    updatealert: boolean;
    message: string;
  }>({
    updatealert: false,
    message: "",
  });

  const setter = () => {
    if (data !== undefined) setInvoiceRepo(data);
    if (isError) console.log(isError);
  };

  useEffect(() => {
    setter();
  }, [data]);

  const handleShowSettingsModal = () => setSModal(true);
  const handleCloseSettingsModal = () => setSModal(false);

  const handleOpenNotifyEdit = () => setNotifyEdit(true);
  const handleCloseNotifyEdit = (
    event: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNotifyEdit(false);
  };

  useEffect(() => {
    setInvComp(true);
  }, []);

  const dispInvComponents: JSX.Element[] = [
    <>
      <div>
        <ControlledAccordions
          headerChildren={
            <div className={styles["acctext"]}>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>
                  remove all{" "}
                </Typography>
                <button
                  title="header-remove"
                  onClick={() =>
                    setToggleDisplay({
                      ...toggleDisplay,
                      headerdisplay: "none",
                    })
                  }
                >
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>logo </Typography>
                <button
                  title="logo-remove"
                  onClick={() =>
                    setToggleDisplay({ ...toggleDisplay, logo: "none" })
                  }
                >
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>title </Typography>
                <button
                  title="title-remove"
                  onClick={() =>
                    setToggleDisplay({ ...toggleDisplay, tt: "none" })
                  }
                >
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>reset </Typography>
                <button
                  title="none-remove"
                  onClick={() =>
                    setToggleDisplay({ ...toggleDisplay, headerdisplay: "" })
                  }
                >
                  <Redo />
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
                <button
                  title="divider-remove"
                  onClick={() =>
                    setToggleDisplay({ ...toggleDisplay, divider: "none" })
                  }
                >
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>reset </Typography>
                <button
                  title="none-remove"
                  onClick={() =>
                    setToggleDisplay({ ...toggleDisplay, divider: "" })
                  }
                >
                  <Redo />
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
                <button
                  title="cd-remove"
                  onClick={() =>
                    setToggleDisplay({ ...toggleDisplay, cs: "none" })
                  }
                >
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>reset </Typography>
                <button
                  title="none-remove"
                  onClick={() => setToggleDisplay({ ...toggleDisplay, cs: "" })}
                >
                  <Redo />
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
                <button
                  onClick={() =>
                    setToggleDisplay({ ...toggleDisplay, nt: "none" })
                  }
                >
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>reset </Typography>
                <button
                  title="none-remove"
                  onClick={() => setToggleDisplay({ ...toggleDisplay, nt: "" })}
                >
                  <Redo />
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
                <button
                  onClick={() =>
                    setToggleDisplay({ ...toggleDisplay, tc: "none" })
                  }
                >
                  <RemoveCircleRounded />
                </button>
              </div>
              <div className={styles["compStyle"]}>
                <Typography sx={{ color: "text.secondary" }}>reset </Typography>
                <button
                  title="none-remove"
                  onClick={() => setToggleDisplay({ ...toggleDisplay, tc: "" })}
                >
                  <Redo />
                </button>
              </div>
            </div>
          }
        />
      </div>
    </>,
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

    //set mutable Invoice
    MInvoice.invoiceitems = items;

    //getSubtotal
    getSubTotal(MInvoice);

    //taxRate
    getTxRate(MInvoice);

    //getTotal
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
        name !== undefined &&
        name !== "invoiceDate" &&
        name !== "invoiceDueDate"
      ) {
        newInvoice[name] = value;
      } else if (
        !value &&
        name !== "logoWidth" &&
        name !== "tax" &&
        typeof value === "string" &&
        name !== undefined &&
        name !== "invoiceDate" &&
        name !== "invoiceDueDate"
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

    setInvoiceRepo(newInvoice); //udate Image or logo
  };

  const handleDateInput = (
    date: Date,
    event: SyntheticEvent<any, Event>,
    key: keyof Invoice
  ) => {
    if (key === "invoiceDate" || key === "invoiceDueDate")
      setInvoiceRepo({ ...InvoiceRepo, [key]: date });
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

  const removeJSXElement = (elementid: string) => {
    setTest(!test);
    const element = document.getElementById(elementid) as HTMLElement;
    element.style.display = test ? "none" : "inherit";
    element.style.transition = "0.5s fade-out";
  };

  const updateInvoice = async (): Promise<void> => {
    const { _id, ...InvUpdate } = InvoiceRepo; // REMOVE ID FIELD
    try {
      const UpdatedInvoice = await patchRequest(
        `api/user/invoice/invoices/?invoice_id=${query.invoice_id}`,
        InvUpdate
      );
      if (UpdatedInvoice.data)
        setInformUser({
          ...informUser,
          updatealert: true,
          message: `updated invoice ${query.invoice_id}`,
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  const dispStats = (status: string) => {
    type stringUnion =
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
    const clr = ["error", "warning", "success"];
    return ["draft", "pending", "complete"].map((key, idx) => {
      if (status === key) {
        return (
          <Chip
            id="chipFont"
            label={status}
            sx={{ borderRadius: "4px" }}
            variant="filled"
            size="medium"
            color={clr[idx] as stringUnion}
          />
        );
      }
    });
  };

  /**get all google translate anguages */
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
    headers: {
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "6ed9e81ad4msh3da10810ad91da8p165683jsn7c4331c2158c",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setLanguages(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  /**detect current language 

  const encodeParamsTranslate = new URLSearchParams();
  encodeParamsTranslate.append("q", `${InvoiceRepo.notes}`);

  const detectoption: AxiosRequestConfig = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2/detect",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": '6ed9e81ad4msh3da10810ad91da8p165683jsn7c4331c2158c',
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data: encodeParamsTranslate,
  };

  useEffect(() => {
    axios
      .request(detectoption)
      .then(function (response) {
        console.log('detectedLanguage:', response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);


  /**
   * Translate current language 
   */

  const encodeParamsTranslate = new URLSearchParams();

  const translateLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    /**translate and assign to variables */
    const noteslabel = encodeParamsTranslate.append(
      "q",
      `${InvoiceRepo.notesLabel}`
    );
    //encodeParamsTranslate.append("q",  `${InvoiceRepo.notes}`);
    encodeParamsTranslate.append("target", e.target.value);
    encodeParamsTranslate.append("source", "en");

    /**
    * /**Assign traslation to invoice 
   let inv: Invoice = {...InvoiceRepo}
   if (noteslabel !== undefined) inv.notes = noteslabel

   /** 
   if (typeof noteslabel === "string")
   setInvoiceRepo({...InvoiceRepo, notesLabel: noteslabel})
    */
  };

  const optionsTranslate: AxiosRequestConfig = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "6ed9e81ad4msh3da10810ad91da8p165683jsn7c4331c2158c",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data: encodeParamsTranslate,
  };

  useEffect(() => {
    axios
      .request(optionsTranslate)
      .then(function (response) {
        console.log("translated", response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [languages]);

  const handleEditable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: boolean = e.target.checked;
    /**
     * If you are looking at this and wondering:
     * WTH is this ?
     * You are not alone "😜"
     */

    if (value === false) {
      //const setEditable: (value: React.SetStateAction<boolean>) => void
      setEditable(true);
    } else if (value === true) {
      setEditable(false);
      handleOpenNotifyEdit();
    }
  };

  return (
    <>
      {isLoading ? (
        <motion.div
          layout
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <CustomLoader />
          <Typography>
            Please wait while we get things set up for you...
          </Typography>
        </motion.div>
      ) : (
        <Layout>
          <Container>
            <div className={styles.fileAndEditor}>
              <div className={styles.lseditor}>{dispInvComponents}</div>
              <Editorbar
                saveText="UPDATE"
                updateDisabled={editable === false ? false : true}
                handlePrint={() => handlePrint()}
                handleSave={() => updateInvoice()}
                handleVat={() => handleShowSettingsModal()}
                status={dispStats(InvoiceRepo.status!)}
                exportPDF={async () => {
                  const { exportComponentAsPDF } = await import(
                    "react-component-export-image"
                  );
                  exportComponentAsPDF(componentRef, {
                    pdfOptions: {
                      orientation: "p",
                    },
                  });
                }}
                exportJPEG={async () => {
                  const { exportComponentAsPNG } = await import(
                    "react-component-export-image"
                  );
                  exportComponentAsPNG(componentRef, {
                    html2CanvasOptions: {
                      backgroundColor: "white",
                      scale: 100,
                      removeContainer: true,
                    },
                  });
                }}
                editController={
                  <FormControlLabel
                    label={`EDIT`}
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
                      <Checkbox
                        color="primary"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleEditable(e)
                        }
                      />
                    }
                  />
                }
              />
              <div className={styles.editorFlex}>
                <InvoiceMain
                  style={{ ...InvoiceRepo.pageStyles }}
                  customStyle={{ ...InvoiceRepo.styles }}
                  contentEditable={editable}
                  ref={componentRef}
                  options={countryList}
                  pdfMode={editPdf}
                  cur={currency}
                  handleDateInput={handleDateInput}
                  itemArr={InvoiceRepo.invoiceitems}
                  addTC={addTC}
                  tR={taxRate}
                  removeItem={removeItem}
                  handleChange={handleChange}
                  handleDetailInput={handleDetailInput}
                  handleItemInput={handleItemInput}
                  invoice={InvoiceRepo}
                  selClr={setInvoiceRepo}
                  onChangeComplete={(color) =>
                    setInvoiceRepo({ ...InvoiceRepo, colorTheme: color.hex })
                  }
                  selectedColor={InvoiceRepo.colorTheme}
                  hsco={toggleDisplay.headerdisplay}
                  dividerDisplay={toggleDisplay.divider}
                  csDisplay={toggleDisplay.cs}
                  logo={toggleDisplay.logo}
                  titlebox={toggleDisplay.tt}
                  tanc={toggleDisplay.tc}
                  notes={toggleDisplay.nt}
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
                        onChange={(e) =>
                          setInvoiceRepo({
                            ...InvoiceRepo,
                            styles: {
                              ...InvoiceRepo.styles,
                              fontFamily: e.target.value,
                            },
                          })
                        }
                        color={"#555"}
                      >
                        <option value="sans-serif">sans-serif</option>
                        <option value="monospace">monospace</option>
                        <option value="fantasy">fantasy</option>
                        <option value="cursive">cursive</option>
                        <option value="sans-serif">Roboto</option>
                      </select>
                    </Property>
                    <Property>
                      <Typography variant="overline" color="#555">
                        Background Color
                      </Typography>
                      <CompactPicker
                        onChange={(color) =>
                          setInvoiceRepo({
                            ...InvoiceRepo,
                            pageStyles: {
                              background: color.hex,
                            },
                          })
                        }
                      />
                    </Property>
                    <Property>
                      <Typography variant="overline" color="#555">
                        Font Color
                      </Typography>
                      <CompactPicker
                        onChange={(color) =>
                          setInvoiceRepo({
                            ...InvoiceRepo,
                            styles: {
                              ...InvoiceRepo.styles,
                              color: color.hex,
                            },
                          })
                        }
                      />
                    </Property>
                    <Property>
                      <Typography variant="overline" color="#555">
                        Language
                      </Typography>
                      <div style={{ width: "230px", padding: "0px 2px" }}>
                        <select
                          name="font"
                          title="font-Change"
                          onChange={(e) =>
                            setInvoiceRepo({
                              ...InvoiceRepo,
                              styles: {
                                ...InvoiceRepo.styles,
                                fontLanguageOverride: e.target.value,
                              },
                            })
                          }
                        >
                          {languages.data?.languages.map((l) => {
                            return (
                              <option value={l.language}>{l.language}</option>
                            );
                          })}
                        </select>
                      </div>
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

            {/**Notify of Editable Status */}
            <Snackbar
              open={notifyEdit}
              autoHideDuration={4000}
              onClose={handleCloseNotifyEdit}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseNotifyEdit}
                severity="success"
                sx={{ width: "100%" }}
              >
                <Typography>Content is now Editable</Typography>
              </Alert>
            </Snackbar>

            <CustomSnackbar
              openAlert={informUser.updatealert}
              closeAlert={() =>
                setInformUser({ ...informUser, updatealert: false })
              }
              outputText={informUser.message}
              verticalPosition="bottom"
              horizontalPosition="center"
            />

            <Modals
              OpenModal={sModal}
              handleCloseModal={handleCloseSettingsModal}
              pd="1rem"
            >
              <SettingsComponent
                taxOnChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTaxRate(Number(e.target.value))
                }
                currentTaxRate={taxRate}
                data={InvoiceRepo}
              />
            </Modals>

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
      )}
    </>
  );
};

export default EditInvoice;

/**<div className={styles["edcToggler"]}>
                <button
                  className={
                    edcActive === true
                      ? styles["edcBtnActive"]
                      : styles["edcBtn"]
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
              {showEditComp ? null : (
                <PropertiesContainer>
                  <Property>
                    <p>Page Color</p>
                    <SketchPicker onChange={(color) => setBackground(color.hex)}/>
                  </Property>
                  <Property>
                    <p>Make Changes to Invoice </p>
                    <Switch
                      value={editable}
                      onChange={(e) => setEditable(e.currentTarget.checked)}
                    />
                  </Property>
                  <Property>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '.5rem',
                      gap: '.5rem'
                    }}>
                    <div>
                    <button onClick={() => updateInvoiceStatus('status', 'draft')}>draft</button>
                    <button onClick={() => updateInvoiceStatus('status', 'pending')}>pending</button>
                    <button onClick={() => updateInvoiceStatus('status', 'complete')}>complete</button>
                    </div>
                    <Badge variant="dot">{InvoiceRepo.status}</Badge>
                    </div>
                  </Property>
                  <Property>
                    <p>Font Family</p>
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
                    <EditableColor
                      color={background}
                      displayColorPicker={displayColorPicker}
                      handleChange={(color) => setBackground(color.hex)}
                      handleClick={handleClick}
                      handleClose={handleClose}
                    />
                  </Property>
                  <Property>
                  <Typography>Vat Rate %</Typography>
                  <input
                    type="text"
                    placeholder="Vat Rate"
                    value={taxRate}
                    onChange={(e) => handleDetailInput(e, 'tax')}
                  />
                  </Property>
                  <Property>
                  <Typography>Background Image</Typography>
                  <input type="file" placeholder="upload PNG or JPEG" />
                  </Property>
                </PropertiesContainer>
              )} */

/**<Typography>Currency</Typography>
                  {/**{<Muiselect
                 state={currency}
                 handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                   setCurrency(e.target.value)
                 }
                 label="Currency"
                 options={currencyList}
               /> } } */

/**<CanvasProperty>
                <div>
                  <p>Width</p>
                  <NumberInput>
                    <div>
                      <input type="text" />
                      <p>px</p>
                    </div>
                  </NumberInput>
                </div>
                <div>
                  <p>Height</p>
                  <NumberInput>
                  <div>
                      <input type="text" />
                      <p>px</p>
                    </div>
                  </NumberInput>
                </div>
              </CanvasProperty> */

/**<Property>
              {invoice ? 
               <Chip label="complete" variant='outlined' color="success" /> :  
               <Chip label="not-complete" variant='outlined' color="warning" />
               }
              </Property> */

/**export async function getServerSideProps(context: NextPageContext) {
    
    const data = await axios.get(`http://localhost:3000/api/invoice/?invoice_id=${new ObjectId(context.query.invoice_id?.toString())}`, {
       headers:{
         'Content-Type': 'application/json'
       },
     }).then(res => res.data)
   
     let invoice = await JSON.parse(JSON.stringify(data));
   
     return {
       props: { invoice },
     };
   } */
