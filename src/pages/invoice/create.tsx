import {
  AddBox,
  Cancel,
  DataObject,
  GifBox,
  GifBoxTwoTone,
  PhotoFilter,
  Redo,
  RemoveCircleRounded,
} from "@mui/icons-material";
import { Badge, Chip, Typography } from "@mui/material";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BlockPicker,
  ChromePicker,
  CompactPicker,
  CustomPicker,
  HuePicker,
  SwatchesPicker,
  TwitterPicker,
} from "react-color";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

import ControlledAccordions from "../../../components/Accordion";
import CustomLoader from "../../../components/asset/CustomLoader";
import ButtonComponent from "../../../components/Button";
import CustomSnackbar from "../../../components/CustomSnackbar";
import { countryList } from "../../../components/Data/countryList";
import {
  initialInvoice,
  initialInvoiceItems,
} from "../../../components/Data/initialData";
import { Invoice, InvoiceItems, STATUS } from "../../../components/Data/types";
import Editorbar from "../../../components/Editorbar";
import InvoiceMain from "../../../components/InvoiceMain";
import SettingsComponent from "../../../components/InvoiceSettings";
import Modals from "../../../components/Modal";
import {
  Header,
  PropertiesContainer,
  Property,
  PropertyEditor,
} from "../../../components/styled-component/editorbar";
import { Container } from "../../../components/styled-component/Global";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { patchRequest, postRequest } from "../../../lib/axios/axiosClient";
import styles from "../../../styles/Invoice.module.css";
import { useAppDispatch } from "../../redux/hooks";
import {
  clearProducts,
  ProductState,
  updateAllProducts,
  updateProductSelected,
} from "../../redux/productSlice";
import { RootState } from "../../redux/store";

import type { NextPage } from "next";
import { NextPageWithLayout } from "../_app";
import Layout from "../../../components/Layout";
import productsClass from "../../../model/products";
import useGetter from "../../../hooks/useGetter";
import { useCallback } from "react";
import CustomIconBtn from "../../../components/CustomIconBtn";
import products from "../../../model/products";
import { ClientState } from "../../redux/clientSlice";
import Create from "../../../components/asset/Create";
import CustomIconAlert from "../../../components/CustomIconAlert";
import assert, { notEqual } from "assert";

const CreateInvoice: NextPageWithLayout = () => {
  const router = useRouter();
  const {} = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/login");
    },
  });

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
  const [altProduct, setAltProduct] = useState<productsClass[]>([]);
  /** */
  const [invComp, setInvComp] = useState<boolean>(false);
  const [edcActive, setEdcActive] = useState<boolean>(false);
  const [showEditComp, setShowEditComp] = useState<boolean>(false);
  const [passed, setPassed] = useState<boolean>(false);
  const [showBindedData, setShowBindedData] = useState<boolean>(false);
  const [itemEditable, setItemEditable] = useState<boolean>(false);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [interimSave, setInterimSave] = useState<boolean>(false);
  const [bindAlert, setBindAlert] = useState<{
    alert: boolean;
    message: string;
  }>({
    alert: false,
    message: "",
  });

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

  const SelectedProducts: ProductState = useSelector(
    (state: RootState) => state.product
  );
  const SelectedClient: ClientState = useSelector(
    (state: RootState) => state.client
  );
  const dispatch = useAppDispatch();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        _id: `${nanoid(5)}-${sp._id}`,
        description: sp.description!,
        quantity: 0,
        rate: sp.rate!,
        amount: "0.00",
      };
      return somedata;
    });
    setInvoiceRepo({ ...InvoiceRepo, invoiceitems: resInv.invoiceitems });
    setPassed(true);
    // dispatch(clearProducts());
  };

  /**Plan to add an autocomplete for clients and products */

  useEffect(() => {
    /**Transfer products and client data to invoice - if any */
    if (SelectedProducts.product.length > 0) handleOpenClipboard();
  }, [SelectedProducts.product.length]);

  /**
   * The base product functions checks if a product is from the product database or
   * it's a new product. if it is, it returns a string rep of the id of that product
   * from the product database and if it isn't it returns string - "not a base product"
   */
  const getBaseProductId = (string: string): string => {
    let mark = string.indexOf("-");
    let notBaseProduct = mark === -1 ? true : false;
    let len = 0;
    let str_id = "";
    if (notBaseProduct) {
      str_id = "not base product";
      return str_id;
    } else if (mark) {
      len = string.length;
      str_id = string.slice(mark + 1, len);
      return str_id;
    }
    return str_id;
  };

  const clearBaseProduct = () => {
    let invRepo = [...InvoiceRepo.invoiceitems];
    let updatedInv = invRepo.filter((alt, i) => {
      if (getBaseProductId(alt._id as string) === "not base product") {
        return alt;
      }
    });
    setInvoiceRepo({ ...InvoiceRepo, invoiceitems: updatedInv });
  };

  useMemo(() => {
    const newp: productsClass[] = SelectedProducts.product.map((pr, idx) => {
      let inv = { ...InvoiceRepo.invoiceitems };
      let spr = { ...pr };
      const initialValue: number = spr.qty as number;
      for (let i = 0; i < InvoiceRepo.invoiceitems.length; i++) {
        let base_id = "";
        let notBaseProduct: boolean =
          getBaseProductId(inv[i]._id as string) === "not base product"
            ? true
            : false;

        if (inv[i]._id !== undefined && notBaseProduct === false) {
          base_id = getBaseProductId(inv[i]._id as string);
        }

        if (base_id === pr._id?.toString()) {
          spr.qty = spr.qty !== undefined ? spr.qty - inv[i].quantity : 0;
        }

        if (notBaseProduct) inv[i].editable = false;
        if (notBaseProduct === false) inv[i].editable = true;

        //Limit the user from specifying a quantity greater than in-stock quantity
        if (notBaseProduct === false && spr.qty !== undefined) {
          if (inv[i].quantity > initialValue && i === idx) {
            alert(`${inv[i].description} is out of stock`);
            //reset the value to zero if quantity is greater than in-stock quantity
            inv[i].quantity = 0;
          }
        }

      }
      return spr;
    });
    setAltProduct(newp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [InvoiceRepo.invoiceitems, SelectedProducts.product]);
  

  const updateProductChanges = () => {
    return altProduct.filter((alt, i) => {
      let { _id, owner, ...ProUpdate } = alt;
      if (alt._id !== undefined) {
        updateProduct(alt._id?.toString(), ProUpdate);
      }
    });
  };

  const updateProduct = async (
    id: string,
    Product: products
  ): Promise<void> => {
    // REMOVE ID FIELD
    try {
      const UpdateProduct = await patchRequest(
        `api/user/product/products/?product_id=${id}`,
        Product
      );
      if (UpdateProduct.data) console.log(UpdateProduct.data);
    } catch (error: any) {
      console.log(error);
    }
  };

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
    e: (Event | React.SyntheticEvent<any, Event>) | string,
    index: number,
    name: keyof InvoiceItems
  ): void => {
    if (typeof e !== "string") {
      e.preventDefault();
      const { value } = e.currentTarget;
      let MInvoice: Invoice = { ...InvoiceRepo };
      let Items: InvoiceItems[] = [...InvoiceRepo.invoiceitems];

      const items = Items.map((itm, idx) => {
        if (index === idx) {
          const invItems: InvoiceItems = { ...itm };
          if (
            name !== "_id" &&
            name !== "quantity" &&
            name !== undefined &&
            name !== "editable" &&
            typeof value === "string"
          ) {
            invItems[name] = value;
          } else if (
            name === "quantity" &&
            name !== undefined &&
            typeof value === "string"
          ) {
            invItems[name] = Number(value);
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
    } else if (typeof e === "string") {
      const value = e;
      let MInvoice: Invoice = { ...InvoiceRepo };
      let Items: InvoiceItems[] = [...InvoiceRepo.invoiceitems];

      const items = Items.map((itm, idx) => {
        if (index === idx) {
          const invItems: InvoiceItems = { ...itm };
          if (
            name !== "_id" &&
            name !== "quantity" &&
            name !== undefined &&
            name !== "editable" &&
            typeof value === "string"
          ) {
            invItems[name] = value;
          } else if (
            name === "quantity" &&
            name !== undefined &&
            typeof value === "string"
          ) {
            invItems[name] = Number(value);
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
    }
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
      name !== "owner" &&
      name !== "invoiceDate" &&
      name !== "invoiceDueDate"
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

  const handleDateInput = (
    date: Date,
    event: SyntheticEvent<any, Event>,
    key: keyof Invoice
  ) => {
    console.log(event.currentTarget);
    if (key === "invoiceDate" || key === "invoiceDueDate")
      setInvoiceRepo({ ...InvoiceRepo, [key]: date });
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxRate]);

  const getTotal = (inv: Invoice): void => {
    const total =
      Number(inv.subTotal) + (Number(inv.tax) !== 0 ? Number(inv.tax) : 0);
    inv.total = total.toString();
  };

  const resetInvoice = () => {
    let inv = { ...InvoiceRepo };
    inv = initialInvoice;
    inv.invoiceTitle = `invoice#${nanoid(5)}`;
    inv.invoiceitems = [initialInvoiceItems];
    setInvoiceRepo({ ...inv });
  };

  const resetBindedInvoice = () => {
    dispatch(clearProducts());
    clearBaseProduct();
    setAltProduct([]);
  };

  const handleInvoicePost = async (): Promise<void> => {
    try {
      const { _id, ...InvoiceToPost } = InvoiceRepo;

      const InvoicePost = await postRequest(
        `api/user/invoice/invoices/?user_id=${user._id}`,
        InvoiceToPost
      );

      if (InvoicePost.data) {
        setOpensuccess(true);
        updateProductChanges(); // if any
        setInterimSave(true);
      }

      if (altProduct) resetBindedInvoice();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let inv = { ...InvoiceRepo };
    inv = initialInvoice;
    inv.invoiceTitle = `invoice#${nanoid(5)}`;
    inv.invoiceitems = [initialInvoiceItems];
    setInvoiceRepo({ ...inv });
  }, [interimSave])
  
  useEffect(() => {
    setTimeout(() => {
      if (interimSave === true) setInterimSave(false);
    }, 2000);
  }, [interimSave]);

  const pageRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      {isLoading ||
      status === "loading" ||
      status === "unauthenticated" ||
      !InvoiceRepo.invoiceTitle ? (
        <motion.div
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
          <CustomLoader text="Please wait while we get things set up for you..." />
        </motion.div>
      ) : (
        <>
          <Container ref={pageRef}>
            <div className={styles.fileAndEditor}>
              {interimSave ? null : (
                <Editorbar
                saveText="SAVE"
                handlePrint={() => handlePrint()}
                handleSave={() => handleInvoicePost()}
                handleVat={() => handleShowSettingsModal()}
                exportJPEG={async () => {
                  const { exportComponentAsJPEG } = await import(
                    "react-component-export-image"
                  );
                  exportComponentAsJPEG(componentRef);
                }}
                handleBP={() => setShowBindedData(!showBindedData)}
              />
              )}
              <div className={styles.editorFlex}>
                {/** */}
                {!InvoiceRepo || interimSave ? (
                  <CustomLoader text="Creating new Invoice" />
                ) : (
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
                    handleDateInput={handleDateInput}
                    removeItem={removeItem}
                    handleChange={handleImageChange}
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
                    itemEditable={itemEditable}
                  />
                )}
                {
                  interimSave ? null : (
                    <PropertyEditor>
                  <Header>
                    <div className={styles["edcToggler"]}>
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
                          invComp === true
                            ? styles["edcBtnActive"]
                            : styles["edcBtn"]
                        }
                        onClick={() => {
                          handleActiveSideComponent();
                          setShowEditComp(false);
                        }}
                      >
                        Edit Invoice
                      </button>
                    </div>
                  </Header>
                  <PropertiesContainer as={motion.div} layout animate>
                    {showEditComp ? (
                      <div>{dispInvComponents}</div>
                    ) : (
                      <>
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
                      </>
                    )}
                  </PropertiesContainer>
                </PropertyEditor>
                  )
                }
              </div>
              {showBindedData === true || altProduct.length > 0 ? (
                <motion.div className={styles["lseditor"]} layout animate>
                  <div className={styles["lse_top"]}>
                    <p>Binded Products</p>
                    <CustomIconBtn
                      icon={<Cancel />}
                      toolTip="close"
                      handleClick={() => setShowBindedData(false)}
                    />
                  </div>
                  {altProduct.length <= 0 ? (
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
                      <AddBox />
                      <p>no binded data</p>
                    </div>
                  ) : null}
                  {altProduct.map((a) => {
                    return (
                      <span className={styles["lse_bar"]}>
                        <p>{` ${a.description}`}</p>
                        <div>{`${a.qty}`}</div>
                      </span>
                    );
                  })}
                  <div className={styles["lse_bottom_btn"]}>
                    <ButtonComponent
                      innerText="Clear Binded Products"
                      onClick={() => resetBindedInvoice()}
                    />
                  </div>
                </motion.div>
              ) : null}
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
                <Image
                  src="/print2.svg"
                  height={300}
                  width={300}
                  alt="image: after_print_image"
                />
                <Typography variant="subtitle2" color="GrayText">
                  Thank You for using Kwik Invoice Generator
                </Typography>
              </div>
              <ButtonComponent
                innerText={"Continue"}
                onClick={() => setOpenSaved(false)}
              />
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
                handleStatusChange={(
                  e: React.ChangeEvent<HTMLSelectElement>
                ) => {
                  updateInvoiceStatus(
                    "status",
                    e.target.value as STATUS["status"]
                  );
                }}
                handleCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setInvoiceRepo({
                    ...InvoiceRepo,
                    currency_symbol: e.target.value,
                  });
                }}
                handleCloseBtn={handleCloseSettingsModal}
                data={InvoiceRepo}
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
                  {SelectedProducts.product.length} products selected
                </Typography>
                <ButtonComponent
                  innerText={"Recieve"}
                  onClick={() => handleProductTransfer()}
                />
              </div>
            </Modals>
            <CustomSnackbar
              openAlert={bindAlert.alert}
              closeAlert={() => setBindAlert({ ...bindAlert, alert: false })}
              outputText={bindAlert.message}
              verticalPosition="bottom"
              horizontalPosition="left"
            />
          </Container>
        </>
      )}
    </>
  );
};

CreateInvoice.displayName = "create_invoice"

export default CreateInvoice;

CreateInvoice.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
