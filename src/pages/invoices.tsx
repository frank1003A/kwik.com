import "react-datepicker/dist/react-datepicker.css";

import {
  CheckCircle,
  CheckSharp,
  Close,
  CreateOutlined,
  DateRange,
  DateRangeTwoTone,
  Done,
  Drafts,
  FileCopy,
  Forward,
  ImportExportSharp,
  InsertEmoticon,
  LocalActivity,
  NewReleases,
  Pending,
  Restore,
  SearchOff,
  SearchRounded,
  Sort,
  SortRounded,
  Today,
} from "@mui/icons-material";
import {
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import { useSWRConfig } from "swr";

import Create from "../../components/asset/Create";
import CustomLoader from "../../components/asset/CustomLoader";
import ButtonComponent from "../../components/Button";
import CustomIconBtn from "../../components/CustomIconBtn";
import CustomSnackbar from "../../components/CustomSnackbar";
import { Invoice } from "../../components/Data/types";
import InvoiceBar from "../../components/InvoiceBar";
import Modal from "../../components/Modal";
import MuiSearchbar from "../../components/MuiSearchbar";
import {
  ControlledInput,
  Form,
} from "../../components/styled-component/Global";
import {
  Center,
  Container,
  Main,
  SideCreator,
  Top,
} from "../../components/styled-component/invoices";
import useGetter from "../../hooks/useGetter";
import {
  baseRoute,
  deleteRequest,
  postRequest,
} from "../../lib/axios/axiosClient";
import styles from "../../styles/Home.module.css";
import {
  convertDateFormat,
  sortDataByDate,
  sortMultipleData,
} from "../../utils/utils";

import Layout from "../../components/Layout";
import { NextPageWithLayout } from "./_app";
import CustomizedMenus from "../../components/Dropdown";
import CustomForm from "../../components/asset/CustomForm";
import { Row } from "../../components/styled-component/clients/Global";
import { nanoid } from "nanoid";
import { initialInvoice } from "../../components/Data/initialData";

type stringUnion =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

const Invoices: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data, isError, isLoading } = useGetter(
    `/api/user/invoice/invoices/?user_id=${session?.user?.id}`
  );
  const { mutate } = useSWRConfig();

  const [optionModal, setOptionModal] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [startDate, setstartDate] = useState<Date>(new Date());
  const [endDate, setendDate] = useState<Date>(new Date());
  const [sdb, setSdb] = useState<boolean>(false);
  const [dateSort, setDateSort] = useState<boolean>(false);
  const [dueDateSort, setDueDateSort] = useState<boolean>(false);
  const [sorted, setSorted] = useState<Invoice[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [openCreatebar, setOpenCreatebar] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<Invoice>({ ...initialInvoice });
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [newOldSort, setNewOldSort] = useState<{
    value: number;
    text: "sort" | "latest" | "oldest";
  }>({
    value: 0,
    text: "sort",
  });
  const [statusSort, setStatusSort] = useState<{
    status: "status" | "draft" | "pending" | "complete";
  }>({
    status: "status",
  });
  const [informUser, setInformUser] = useState<{
    deletealert: boolean;
    updatealert: boolean;
    message: string;
  }>({
    deletealert: false,
    updatealert: false,
    message: "",
  });

  useEffect(() => {
    if (!(status === "authenticated") && !session && !(status === "loading")) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  useEffect(() => {
    setInvoice({ ...invoice, invoiceTitle: `invoice#${nanoid(5)}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreatebar, isSaveLoading]);

  useMemo(() => {
    if (startDate && endDate !== undefined && dateSort) {
      const sortedData: Invoice[] = sortDataByDate(
        invoices,
        convertDateFormat(startDate.toString(), "yyyy-mm-dd")!,
        convertDateFormat(endDate.toString(), "yyyy-mm-dd")!,
        "invoiceDate"
      );
      setSorted(sortedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, dateSort]);

  useMemo(() => {
    if (startDate && endDate !== undefined && dueDateSort) {
      const sortedData: Invoice[] = sortDataByDate(
        invoices,
        convertDateFormat(startDate.toString(), "yyyy-mm-dd")!,
        convertDateFormat(endDate.toString(), "yyyy-mm-dd")!,
        "invoiceDueDate"
      );
      setSorted(sortedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, dueDateSort]);

  const openOModal = (): void => setOptionModal(true);
  const closeOModal = (): void => setOptionModal(false);

  const setter = () => {
    if (data !== undefined) setInvoices(data);
    if (isError) console.log(isError);
  };

  useEffect(() => {
    setter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const deleteInvoice = async (id: string) => {
    try {
      const deleteInvoice = await deleteRequest(
        `api/user/invoice/invoices/?invoice_id=${id}`
      ).then(() => {
        mutate(`/api/user/invoice/invoices/?user_id=${session?.user?.id}`);
        setSorted([]);
        setInformUser({
          ...informUser,
          deletealert: true,
          message: `deleted invoice -${id}`,
        });
      }, 
       () => console.log("error")
      )
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const dispStats = (status: string) => {
    const clr = ["error", "warning", "success"];
    return ["draft", "pending", "complete"].map((key, idx) => {
      if (status === key) {
        return (
          <Chip
            label={status}
            sx={{ borderRadius: "4px" }}
            variant="outlined"
            size="small"
            color={clr[idx] as stringUnion}
          />
        );
      }
    });
  };

  /**
   * handles all the feature icons
   */
  const topIcons: { icon: JSX.Element; tip: string; func?: () => void }[] = [
    {
      icon: <Sort />,
      tip: "Sort and Order",
      func() {
        setIsFiltering(!isFiltering);
        if (sdb === true) setSdb(!sdb);
      },
    },
    {
      icon: <Restore />,
      tip: "Reset",
      func() {
        setSorted([]);
      },
    },
    {
      icon: <ImportExportSharp />,
      tip: "Import Excel File",
    },
    {
      icon: <CreateOutlined />,
      tip: "New Invoice",
      func: () => setOpenCreatebar(true),
    },
    {
      icon: <LocalActivity />,
      tip: "Activity Log",
    },
  ];

  const handleCategoryFilter = () => {
    const fValue = invoices.filter((inv) => inv.status === statusSort.status);
    setSorted(fValue);
  };

  const handleLOSort = () => {
    if (newOldSort.value === 1) {
      if (sorted.length > 0) {
        const sortedInvoices = sorted
          .map((obj) => {
            return { ...obj, invoiceDate: new Date(obj.invoiceDate) };
          })
          .sort((a: any, b: any) => b.invoiceDate - a.invoiceDate);
        setSorted(sortedInvoices);
      } else {
        const sortedInvoices = invoices
          .map((obj) => {
            return { ...obj, invoiceDate: new Date(obj.invoiceDate) };
          })
          .sort((a: any, b: any) => b.invoiceDate - a.invoiceDate);
        setSorted(sortedInvoices);
      }
    } else if (newOldSort.value === 2) {
      if (sorted.length > 0) {
        const sortedInvoices = sorted
          .map((obj) => {
            return { ...obj, invoiceDate: new Date(obj.invoiceDate) };
          })
          .sort((a: any, b: any) => a.invoiceDate - b.invoiceDate);
        setSorted(sortedInvoices);
      } else {
        const sortedInvoices = invoices
          .map((obj) => {
            return { ...obj, invoiceDate: new Date(obj.invoiceDate) };
          })
          .sort((a: any, b: any) => a.invoiceDate - b.invoiceDate);
        setSorted(sortedInvoices);
      }
    } else {
      setSorted([]);
    }
  };

  useEffect(() => {
    handleLOSort();
  }, [newOldSort]);

  useEffect(() => {
    handleCategoryFilter();
  }, [statusSort]);

  const renderDateSort: React.ReactNode = [
    <>
      <CustomIconBtn
        id="topicon"
        icon={<DateRange />}
        toolTip="Filter by date"
        handleClick={() => {
          setSdb(!sdb);
          setDateSort(true);
        }}
      />
    </>,
  ];

  const newOld: {
    icon: JSX.Element;
    item: string;
    onClick: () => void;
  }[] = [
    {
      icon: <SortRounded />,
      item: "sort",
      onClick: () => setNewOldSort({ ...newOldSort, value: 0, text: "sort" }),
    },
    {
      icon: <NewReleases />,
      item: "latest",
      onClick: () => setNewOldSort({ ...newOldSort, value: 1, text: "latest" }),
    },
    {
      icon: <DateRangeTwoTone />,
      item: "oldest",
      onClick: () => setNewOldSort({ ...newOldSort, value: 2, text: "oldest" }),
    },
  ];

  const stat: {
    icon: JSX.Element;
    item: string;
    onClick: () => void;
  }[] = [
    {
      icon: <Today />,
      item: "status",
      onClick: () => setStatusSort({ ...statusSort, status: "status" }),
    },
    {
      icon: <Drafts />,
      item: "draft",
      onClick: () => setStatusSort({ ...statusSort, status: "draft" }),
    },
    {
      icon: <Pending />,
      item: "pending",
      onClick: () => setStatusSort({ ...statusSort, status: "pending" }),
    },
    {
      icon: <CheckCircle />,
      item: "complete",
      onClick: () => setStatusSort({ ...statusSort, status: "complete" }),
    },
  ];

  const renderFSort: React.ReactNode = [
    <>
      <CustomizedMenus name={statusSort.status} menuItems={stat} />

      <CustomizedMenus name={newOldSort.text} menuItems={newOld} />
    </>,
  ];

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

  const handleDetailInput = (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof Invoice
  ) => {
    e.preventDefault();
    const { value } = e.currentTarget;

    const newInvoice: Invoice = { ...invoice };
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
    setInvoice(newInvoice);
  };

  const handleDateInput = (date: Date, key: keyof Invoice) => {
    if (key === "invoiceDate" || key === "invoiceDueDate")
      setInvoice({ ...invoice, [key]: date });
  };

  const createInvoice = async (): Promise<void> => {
    try {
      const InvoiceToPost = invoice;

      const InvoicePost = await postRequest(
        `api/user/invoice/invoices/?user_id=${session?.user?.id}`,
        InvoiceToPost
      ).then(() => {
        mutate(`/api/user/invoice/invoices/?user_id=${session?.user?.id}`);
        setInformUser({...informUser, updatealert: true, message: `Invoice saved `})
        setIsSaveLoading(true)
      })
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isSaveLoading && informUser) setIsSaveLoading(false)
  }, [isSaveLoading]);

  return (
    <>
      <Container>
        <Top>
          <Typography>Invoices</Typography>
          <div>
            <MuiSearchbar
              ref={inputRef}
              disabled={openCreatebar ? true : false}
              handleSearch={(e: ChangeEvent<HTMLInputElement>) =>
                setSorted(
                  sortMultipleData<Invoice>(
                    invoices,
                    [
                      "clientName",
                      "title",
                      "invoiceDueDate",
                      "status",
                      "invoiceTitle",
                    ],
                    e.target.value
                  )
                )
              }
            />
            <motion.div transition={{ type: "spring", bounce: 0.25 }}>
              {isFiltering && renderFSort}
              {isFiltering && renderDateSort}
            </motion.div>
            <span id="topicon">
              {topIcons.map((k, idx) => {
                return (
                  <Tooltip title={k.tip} key={idx}>
                    <IconButton aria-label="" onClick={k.func}>
                      {k.icon}
                    </IconButton>
                  </Tooltip>
                );
              })}
            </span>
          </div>
        </Top>
        {sdb ? (
          <motion.div
            layout
            animate
            style={{
              display: "flex",
              padding: "0.8rem 0px",
              width: "100%",
              transition: "all 0.2s ease 0s",
              background: "rgb(255, 255, 255)",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <input
                type="checkbox"
                name="Date Created"
                checked={true && dueDateSort === true ? false : true}
                onClick={() => {
                  if (dueDateSort === true) {
                    setDueDateSort(false);
                    setDateSort(true);
                  } else {
                    setDateSort(true);
                  }
                }}
              />
              <FormLabel>Date Created</FormLabel>
              <input
                type="checkbox"
                name="Due Date"
                checked={true && dateSort === true ? false : true}
                onClick={() => {
                  if (dateSort === true) {
                    setDateSort(false);
                    setDueDateSort(true);
                  } else {
                    setDueDateSort(true);
                  }
                }}
              />
              <FormLabel>Due Date</FormLabel>
            </div>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <ControlledInput
                as={DatePicker}
                selected={startDate}
                onChange={(date: Date) => setstartDate(date)}
              />
              <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <ControlledInput
                as={DatePicker}
                selected={endDate}
                onChange={(date: Date) => setendDate(date)}
              />
              <FormHelperText></FormHelperText>
            </FormControl>
          </motion.div>
        ) : null}
        {isSearching && sorted.length > 0 ? (
              <div style={{ display: "flex" }}>
                <Forward />
                <Typography>{`${sorted.length} search result`}</Typography>
              </div>
            ) : (
              ""
            )}
        <motion.div className={styles["invpage_listform"]}>
          <Main
            as={motion.div}
            style={{ height: openCreatebar ? "80vh" : "", overflow: "auto" }}
          >
            {status === "loading" || (status === "authenticated" && !data) ? (
              <Center>
                <CustomLoader text="Fetching Invoices" />
              </Center>
            ) : sorted.length > 0 ? (
              sorted.map((inv, idx) => {
                return (
                  <InvoiceBar
                    key={`${inv.invoiceTitle}_${idx}`}
                    handleDelete={() => deleteInvoice(inv._id?.toString()!)}
                    amt={inv.total}
                    clientname={inv.clientName}
                    due={inv.invoiceDueDate}
                    invtitle={inv.invoiceTitle}
                    name={inv.title}
                    invId={inv._id}
                    CurrencyText={inv.currency_symbol}
                    status={dispStats(inv.status!)}
                  />
                );
              })
            ) : Array.isArray(data) &&
              data.length < 1 &&
              status === "authenticated" ? (
              <Center>
                <Create width={"200"} height={"200"} />
                <Typography variant="body1" color="initial">
                  You have not created any invoice
                </Typography>
              </Center>
            ) : (
              invoices.map((inv, idx) => {
                return (
                  <InvoiceBar
                    key={`${inv.invoiceTitle}_${idx}`}
                    handleDelete={() => deleteInvoice(inv._id?.toString()!)}
                    amt={inv.total}
                    clientname={inv.clientName}
                    due={inv.invoiceDueDate}
                    invtitle={inv.invoiceTitle}
                    name={inv.title}
                    invId={inv._id}
                    status={dispStats(inv.status!)}
                    CurrencyText={inv.currency_symbol}
                  />
                );
              })
            )}
          </Main>
          {openCreatebar ? (
            <SideCreator>
              {isSaveLoading ? (
                <CustomLoader text="creating and saving invoice" />
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <CustomIconBtn
                      icon={<Close />}
                      toolTip="close"
                      handleClick={() => setOpenCreatebar(false)}
                    />
                    <Typography variant="body1" color="initial">
                      Create Invoice with basic data
                    </Typography>
                  </div>
                  <Form>
                    <CustomForm topLabel="Invoice Number/Title">
                      <ControlledInput
                        placeholder="generated invoice number"
                        value={invoice.invoiceTitle}
                        onChange={(e: ChangeEvent) =>
                          handleDetailInput(e, "invoiceTitle")
                        }
                        disabled
                      />
                    </CustomForm>
                    <CustomForm topLabel="Invoice Subject">
                      <ControlledInput
                        placeholder="description of invoice"
                        value={invoice.title}
                        onChange={(e: ChangeEvent) =>
                          handleDetailInput(e, "title")
                        }
                      />
                    </CustomForm>
                    <CustomForm topLabel="Invoice Date">
                      <ControlledInput
                        placeholder="invoice creation date"
                        type={"date"}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleDateInput(
                            new Date(e.target.value),
                            "invoiceDate"
                          )
                        }
                      />
                    </CustomForm>
                    <CustomForm topLabel="Invoice Due Date">
                      <ControlledInput
                        placeholder="invoice due date"
                        type={"date"}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleDateInput(
                            new Date(e.target.value),
                            "invoiceDueDate"
                          )
                        }
                      />
                    </CustomForm>
                    <CustomForm topLabel="Billing To:">
                      <ControlledInput
                        placeholder="invoice reciever"
                        value={invoice.billTo}
                        onChange={(e: ChangeEvent) =>
                          handleDetailInput(e, "billTo")
                        }
                      />
                    </CustomForm>
                    <ButtonComponent
                      innerText="Create Invoice"
                      icon={<FileCopy />}
                      btnDisabled={!(openCreatebar && invoice) ? true : false}
                      customStyle={{
                        background: "none",
                        border: "1px solid#2124b1",
                        color: "#2124b1",
                      }}
                      onClick={() =>
                        createInvoice().then(() =>
                          setInvoice({ ...initialInvoice })
                        )
                      }
                    />
                  </Form>
                </>
              )}
            </SideCreator>
          ) : null}
        </motion.div>
      </Container>

      {/**Create Invoice Modal */}
      <Modal OpenModal={optionModal} handleCloseModal={closeOModal} pd="">
        <div className={styles.optionContainer}>
          <div className={styles.option}>
            <Typography variant="body1" color="initial">
              New Invoice
            </Typography>
            <Divider />
            <Create />
            <div className={styles["card"]}>
              <Link href={`${baseRoute}/invoice/create`}>
                <Typography>Create Invoice</Typography>
              </Link>
            </div>
          </div>
        </div>
      </Modal>

      <CustomSnackbar
        openAlert={informUser.deletealert}
        closeAlert={() => setInformUser({ ...informUser, deletealert: false })}
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
    </>
  );
};

export default Invoices;

Invoices.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
