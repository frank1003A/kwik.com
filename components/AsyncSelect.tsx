import axios from "axios";
import React, { Component, FC, useEffect, useState } from "react";
import { ActionMeta, SingleValue } from "react-select";

import AsyncSelect from "react-select/async";
import Async, { useAsync } from "react-select/async";
import { Invoice, InvoiceItems } from "../components/Data/types";
import { getRequest } from "../lib/axios/axiosClient";
import { initialInvoice } from "./Data/initialData";

export interface Props {
  Invoices: Invoice[],
  selectedValue: Invoice[],
  setter: React.Dispatch<React.SetStateAction<Invoice[]>>,
}

const AsyncSelectComponent: FC<Props> = ({
  Invoices,
  selectedValue,
  setter,
}) => {
    // Creating a state for the selected options
    const [selectedOption, setSelectedOption] = useState<string>('')

  const handleChange = (selected: string):void => {
    setSelectedOption(selected)
  };

  const resfilterInvoice = (newValue: string, data: Invoice[]) => {
    const retData = data.filter((i) => 
    i.clientName.toLowerCase().includes(newValue.toLowerCase())
  )
    //const res = retData.map(i => {return i.clientName})
    return retData
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<Array<Invoice>>(async (resolve) => {
      {
        const invoices: Array<Invoice> = await getRequest( "api/invoices");
        setTimeout(() => {
          resolve(resfilterInvoice(inputValue, invoices));
        }, 2000);
      }
    });

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={promiseOptions}
    />
  );
};

export default AsyncSelectComponent
/**const promiseOptions = (inputValue: string) => new Promise<Invoice[]>((resolve) => {
    const InvoicePost: Promise<Invoice[]> = getRequest('api/invoices')
    const Invoices: Invoice[] =[...await, InvoicePost]
    setTimeout(() => {
      resolve(filterInvoice(inputValue , Invoices));
    }, 1000);
  }); */
