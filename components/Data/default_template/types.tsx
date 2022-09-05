import React, {LegacyRef, RefObject, SyntheticEvent, Dispatch, SetStateAction} from 'react'
import { ColorChangeHandler } from "react-color";
import {initialInvoice,initialInvoiceItems} from "../initialData"
import {countryList} from "../countryList"
import {Invoice, InvoiceItems} from '../../Data/types';

export interface LogoProps {
    pdfMode?: boolean,
      handleChange?: (name: keyof Invoice, value: string| number | number[] ) => void,
      invoice: typeof initialInvoice,
      customStyle?: React.CSSProperties,
      logo?: string
  }
  
export interface TitleContainerProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    invoice: typeof initialInvoice,
    contentEditable?: boolean,
    customStyle?: React.CSSProperties,
    titlebox?: string
  }
  
export interface HeaderProps {
    titleInput: JSX.Element,
    logo: JSX.Element,
    invoice: typeof initialInvoice,
    contentEditable?: boolean,
    customStyle?: React.CSSProperties,
    hsStyleOverride?: string
  }
  
export interface CompanyProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    options: typeof countryList,
    invoice: typeof initialInvoice,
    contentEditable?: boolean,
    customStyle?: React.CSSProperties,
    setter:  Dispatch<SetStateAction<Invoice>>
  }
  
export interface RecieverProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    invoice: typeof initialInvoice,
    contentEditable?: boolean,
    ref?: LegacyRef<HTMLInputElement>
    id?: string,
    customStyle?: React.CSSProperties,
  }
  
export interface InvoiceDescriptionProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    invoice: typeof initialInvoice,
    contentEditable?: boolean,
    customStyle?: React.CSSProperties,
    handleDateInput: (date: Date, event: SyntheticEvent<any, Event>, key: keyof Invoice) => void
  }
  
export interface TableProps {
    onChangeComplete: ColorChangeHandler | undefined, 
      selectedColor: string, 
      cur: string, 
      itemArr: typeof initialInvoiceItems[],
      removeItem: (id: number | string | string[]) => void,
      handleItemInput: (e: Event | SyntheticEvent<any, Event> | string, index: number, name: keyof InvoiceItems) => void,
      invoice: typeof initialInvoice,
      contentEditable?: boolean,
      ref?: LegacyRef<HTMLInputElement>,
      id?: string,
      customStyle?: React.CSSProperties,

  }
  
export interface AddBtnProps {
    addTC: () => void,
    contentEditable?: boolean,
  }
  
export interface TotalContainerProps {
    cur: string, 
    invoice: typeof initialInvoice,
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    tR: number | undefined,
    contentEditable?: boolean,
    customStyle?: React.CSSProperties
  }
  
export interface NotesContainerProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    invoice: typeof initialInvoice,
    contentEditable?: boolean,
    customStyle?: React.CSSProperties,
    notes?:string
  }
  
export interface TermsAndConditionProps {
    handleDetailInput: (e: Event | SyntheticEvent<any, Event>, name: keyof Invoice) => void,
    invoice: typeof initialInvoice,
    contentEditable?: boolean,
    customStyle?: React.CSSProperties,
    tanc?: string
  }