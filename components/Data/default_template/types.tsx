import React, {SyntheticEvent} from 'react'
import { ColorChangeHandler } from "react-color";
import {initialInvoice,initialInvoiceItems} from "../initialData"
import {countryList} from "../countryList"
import {Invoice, InvoiceItems} from '../../Data/types';

export interface LcProps {
    pdfMode?: boolean,
      handleChange?: (name: keyof Invoice, value: string| number | number[] ) => void,
      invoice: typeof initialInvoice,
  }
  
export interface TcProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
  }
  
export interface HProps {
    titleInput: JSX.Element,
    logo: JSX.Element,
  }
  
export interface CSProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    options: typeof countryList,
  }
  
export interface RSProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
  }
  
export interface IDProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    invoice: typeof initialInvoice,
  }
  
export interface ITProps {
    onChangeComplete: ColorChangeHandler | undefined, 
      selectedColor: string, 
      cur: string, 
      itemArr: typeof initialInvoiceItems[],
      removeItem: (id: number | string | string[]) => void,
      handleItemInput: (e: Event | SyntheticEvent<any, Event>, index: number, name: keyof InvoiceItems) => void
  }
  
export interface BAProps {
    addTC: () => void,
  }
  
export interface TCNProps {
    cur: string, 
    invoice: typeof initialInvoice,
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    tR: number,
  }
  
export interface NCProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
  }
  
export interface TACProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
  }