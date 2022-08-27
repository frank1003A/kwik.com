import { PhotoFilter } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import React from 'react';
import { CompactPicker } from 'react-color';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import CustomLoader from '../../../components/asset/CustomLoader';
import ButtonComponent from '../../../components/Button';
import CustomSnackbar from '../../../components/CustomSnackbar';
import { countryList } from '../../../components/Data/countryList';
import { initialInvoice } from '../../../components/Data/initialData';
import { Invoice, InvoiceItems, STATUS } from '../../../components/Data/types';
import Editorbar from '../../../components/Editorbar';
import InvoiceMain from '../../../components/InvoiceMain';
import SettingsComponent from '../../../components/InvoiceSettings';
import Layout from '../../../components/Layout';
import Modals from '../../../components/Modal';
import { Header, PropertiesContainer, Property, PropertyEditor } from '../../../components/styled-component/editorbar';
import { Container } from '../../../components/styled-component/Global';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { postRequest } from '../../../lib/axios/axiosClient';
import styles from '../../../styles/Invoice.module.css';
import { useAppDispatch } from '../../redux/hooks';
import { clearProducts } from '../../redux/productSlice';
import { RootState } from '../../redux/store';

import type { NextPage } from "next";
interface Props {
  invoice: Invoice;
}

/**Google Translate Data Response Type */
interface languageResponse {
  data?: {
    languages: {
      language: string;
    }[];
  };
}

const createInvoice: NextPage<Props> = () => {
  const router = useRouter();
  const {} = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/login");
    },
  });

  const { theme } = useTheme();
  const { user, isLoading, status } = useCurrentUser();

  const [editPdf, seteditPdf] = useState<boolean>(false);
  const [opensuccess, setOpensuccess] = useState<boolean>(false);
  const [opensaved, setOpenSaved] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>();
  const [currency, setCurrency] = useState<string>("");
  const [InvoiceRepo, setInvoiceRepo] = useState<Invoice>({
    ...initialInvoice,
  });
  const [sModal, setSModal] = useState<boolean>(false);
  const [clipboard, setClipboard] = useState<boolean>(false);
  const [languages, setLanguages] = useState<languageResponse>({});

  const SelectedProducts = useSelector((state: RootState) => state.product);
  const SelectedClient = useSelector((state: RootState) => state.client);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user !== undefined && status === "authenticated") {
      setInvoiceRepo({
        ...InvoiceRepo,
        companyName: user.buisness_name!,
        companyAddress: user.buisness_address!,
        companyAddress2: user.buisness_address2!,
        companyCountry: user.country!,
        invoiceTitle: `invoice#${nanoid(5)}`,
      });
    }
  }, [user, status]);

  /**
   * we need to pass the products selected from products page
   *  to itemArr for our invoice to display.
   *  so we create a new method and remodel the data to eliminate type error
   */
  const handleProductTransfer = () => {
    setClipboard(false);
    const resInv: Invoice = { ...InvoiceRepo };
    resInv.invoiceitems = SelectedProducts.product?.map((sp) => {
      let somedata: InvoiceItems = {
        _id: nanoid(5),
        description: sp.description!,
        quantity: 0,
        rate: sp.rate!,
        amount: "0.00",
      };
      return somedata;
    });
    setInvoiceRepo({ ...InvoiceRepo, invoiceitems: resInv.invoiceitems });
    dispatch(clearProducts());
  };

  /**
   * likewise we pass the client selected from client page
   */
  const handleClientTransfer = () => {
    const { fullname } = SelectedClient.client 
      setInvoiceRepo({
        ...InvoiceRepo, 
        clientName: fullname as string,
      })
  }

  useEffect(() => {
    /**Transfer products and client data to invoice - if any */
    if (SelectedProducts.product.length > 0) handleOpenClipboard();
  }, []);

  useEffect(() => {
    if (SelectedClient.client.fullname) handleClientTransfer()
  }, [])
  

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

  const handleShowSettingsModal = () => setSModal(true);
  const handleCloseSettingsModal = () => setSModal(false);

  const handleOpenClipboard = () => setClipboard(true);
  const handleCloseClipboard = () => setClipboard(false);

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
    MInvoice.invoiceitems = items;
    getSubTotal(MInvoice);
    getTxRate(MInvoice);
    getTotal(MInvoice);
    setInvoiceRepo(MInvoice);
  };

  const handleDetailInput = (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof Invoice
  ) => {
    e.preventDefault();
    const { value } = e.currentTarget;

    const newInvoice: Invoice = { ...InvoiceRepo };
    if (
      name !== "invoiceitems" &&
      name !== "_id" &&
      name !== "status" &&
      name !== "owner"
    ) {
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

  const handleImageChange = (
    name: keyof Invoice,
    value: string | number | number[]
  ) => {
    const newInvoice: Invoice = { ...InvoiceRepo };
    if (name === "logo" && typeof value === "string") newInvoice[name] = value;
    if (name === "logoWidth" && typeof value === "number")
      newInvoice[name] = value;

    setInvoiceRepo(newInvoice); //update Image or logo
  };

  /**
   * const handleDefaultLogoChange = (
    name: keyof Invoice,
    value: string | number | number[]
  ) => {
    const newInvoice: Invoice = { ...InvoiceRepo };
    if (name === "defaultLogo" && typeof value === "string") newInvoice[name] = value;
    setInvoiceRepo(newInvoice); //update default logo
  }
   */

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

  const handleTxRateChange = () => {
    const inv: Invoice = { ...InvoiceRepo };
    getTxRate(inv);
    getSubTotal(inv);
    getTotal(inv);
    setInvoiceRepo(inv);
  };

  useEffect(() => {
    /**Handle User Rate */
    handleTxRateChange();
  }, [taxRate]);

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
      const InvoicePost = await postRequest(
        `api/user/invoice/invoices/?user_id=${user._id}`,
        InvoiceRepo
      );
      if (InvoicePost.data) setOpensuccess(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading ||
      status === "loading" ||
      status === "unauthenticated" ||
      !InvoiceRepo.invoiceTitle ? (
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
              {/**<div className={styles.lseditor}>{dispInvComponents}</div> */}
              <Editorbar
                saveText="SAVE"
                handlePrint={() => handlePrint()}
                handleSave={() => handleInvoicePost()}
                handleVat={() => handleShowSettingsModal()}
                exportPDF={async () => {
                  const { exportComponentAsPDF } = await import(
                    "react-component-export-image"
                  );
                  exportComponentAsPDF(componentRef);
                }}
                exportJPEG={async () => {
                  const { exportComponentAsJPEG } = await import(
                    "react-component-export-image"
                  );
                  exportComponentAsJPEG(componentRef);
                }}
              />
              <div className={styles.editorFlex}>
                <InvoiceMain
                  style={{ ...InvoiceRepo.pageStyles }}
                  customStyle={{ ...InvoiceRepo.styles }}
                  ref={componentRef}
                  options={countryList}
                  pdfMode={editPdf}
                  cur={currency}
                  itemArr={InvoiceRepo.invoiceitems}
                  addTC={addTC}
                  tR={taxRate}
                  removeItem={removeItem}
                  handleChange={handleImageChange}
                  handleDetailInput={handleDetailInput}
                  handleItemInput={handleItemInput}
                  invoice={InvoiceRepo}
                  dateSet={setInvoiceRepo}
                  selClr={setInvoiceRepo}
                  onChangeComplete={(color) =>
                    setInvoiceRepo({ ...InvoiceRepo, colorTheme: color.hex })
                  }
                  selectedColor={InvoiceRepo.colorTheme}
                />
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
                              ...InvoiceRepo.pageStyles,
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

            <CustomSnackbar
              openAlert={opensuccess}
              closeAlert={handlesucClose}
              outputText="Invoice Saved"
              verticalPosition="bottom"
              horizontalPosition="center"
            />

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
                Thank You for using Kwik Invoice Generator
              </div>
              <ButtonComponent innerText={"Continue"} />
            </Modals>

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
                /**handleDefaultLogo={(value) => handleDefaultLogoChange('defaultLogo', value)} */
              />
            </Modals>

            <Modals
              OpenModal={clipboard}
              handleCloseModal={handleCloseClipboard}
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
                <Typography variant="subtitle1" color="initial">
                  You have {SelectedProducts.product.length} products in
                  Clipboard
                </Typography>
                <ButtonComponent
                  innerText={"Retrieve"}
                  onClick={() => handleProductTransfer()}
                />
              </div>
            </Modals>
          </Container>
        </Layout>
      )}
    </>
  );
};

export default createInvoice;
