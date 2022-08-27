import {
  CreateOutlined,
  CreateRounded,
  DateRange,
  ImportExportSharp,
  LocalActivity,
  Sort,
} from "@mui/icons-material";
import {
  Chip,
  Divider,
  FormLabel,
  IconButton,
  StepLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  SyntheticEvent,
} from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import {
  Center,
  Container,
  Main,
  Status,
  Top,
} from "../../components/styled-component/invoices/index";

import Create from "../../components/asset/Create";
import CustomLoader from "../../components/asset/CustomLoader";
import Button from "../../components/Button";
import { Invoice } from "../../components/Data/types";
import InvoiceBar from "../../components/InvoiceBar";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import MuiSearchbar from "../../components/MuiSearchbar";
import { FlexContainer } from "../../components/styled-component/clients/Global";
import { ControlledInput } from "../../components/styled-component/Global";
import useGetter from "../../hooks/useGetter";
import { deleteRequest } from "../../lib/axios/axiosClient";
import styles from "../../styles/Home.module.css";
import {
  convertDateFormat,
  sortData,
  sortDataByDate,
  sortMultipleData,
} from "../../utils/utils";

import type { NextPage } from "next";
import { isBoxedPrimitive } from "util/types";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useSWRConfig } from "swr";
import CustomIconBtn from "../../components/CustomIconBtn";
import { useTheme } from "next-themes";

interface Props {
  invoices: Invoice[];
}

const invoices: NextPage<Props> = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data, isError, isLoading } = useGetter(
    `/api/user/invoice/invoices/?user_id=${session?.user?.id}`
  );
  const { mutate } = useSWRConfig();

  const [optionModal, setOptionModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<Invoice[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [startDate, setstartDate] = useState<string>();
  const [endDate, setendDate] = useState<string>();
  const [dateSort, setDateSort] = useState<boolean>(false);
  const [sorted, setSorted] = useState<Invoice[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [informUser, setInformUser] = useState<{
    deletealert: boolean;
    message: string;
  }>({
    deletealert: false,
    message: "",
  });

  const { theme } = useTheme();

  useEffect(() => {
    if (startDate && endDate !== undefined) {
      const sortedData: Invoice[] = sortDataByDate(
        invoices,
        convertDateFormat(startDate, "yyyy-mm-dd")!,
        convertDateFormat(endDate, "yyyy-mm-dd")!,
        "invoiceDate"
      );
      setSorted(sortedData);
    }
  }, [startDate, endDate]);

  const openOModal = (): void => setOptionModal(true);
  const closeOModal = (): void => setOptionModal(false);

  const setter = () => {
    if (data !== undefined) setInvoices(data);
    if (isError) console.log(isError);
  };

  useEffect(() => {
    setter();
  }, [data]);

  const {} = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/login");
    },
  });

  const deleteInvoice = async (id: string) => {
    try {
      const deleteInvoice = await deleteRequest(
        `api/invoices/?invoice_id=${id}`
      );
      if (deleteInvoice)
        setInformUser({
          ...informUser,
          deletealert: true,
          message: `deleted invoice -${id}`,
        });
      mutate(`/api/user/invoice/invoices/?user_id=${session?.user?.id}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const dispStats = (status: string) => {
    const clr = ["red", "yellow", "green"];
    return ["draft", "pending", "complete"].map((key, idx) => {
      if (status === key) {
        return (
          <Chip
            id="chipFont"
            label={status}
            sx={{ borderRadius: "4px", background: clr[idx], color: "#fff" }}
            variant="filled"
            size="medium"
          />
        );
      }
    });
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const fValue = invoices.filter((inv) => inv.status === value);
    setSorted(fValue);
  };

  /**const handleOrder= (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = Number(e.target.value)
    if (value = 1)  invoices.sort(({invoiceDate}, {}) => {})
    setSorted(fvalue)
  } */

  /**
   * handles all the feature icons
   */
  const topIcons: { icon: JSX.Element; tip: string; func?: () => void }[] = [
    {
      icon: (
        <Sort
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "Sort and Order",
      func() {
        setIsFiltering(!isFiltering);
      },
    },
    {
      icon: (
        <ImportExportSharp
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "Import Excel File",
    },
    {
      icon: (
        <CreateOutlined
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "New Invoice",
      func: () => openOModal(),
    },
    {
      icon: (
        <DateRange
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "Sort data by date",
      func: () => setIsFiltering(!isFiltering),
    },
    {
      icon: (
        <LocalActivity
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "Activity Log",
    },
  ];

  const renderFSort: React.ReactNode = [
    <>
      <select>
        <option value={0}>Sort By</option>
        <option value={1}>Newest</option>
        <option value={2}>Oldest</option>
      </select>

      <select
        title="filter-type"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleCategoryFilter(e)
        }
      >
        <option value={"none"}>Status</option>
        <option value={"draft"}>Draft</option>
        <option value={"pending"}>Pending</option>
        <option value={"complete"}>Complete</option>
      </select>

      <CustomIconBtn
        icon={
          <DateRange
            sx={{
              color: "#555",
              ":hover": {
                color: theme === "light" ? "#2124b1" : "#FFA500",
              },
            }}
          />
        }
        toolTip="Filter by date"
        handleClick={() => setDateSort(!dateSort)}
      />
    </>,
  ];

  return (
    <Layout>
      <Container>
        <Top>
          <Typography>Invoices</Typography>
          <div>
            <MuiSearchbar
              handleSearch={(e: ChangeEvent<HTMLInputElement>) =>
                setSorted(
                  sortMultipleData<Invoice>(
                    invoices,
                    ["clientName", "title", "invoiceDueDate", "status"],
                    e.target.value
                  )
                )
              }
            />
            <motion.div layout animate>
              {isFiltering && renderFSort}
            </motion.div>
            <span>
              {topIcons.map((key) => {
                return (
                  <Tooltip title={key.tip}>
                    <IconButton aria-label="" onClick={key.func}>
                      {key.icon}
                    </IconButton>
                  </Tooltip>
                );
              })}
            </span>
          </div>
        </Top>
        {dateSort ? (
          <motion.div
            layout
            animate
            style={{
              display: "flex",
              marginTop: "3.4rem",
              padding: ".8rem 0px",
              width: "100%",
              transition: ".2s",
              background: "#fff",
              justifyContent: "space-evenly",
            }}
          >
            <FlexContainer>
              <FormLabel>Start Date</FormLabel>
              <ControlledInput
                type="date"
                name="start"
                id=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setstartDate(e.target.value)
                }
              />
            </FlexContainer>
            <FlexContainer>
              <FormLabel>End Date</FormLabel>
              <ControlledInput
                type="date"
                name=""
                id=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setendDate(e.target.value)
                }
              />
            </FlexContainer>
          </motion.div>
        ) : null}
        <Main as={motion.div} layout>
          {isLoading ? (
            <Center>
              <CustomLoader />
              <Typography variant="body1" color="initial">
                Fetching Your Invoice
              </Typography>
            </Center>
          ) : sorted.length > 0 ? (
            sorted.map((inv, idx) => {
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
          ) : invoices.length < 1 && !isLoading ? (
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
            <Create />
            <div className={styles["card"]}>
              <Link href="http://localhost:3000/invoice/create">
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
    </Layout>
  );
};

export default invoices;
