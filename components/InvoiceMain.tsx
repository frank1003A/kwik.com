import { Divider } from '@mui/material';
import React, { Dispatch, FC, LegacyRef, SetStateAction, SyntheticEvent, useState } from 'react';
import { ColorChangeHandler } from 'react-color';

import {
  Button_Add,
  CompanySection,
  Header,
  InvoiceDescription,
  InvoiceTable,
  LogoContainer,
  NotesContainer,
  RecieverSection,
  TandC_Container,
  TitleContainer,
  TotalContainer,
} from '../components/Data/default_template';
import { initialInvoice, initialInvoiceItems } from '../components/Data/initialData';
import styles from '../styles/Invoice.module.css';
import { Invoice, InvoiceItems } from './Data/types';

interface Props {
  options: { value: string; text: string }[];
  invoice: typeof initialInvoice;
  pdfMode: boolean;
  handleChange: (
    name: keyof Invoice,
    value: string | number | number[]
  ) => void;
  removeItem: (id: number | string | string[]) => void;
  addTC: () => void;
  cur: string;
  itemArr: typeof initialInvoiceItems[];
  tR: number | undefined;
  handleDetailInput: (
    e: Event | SyntheticEvent<any, Event>,
    name: keyof Invoice
  ) => void;
  handleItemInput: (
    e: Event | SyntheticEvent<any, Event> | string,
    index: number,
    name: keyof InvoiceItems
  ) => void;
  style?: React.CSSProperties,
  contentEditable?: boolean,
  id?:string,
  clientInputRef?:LegacyRef<HTMLDivElement>,
  customStyle?: React.CSSProperties,
  selClr: Dispatch<SetStateAction<Invoice>>,
  onChangeComplete?: ColorChangeHandler,
  selectedColor?: string,
  handleDateInput: (date: Date, event: SyntheticEvent<any, Event>, key: keyof Invoice) => void,
  hsco?: string,
  dividerDisplay?: string,
  csDisplay?:string,
  tanc?: string,
  notes?: string,
  logo?: string,
  titlebox?: string
}

const invoiceMain = React.forwardRef(
  (
    {
      options,
      pdfMode,
      invoice,
      handleChange,
      removeItem,
      addTC,
      cur,
      itemArr,
      tR,
      handleDetailInput,
      handleItemInput,
      style,
      contentEditable,
      id,
      clientInputRef,
      customStyle,
      selClr,
      onChangeComplete,
      selectedColor,
      handleDateInput,
      hsco,
      dividerDisplay,
      csDisplay,
      tanc,
      notes,
      logo,
      titlebox
    }: Props,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    return (
      <div className={styles["invoice-box"]} ref={ref} style={style}>
        <div className={styles.top} id="trinfo">
          <Header
            invoice={invoice}
            logo={
              <LogoContainer
                pdfMode={pdfMode}
                handleChange={handleChange}
                invoice={invoice}
                logo={logo}
              />
            }
            titleInput={
              <TitleContainer
                invoice={invoice}
                contentEditable={contentEditable}
                handleDetailInput={handleDetailInput}
                customStyle={customStyle}
                titlebox={titlebox}
              />
            }
            hsStyleOverride={hsco}
          />

          <Divider
            sx={{
              borderColor: selectedColor,
              marginBottom: "2rem",
              marginTop: "1rem",
              display: dividerDisplay,
            }}
            id="dfdivider"
          />

        

          <div style={{ display: csDisplay ? "none":"flex", gap: "1rem", flexDirection: "row" }}>
            <CompanySection
              invoice={invoice}
              handleDetailInput={handleDetailInput}
              options={options}
              setter={selClr}
              contentEditable={contentEditable}
              customStyle={customStyle}
            />
          </div>

          <div className={styles.invInfo} 
          style={{display:"flex"}} ref={clientInputRef}>
            <RecieverSection
              invoice={invoice}
              handleDetailInput={handleDetailInput}
              contentEditable={contentEditable}
              id={id}
              customStyle={customStyle}
            />
            <InvoiceDescription
              handleDateInput={handleDateInput}
              handleDetailInput={handleDetailInput}
              invoice={invoice}
              contentEditable={contentEditable}
              customStyle={customStyle}
            />
          </div>

          <div
            style={{
              height: "auto",
              width: "100%",
              overflow: "auto",
              background: "transparent",
            }}

          >
            <InvoiceTable
              invoice={invoice}
              onChangeComplete={onChangeComplete}
              selectedColor={selectedColor as string}
              cur={cur}
              itemArr={itemArr}
              removeItem={removeItem}
              handleItemInput={handleItemInput}
              customStyle={customStyle}
              contentEditable={contentEditable}
            />

            <div className={styles.btnAndTotal}>
              <Button_Add addTC={addTC} contentEditable={contentEditable} />

              <TotalContainer
                cur={cur}
                invoice={invoice}
                handleDetailInput={handleDetailInput}
                tR={tR}
                contentEditable={contentEditable}
                customStyle={customStyle}
              />
            </div>

            <NotesContainer
              invoice={invoice}
              handleDetailInput={handleDetailInput}
              contentEditable={contentEditable}
              customStyle={customStyle}
              notes={notes}
            />

            <br />
            <br />
            <TandC_Container
              invoice={invoice}
              handleDetailInput={handleDetailInput}
              contentEditable={contentEditable}
              customStyle={customStyle}
              tanc={tanc}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default invoiceMain;
