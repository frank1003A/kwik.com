import axios from "axios";
import React, { Component, FC, useState } from "react";
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

  const resfilterInvoice = (newValue: string) => {
    return Invoices.filter((i) =>
      i.clientName.toLowerCase().includes(newValue.toLowerCase())
    );
  };

 /** const labelFormatter = (i: userType): OptionTypeBase => {
    return {
        label: i.loginId + ' - ' + i.firstName + ' ' + i.lastName + ' - ' + i.email,
        value: i.loginId,
    }
  } */

  const promiseOptions = (inputValue: string) =>
    new Promise<Invoice[]>(async (resolve) => {
      {
        const invoices = await getRequest( "api/invoices");
        let data: Invoice[] =  await JSON.parse(JSON.stringify(invoices));
        setTimeout(() => {
          resolve(resfilterInvoice(inputValue));
        }, 2000);
        return data.filter(i => i.clientName)
      }
    });

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
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
